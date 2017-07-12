// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.

import Vue from 'vue'
import Mechanics from '../assets/mechanics'
import _ from 'lodash'

export default {
  updatePrototype (state, {field, value}) {
    Object.assign(state.prototype, {
      [field]: value
    })
  },
  minusStat (state, stat) {
    if (state.prototype[stat] > 10) {
      state.prototype[stat]--
      state.workshop.statPoints++
    }
  },
  plusStat (state, stat) {
    if (state.workshop.statPoints > 0) {
      state.prototype[stat]++
      state.workshop.statPoints--
    }
  },
  updatePrototypeGear (state, {field, value}) {
    Object.assign(state.prototype.gear, {
      [field]: value
    })
  },
  build (state) {
    Vue.set(state, 'bot', JSON.parse(JSON.stringify(state.prototype)))
    state.prototype.gear = {
      Weapon: null,
      Chest: null,
      Head: null,
      Legs: null,
      Feet: null
    }
  },
  heal (state, amount) {
    if (state.bot.damage < state.bot.maxHealth && !state.inCombat) {
      state.bot.damage = Math.max(0, state.bot.damage - amount)
    }
  },
  combatTurn (state) {
    if (state.inCombat) {
      if (state.enemy.damage === undefined) Vue.set(state.enemy, 'damage', 0)
      Vue.set(state.enemy, 'damage', state.enemy.damage + Mechanics.attack(state.bot, state.enemy))
      if (!state.bot.gear.right || !state.bot.gear.right.defense) {
        state.bot.attackLeft = !state.bot.attackLeft
      }
      if (state.enemy.damage >= state.enemy.maxHealth) {
        state.inCombat = false
        state.workshop.exp += Mechanics.getExperience(state)
        if (state.hammerspace.length < state.hammerspaceSize) {
          state.hammerspace.unshift(generateCrate(state))
          notificationHub.notify({
            title: 'New ' + state.hammerspace[0].type + ' in your Hammerspace',
            text: 'Here, have a(n) ' + state.hammerspace[0].name
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
        state.workshop.exp += Mechanics.getExperience(state)
      }
    }
  },
  loadEnemy (state, enemy) {
    Vue.set(state, 'enemy', JSON.parse(JSON.stringify(enemy)))
  },
  startCombat (state) {
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
  levelUp (state) {
    if (state.workshop.exp >= state.workshop.expToNext) {
      state.workshop.exp -= state.workshop.expToNext
      let mp = 1.3
      if (state.workshop.lvl > 180) {
        mp = 1.03
      } else if (state.workshop.lvl > 150) {
        mp = 1.05
      } else if (state.workshop.lvl > 80) {
        mp = 1.08
      } else if (state.workshop.lvl > 35) {
        mp = 1.010
      }

      state.workshop.expToNext = Math.round(state.workshop.expToNext * mp)
      state.workshop.lvl++
      state.workshop.statPoints += 4
    }
  },
  chooseItem (state, {crate, item}) {
    for (let i in state.hammerspace) {
      if (state.hammerspace[i] === crate) {
        for (let j in crate.items) {
          if (crate.items[j] === item) {
            if (state.warehouse.length < state.warehouseSize) {
              state.hammerspace.splice(i, 1)
              state.warehouse.unshift(item)
            }
            break
          }
        }
      } else {
        Vue.set(state.hammerspace[i], 'open', false)
      }
    }
  },
  equipBot (state, item) {
    if (!state.inCombat) {
      for (let i in state.warehouse) {
        if (_.isEqual(state.warehouse[i], item)) {
          state.warehouse.splice(i, 1)
          Vue.set(state.bot.gear, item.type, item)
        }
      }
    }
  },
  equipPrototype (state, item) {
    for (let i in state.warehouse) {
      if (_.isEqual(state.warehouse[i], item)) {
        state.warehouse.splice(i, 1)
        if (state.prototype.gear[item.type]) {
          state.warehouse.unshift(state.prototype.gear[item.type])
        }
        Vue.set(state.prototype.gear, item.type, item)
      }
    }
  },
  remove (state, item) {
    for (let i in state.hammerspace) {
      if (_.isEqual(state.hammerspace[i], item)) {
        state.hammerspace.splice(i, 1)
        break
      }
    }
    for (let i in state.warehouse) {
      if (_.isEqual(state.warehouse[i], item)) {
        state.warehouse.splice(i, 1)
        break
      }
    }
  },
  open (state, item) {
    for (let i in state.hammerspace) {
      if (_.isEqual(state.hammerspace[i], item)) {
        Vue.set(state.hammerspace[i], 'open', true)
        break
      } else {
        Vue.set(state.hammerspace[i], 'open', false)
      }
    }
    // for (let i in state.warehouse) {
    //   if (state.warehouse[i] === item) {
    //     Vue.set(state.warehouse[i], 'open', true)
    //     break
    //   } else {
    //     Vue.set(state.warehouse[i], 'open', false)
    //   }
    // }
  },
  close (state) {
    for (let i in state.hammerspace) {
      Vue.set(state.hammerspace[i], 'open', false)
    }
    // for (let i in state.warehouse) {
    //   Vue.set(state.hammerspace[i], 'open', false)
    // }
  },
  loadState (state, initState) {
    _.forEach(initState, function (value, key) {
      Vue.set(state, key, value)
    })
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
    state.loaded = true
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

function generateName (generator, type = 'Weapon', minLength = 3, maxLength = 10) {
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

  let chances = {
    less: {
      min: 0.1,
      alpha: 1,
      max: 10
    },
    better: {
      min: 0.1,
      alpha: 1,
      max: 50
    },
    reqConv: {
      min: 1,
      alpha: 1,
      max: 5
    },
    spread: {
      min: 1,
      alpha: 2,
      max: 100
    }
  }
  let mp = 1
  let nameLength = 4
  switch (rarity) {
    case 'Poor':
      mp = 0.7
      nameLength = 2
      break
    case 'Good':
      mp = 1.2
      nameLength = 5
      break
    case 'Great':
      mp = 1.4
      nameLength = 6
      break
    case 'Amazing':
      nameLength = 8
      mp = 1.7
      break
  }
  let reqConv = 4 - mp

  let lvl = state.enemy.lvl
  // let iLvl = state.enemy.lvl
  let less = Math.min(chances.less.max, Math.round(paretoDistribution(chances.less.min, chances.less.alpha)))
  if (less) {
    lvl -= less
  } else {
    lvl += Math.min(chances.better.max, Math.round(paretoDistribution(chances.better.min, chances.better.alpha)))
  }
  if (lvl < 1) {
    lvl = 1
  }
  let item = {
    name: generateName(state.generator, type, nameLength),
    type: type,
    rarity: rarity
  }
  if (type === 'Weapon') {
    let chance = Math.floor(Math.random() * 4)
    switch (chance) {
      case 0 : // str
        item.strReq = 10 + lvl
        break
      case 1 : // dex
        item.dexReq = 10 + lvl
        break
      default : // double
        let str = Math.floor((Math.random() * lvl) + 1)
        item.strReq = 10 + str
        item.dexReq = 10 + lvl - str
        break
    }

    if (lvl < 2.5) {
      lvl = 2.5
    }
    let avgDmg = lvl / reqConv
    let spread = Math.min(nameLength * 2, paretoDistribution(nameLength, chances.spread.alpha))
    if (avgDmg < 2.5) {
      avgDmg += 2.5
    }
    spread = avgDmg / spread
    item.minDmg = Math.round((avgDmg - spread) * 100) / 100
    item.maxDmg = Math.round((avgDmg + spread) * 100) / 100
  } else {
    let mult = 0.5
    switch (type) {
      case 'Chest':
        mult = 2
        break
      case 'Head':
        mult = 1
        break
    }
    item.defense = Math.round((lvl * mp * mult) * 100) / 100
    item.strReq = Math.round(10 + lvl)
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

function paretoDistribution (minimum, alpha) {
  var u = 1.0 - Math.random()
  return minimum / Math.pow(u, 1.0 / alpha)
}
