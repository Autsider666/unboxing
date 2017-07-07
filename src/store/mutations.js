// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.

import Vue from 'vue'
import Mechanics from '../assets/mechanics'

export default {
  build (state) {
    state.bot.damage = 0
  },
  heal (state, amount) {
    if (state.bot.damage < state.bot.maxHealth && !state.inCombat) {
      state.bot.damage = Math.max(0, state.bot.damage - amount)
    }
  },
  combatTurn (state) {
    if (state.inCombat) {
      if (state.enemy.damage === undefined) Vue.set(state.enemy, 'damage', 0)
      Vue.set(state.enemy, 'damage', Math.min(state.enemy.maxHealth, state.enemy.damage + Mechanics.attack(state.bot, state.enemy)))
      if (!state.bot.gear.right || !state.bot.gear.right.defense) {
        state.bot.attackLeft = !state.bot.attackLeft
      }
      if (state.enemy.damage === state.enemy.maxHealth) {
        state.inCombat = false
        // console.log('Enemy died!')
        if (state.inventory.length < state.inventorySize) {
          state.inventory.unshift(generateCrate(state))
          notificationHub.notify({
            title: 'New ' + state.inventory[0].type + ' in your Inventory',
            text: 'Here, have a(n) ' + state.inventory[0].name
          })
        } else if (state.warehouse.length < state.warehouseSize) {
          let crate = generateCrate(state)
          state.warehouse.unshift(choice(crate.items))
          notificationHub.notify({
            title: 'New ' + state.warehouse[0].type + ' in your Warehouse',
            text: 'Here, have a(n) ' + state.warehouse[0].name + '<br><br>You were out of space, so we just picked one and send it to your warehouse'
          })
        }
        return
      }
      if (state.bot.damage === undefined) Vue.set(state.bot, 'damage', 0)
      Vue.set(state.bot, 'damage', Math.min(state.bot.maxHealth, state.bot.damage + Mechanics.attack(state.enemy, state.bot)))
      // if (!state.enemy.gear.right || !state.enemy.gear.right.defense) {
      //   state.enemy.attackLeft = !state.enemy.attackLeft
      // }
      if (state.bot.damage === state.bot.maxHealth) {
        state.inCombat = false
        // console.log('Your bot died!')
      }
    }
  },
  loadEnemy (state, enemy) {
    Vue.set(state, 'enemy', JSON.parse(JSON.stringify(enemy)))
  },
  startCombat (state) {
    // console.log('Starting combat!')
    state.inCombat = true
  },
  toggleIdleCombat (state) {
    state.enableIdleCombat = !state.enableIdleCombat
  },
  toggleIdleHealing (state) {
    state.enableIdleHealing = !state.enableIdleHealing
  },
  queueEnemy (state, enemy) {
    Vue.set(state, 'next', enemy)
    Vue.set(state.next, 'damage', 0)
  },
  chooseItem (state, {crate, item}) {
    for (let i in state.inventory) {
      if (state.inventory[i] === crate) {
        for (let j in crate.items) {
          if (crate.items[j] === item) {
            if (state.warehouse.length < state.warehouseSize) {
              state.inventory.splice(i, 1)
              state.warehouse.unshift(item)
            }
            break
          }
        }
      } else {
        Vue.set(state.inventory[i], 'open', false)
      }
    }

    // for (let i in state.warehouse) {
    //   if (state.warehouse[i] === crate) {
    //     for (let j in crate.items) {
    //       if (crate.items[j] === item) {
    //         state.warehouse.splice(i, 1)
    //         state.warehouse.unshift(item)
    //         break
    //       }
    //     }
    //   }
    //   Vue.set(state.warehouse[i], 'open', false)
    // }
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
    if (external && external[type] !== undefined && external[type] !== null) {
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
  let gs = Mechanics.getGearscore(state.enemy)
  let item = {
    name: generateName(state.generator, type),
    type: type,
    rarity: rarity
  }
  let mp = 1
  switch (rarity) {
    case 'Poor':
      mp = 0.9
      break
    case 'Good':
      mp = 1.1
      break
    case 'Great':
      mp = 1.2
      break
    case 'Amazing':
      mp = 1.3
      break
  }
  if (type === 'Weapon') {
    item.minDmg = Math.round((1 + (gs * Math.random())) * mp * 100) / 100
    item.maxDmg = Math.round((3 + (gs * Math.random())) * mp * 100) / 100
  } else {
    item.defense = Math.round(gs * Math.random() * mp * 100) / 100
  }

  return item
}

function generateCrate (state) {
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
    gearscore: Mechanics.getGearscore(state.enemy)
  }
}
