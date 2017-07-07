export default {
  attack (attackBot, defendBot) {
    let minDmg = 0
    let maxDmg = 0
    if (this.hits(attackBot, defendBot)) {
      if (!this.blocks(defendBot)) {
        if (attackBot.isPlayer) {
          if (attackBot.attackLeft || !attackBot.gear.right || attackBot.gear.right.defense) {
            if (attackBot.gear.left) {
              minDmg = attackBot.gear.left.minDmg
              maxDmg = attackBot.gear.left.maxDmg
            } else {
              minDmg = 1
              maxDmg = 3
            }
          } else {
            if (attackBot.gear.right) {
              minDmg = attackBot.gear.right.minDmg
              maxDmg = attackBot.gear.right.maxDmg
            } else {
              minDmg = 1
              maxDmg = 3
            }
          }
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
  // getExperience (bot, enemy) {
  //   let blockMod = 1.0
  //   let expMod = 1.0
  //   if (enemy.isPlayer) {
  //     if (enemy.level < 300) {
  //       expMod = 1.0
  //     } else if (enemy.level < 450) {
  //       expMod = 1.3
  //     } else if (enemy.level < 600) {
  //       expMod = 1.6
  //     } else if (enemy.level < 750) {
  //       expMod = 1.9
  //     } else if (enemy.level < 900) {
  //       expMod = 2.2
  //     } else {
  //       expMod = 2.5
  //     }
  //   }
  //
  //   return enemy.level * [Sthis.getHealth(enemy.health)] * bot.int / [Variable] / 2 * expMod * blockMod
  // },
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
    let defense = this.getDefense(bot)
    let abs = 0
    if (defense <= 1600) {
      abs = 2 * Math.sqrt(defense) / 100.0
    } else {
      abs = 2 * Math.sqrt((1600 / defense) * (defense - 1600) + 1600) / 100.0
    }
    return abs
  },
  getDefense (bot) {
    let defense = 0
    if (bot.isPlayer) {
      if (bot.gear.helmet) {
        defense += bot.gear.helmet.defense
      }
      if (bot.gear.body) {
        defense += bot.gear.body.defense
      }
      if (bot.gear.gloves) {
        defense += bot.gear.gloves.defense
      }
      if (bot.gear.boots) {
        defense += bot.gear.boots.defense
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
  // getAvgDamage (bot) {
  //   let dmg = bot.gear.left.minDmg + bot.gear.left.maxDmg
  //
  //   if (bot.gear.right && !bot.gear.right.defense) {
  //     dmg = (dmg + bot.gear.right.minDmg + bot.gear.right.maxDmg) / 4
  //   } else {
  //     dmg /= 2
  //   }
  //   return dmg
  // },
  getGearscore (bot) {
    return Math.round((bot.str + bot.con + bot.dex + bot.int) / 4)
  }
}