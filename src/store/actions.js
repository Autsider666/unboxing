// actions are functions that causes side effects and can involve
// asynchronous operations.

import Mechanics from '../assets/mechanics'

export default {
  tick ({commit, state}, deltaSeconds) {
    if (state.bot && !state.bot.maxHealth) state.bot.maxHealth = Mechanics.getMaxHealth(state.bot)
    if (state.enemy && !state.enemy.maxHealth) state.enemy.maxHealth = Mechanics.getMaxHealth(state.enemy)
    if (!state.inCombat) {
      if (state.workshop.exp >= state.workshop.expToNext) {
        commit('levelUp')
      }
      if (state.next && !state.enemy || state.next && state.enemy && (state.next.name !== state.enemy.name || state.enemy.damage >= state.enemy.maxHealth || state.bot && state.bot.damage === state.bot.maxHealth && state.enemy.damage > 0)) {
        commit('loadEnemy', state.next)
      }
      if (state.bot && state.bot.damage !== state.bot.maxHealth && state.bot.damage > 0 && state.enableIdleHealing) {
        commit('heal', state.healingPerSecond * deltaSeconds)
      } else if (state.bot && state.enemy && ((state.bot.damage === 0 || !state.enableIdleHealing && state.bot.damage < state.bot.maxHealth) && state.enableIdleCombat)) {
        commit('startCombat')
      }
    }
  },
  attack ({commit, state}) {
    if (state.inCombat) {
      commit('combatTurn')
    }
  }
}
