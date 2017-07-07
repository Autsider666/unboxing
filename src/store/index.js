import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
import * as items from '../assets/items_no-rarity.json'
import * as crates from '../assets/crates.json'
import * as gear from '../assets/gear.json'
import * as rarity from '../assets/rarity.json'
import * as enemies from '../assets/enemies.json'
import * as weapons from '../assets/weapons.json'

Vue.use(Vuex)

const state = {
  delta: 0,
  healingPerSecond: 5,
  enableIdleHealing: true,
  enableIdleCombat: true,
  attackDuration: 400,
  fps: 15.0,
  inCombat: true,
  scrap: 0,
  bot: {
    isPlayer: true,
    name: 'Your bot',
    con: 10,
    str: 10,
    dex: 10,
    int: 10,
    attackLeft: true,
    gear: {
      left: null,
      right: null,
      Chest: null,
      Head: null,
      Legs: null,
      Feet: null
    },
    actions: [],
    damage: 0
  },
  enemy: {
    name: 'Infant',
    lvl: 1,
    minLvl: 1,
    con: 1,
    str: 5,
    dex: 5,
    int: 5,
    minDmg: 1,
    maxDmg: 3,
    defense: 0,
    damage: 0
  },
  next: {
    name: 'Infant',
    lvl: 1,
    minLvl: 1,
    con: 1,
    str: 5,
    dex: 5,
    int: 5,
    minDmg: 1,
    maxDmg: 3,
    defense: 0,
    damage: 0
  },
  enemies: enemies,
  gearscore: 0,
  progress: 0,
  inventory: [],
  inventorySize: 10,
  warehouse: [],
  warehouseSize: 50,
  workshop: {
    lvl: 1,
    exp: 0
  },
  generator: {
    weapons: weapons,
    items: items,
    gearSlots: gear,
    rarities: rarity,
    terminals: {},
    startwords: {},
    wordstats: {},
    crates: crates
  }
}
// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
