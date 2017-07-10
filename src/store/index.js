import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import createPersist from 'vuex-localstorage'

import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

Vue.use(Vuex)

const state = {}
// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  strict: true,
  // plugins: [createPersistedState()],
  plugins: [createPersist({
    namespace: 'unboxing',
    initialState: {}
    // ONE_WEEK
    // expires: 7 * 24 * 60 * 60 * 1e3
    // expires: 60 * 1e3
  })],
  state,
  getters,
  actions,
  mutations
})
