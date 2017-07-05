// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.

import Vue from 'vue'

export default {
  grind (state) {
    let random = Math.random()
    state.progress += 1 + state.gearscore * random
  },
  grindIdle (state, times) {
    state.progress += state.gearscore * times
  },
  goalReached (state) {
    while (state.progress >= state.location.gearscore) {
      state.progress -= state.location.gearscore
      if (state.inventory.length < state.inventorySize) {
        state.inventory.unshift(generateCrate(state))
        notificationHub.notify({
          title: 'New ' + state.inventory[0].type,
          text: 'Here, have a ' + state.inventory[0].name
        })
      }
    }
  },
  goToLocation (state, location) {
    state.progress = 0
    state.location = location
  },
  chooseItem (state, {crate, item}) {
    for (let i in state.inventory) {
      if (state.inventory[i] === crate) {
        for (let j in crate.items) {
          if (crate.items[j] === item) {
            state.inventory.splice(i, 1)
            state.inventory.unshift(item)
            break
          }
        }
      }
      Vue.set(state.inventory[i], 'open', false)
    }

    for (let i in state.warehouse) {
      if (state.warehouse[i] === crate) {
        for (let j in crate.items) {
          if (crate.items[j] === item) {
            state.warehouse.splice(i, 1)
            state.warehouse.unshift(item)
            break
          }
        }
      }
      Vue.set(state.warehouse[i], 'open', false)
    }
  },
  send (state, {item, target}) {
    if (state[target].length >= state[target + 'Size']) {
      return
    }
    let found = false
    for (let i in state.inventory) {
      if (state.inventory[i] === item) {
        state.inventory.splice(i, 1)
        state[target].unshift(item)
        found = true
        break
      }
    }
    if (!found) {
      for (let i in state.warehouse) {
        if (state.warehouse[i] === item) {
          state.warehouse.splice(i, 1)
          state[target].unshift(item)
          found = true
          break
        }
      }
    }
  },
  equip (state, item) {
    let found = false
    for (let i in state.inventory) {
      if (state.inventory[i] === item) {
        // if (state.gear[item.type]) {
        //   // state.inventory.push(state.gear[item.type])
        //   // state.inventory.splice(i, 1)
        // }
        state.inventory.splice(i, 1)
        Vue.set(state.gear, item.type, item)
      }
    }
    if (!found) {
      for (let i in state.warehouse) {
        if (state.warehouse[i] === item) {
          // if (state.gear[item.type]) {
          //   // state.inventory.push(state.gear[item.type])
          //   // state.warehouse.splice(i, 1)
          // }
          state.warehouse.splice(i, 1)
          Vue.set(state.gear, item.type, item)
        }
      }
    }

    let gs = 0
    for (let i in state.gear) {
      gs += state.gear[i].gearscore
    }
    state.gearscore = gs
  },
  remove (state, item) {
    for (let i in state.inventory) {
      if (state.inventory[i] === item) {
        state.inventory.splice(i, 1)
        break
      }
    }
    for (let i in state.warehouse) {
      if (state.warehouse[i] === item) {
        state.warehouse.splice(i, 1)
        break
      }
    }
  },
  open (state, item) {
    for (let i in state.inventory) {
      if (state.inventory[i] === item) {
        Vue.set(state.inventory[i], 'open', true)
        break
      } else {
        Vue.set(state.inventory[i], 'open', false)
      }
    }
    for (let i in state.warehouse) {
      if (state.warehouse[i] === item) {
        Vue.set(state.warehouse[i], 'open', true)
        break
      } else {
        Vue.set(state.warehouse[i], 'open', false)
      }
    }
  },
  close (state) {
    for (let i in state.inventory) {
      Vue.set(state.inventory[i], 'open', false)
    }
    for (let i in state.warehouse) {
      Vue.set(state.inventory[i], 'open', false)
    }
  },
  loadGenerator (state) {
    for (let type in state.generator.items) {
      state.generator.terminals[type] = {}
      state.generator.startwords[type] = []
      state.generator.wordstats[type] = {}

      for (let i = 0; i < state.generator.items[type].length; i++) {
        let words = state.generator.items[type][i].split(' ')
        state.generator.terminals[type][words[words.length - 1]] = true
        state.generator.startwords[type].push(words[0])
        for (let j = 0; j < words.length - 1; j++) {
          if (state.generator.wordstats[type].hasOwnProperty(words[j])) {
            state.generator.wordstats[type][words[j]].push(words[j + 1])
          } else {
            state.generator.wordstats[type][words[j]] = [words[j + 1]]
          }
        }
      }
    }
  }
}

function choice (a) {
  var i = Math.floor(a.length * Math.random())
  return a[i]
}

function rarityChoice (a, external) {
  let choices = []
  for (let i in a) {
    var amount = a[i].chance
    var type = a[i].name
    if (external && external[type] !== null) {
      amount = external[type]
    }
    for (; amount > 0; amount--) {
      choices.push(a[i])
    }
  }
  return choice(choices)
}

function generateName (generator, type = 'Weapon', minLength = 3, maxLength = 5) {
  let word = choice(generator.startwords[type])
  let title = [word]
  while (generator.wordstats[type].hasOwnProperty(word)) {
    word = choice(generator.wordstats[type][word])
    title.push(word)
    if (title.length > minLength && generator.terminals[type].hasOwnProperty(word)) break
  }
  if (title.length < minLength) return generateName(generator, type, minLength, maxLength)
  if (maxLength && title.length > maxLength) return generateName(generator, type, minLength, maxLength)
  return title.join(' ')
}

function generateItem (state, crateTemplate) {
  let type = rarityChoice(state.generator.gearSlots, crateTemplate.contains.types).name
  let rarity = rarityChoice(state.generator.rarities, crateTemplate.contains.rarities).name

  return {
    name: generateName(state.generator, type),
    type: type,
    rarity: rarity,
    gearscore: 1
  }
}

function generateCrate (state) {
  let crates = []
  for (let i in state.generator.crates) {
    let crate = state.generator.crates[i]
    for (let j = 0; j < crate.chance; j++) {
      crates.push(crate)
    }
  }

  let crateTemplate = rarityChoice(state.generator.crates)
  let loot = []
  for (let i = 0; i < crateTemplate.contains.items; i++) {
    loot.push(generateItem(state, crateTemplate))
  }

  return {
    name: crateTemplate.name,
    type: 'Crate',
    rarity: crateTemplate.rarity,
    items: loot,
    equipped: false,
    gearscore: 1
  }
}
