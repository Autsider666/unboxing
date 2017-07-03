import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
import * as items from '../assets/items_no-rarity.json'
import * as crates from '../assets/crates.json'
import * as gear from '../assets/gear.json'
import * as rarity from '../assets/rarity.json'

Vue.use(Vuex)

const state = {
  load: false,
  isGrindable: true,
  fps: 30.0,
  gearscore: 0,
  progress: 0,
  inventory: [],
  inventorySize: 10,
  warehouse: [],
  warehouseSize: 50,
  gear: {},
  location: {
    name: 'Test',
    gearscore: 15
  },
  locations: [{
    name: 'Test',
    gearscore: 15
  }],
  generator: {
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
