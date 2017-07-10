export default {
  attack (attackBot, defendBot) {
    let minDmg = 0
    let maxDmg = 0
    if (this.hits(attackBot, defendBot)) {
      if (!this.blocks(defendBot)) {
        if (attackBot.isPlayer) {
          // if (attackBot.attackLeft || !attackBot.gear.right || attackBot.gear.right.defense) {
          if (attackBot.gear.Weapon) {
            minDmg = attackBot.gear.Weapon.minDmg
            maxDmg = attackBot.gear.Weapon.maxDmg
          } else {
            minDmg = 1
            maxDmg = 3
          }
          // } else {
          //   if (attackBot.gear.right) {
          //     minDmg = attackBot.gear.Weapon.minDmg
          //     maxDmg = attackBot.gear.Weapon.maxDmg
          //   } else {
          //     minDmg = 1
          //     maxDmg = 3
          //   }
          // }
          minDmg = this.getDamage(attackBot, minDmg)
          maxDmg = this.getDamage(attackBot, maxDmg)
        } else {
          minDmg = this.getDamage(attackBot, attackBot.minDmg)
          maxDmg = this.getDamage(attackBot, attackBot.maxDmg)
        }
        let dmg = this.absorb(defendBot, minDmg + (maxDmg - minDmg) * Math.random())
        attackBot.lastAttack = Math.round(dmg * 100) / 100 + ' dmg'
        if (attackBot.actions) attackBot.actions.push(attackBot.lastAttack)
        return dmg
      }
      attackBot.lastAttack = 'Blocked'
      if (attackBot.actions) attackBot.actions.push(attackBot.lastAttack)
      return 0
    }
    attackBot.lastAttack = 'Missed'
    if (attackBot.actions) attackBot.actions.push(attackBot.lastAttack)
    return 0
  },
  hits (attacker, defender) {
    return this.getHitChance(attacker, defender) >= Math.random()
  },
  blocks (bot) {
    return this.getBlockChance(bot) <= Math.random()
  },
  absorb (bot, dmg) {
    return dmg - dmg * this.getAbsorb(bot)
  },
  getExperience (state) {
    let blockMod = 1.0
    let expMod = 1.0
    if (state.enemy.level < 300) {
      expMod = 1.0
    } else if (state.enemy.level < 450) {
      expMod = 1.3
    } else if (state.enemy.level < 600) {
      expMod = 1.6
    } else if (state.enemy.level < 750) {
      expMod = 1.9
    } else if (state.enemy.level < 900) {
      expMod = 2.2
    } else {
      expMod = 2.5
    }
    let variable = 1
    if (state.enemy.damage >= state.enemy.maxHealth) { // win
      if (state.enemy.lvl < state.workshop.lvl) { // lower
        variable = 150
      } else { // higher or equal
        variable = 100
      }
    } else { // lose
      if (state.enemy.lvl < state.workshop.lvl) { // lower
        variable = 300
      } else { // higher or equal
        variable = 200
      }
    }
    return Math.round(state.enemy.lvl * state.enemy.damage * state.bot.int / variable / 2 * expMod * blockMod)
  },
  getAttackRating (bot) {
    return bot.dex * 2 - 8
  },
  getDefenseRating (bot) {
    return bot.dex / 2.0
  },
  getMaxHealth (bot) {
    return bot.con * 10 + 50
  },
  getAbsorb (bot) {
    let defense = this.getArmor(bot)
    let abs = 0
    if (defense <= 1600) {
      abs = 2 * Math.sqrt(defense) / 100
    } else {
      abs = 2 * Math.sqrt((1600 / defense) * (defense - 1600) + 1600) / 100
    }
    return abs
  },
  getArmor (bot) {
    let defense = 0
    if (bot.isPlayer) {
      if (bot.gear.Head) {
        defense += bot.gear.Head.defense
      }
      if (bot.gear.Chest) {
        defense += bot.gear.Chest.defense
      }
      if (bot.gear.Legs) {
        defense += bot.gear.Legs.defense
      }
      if (bot.gear.Feet) {
        defense += bot.gear.Feet.defense
      }
    } else {
      defense = bot.defense
    }
    return defense
  },
  getHitChance (attacker, defender) {
    return Math.max(0.05, Math.min(0.95, (this.getAttackRating(attacker) / (this.getAttackRating(attacker) + this.getDefenseRating(defender)))))
  },
  getBlockChance (bot) {
    let chance = 25 * (bot.dex - 50) / (bot.level * 2)
    if (bot.isPlayer) {
      if (bot.gear.right && bot.gear.right.defense) {
        chance += bot.gear.right.block
      }
    } else {
      chance = bot.blockChance * 1.0
    }
    return Math.max(0.05, Math.min(0.70, chance / 100))
  },
  getDamage (bot, amount) {
    return amount * (bot.str + 100) / 100
  },
  getGearscore (bot) {
    return Math.round((bot.str + bot.con + bot.dex + bot.int) / 4)
  }
}
