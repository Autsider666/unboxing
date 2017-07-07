// actions are functions that causes side effects and can involve
// asynchronous operations.

import Mechanics from '../assets/mechanics'

export default {
  tick ({commit, state}, deltaSeconds) {
    // commit('storeRefresh')
    if (!state.bot.maxHealth) state.bot.maxHealth = Mechanics.getMaxHealth(state.bot)
    if (!state.enemy.maxHealth) state.enemy.maxHealth = Mechanics.getMaxHealth(state.enemy)
    if (!state.inCombat) {
      if (state.bot.damage !== state.bot.maxHealth && state.enableIdleHealing) {
        commit('heal', state.healingPerSecond * deltaSeconds)
      }
      if ((state.bot.damage === 0 || !state.enableIdleHealing) && state.enableIdleCombat) {
        commit('startCombat')
      }
      if (state.next.name !== state.enemy.name || state.enemy.damage === state.enemy.maxHealth || state.bot.damage === state.bot.maxHealth) {
        commit('loadEnemy', state.next)
      }
    }
  },
  attack ({commit, state}) {
    if (state.inCombat) {
      commit('combatTurn')
    }
  }
}
