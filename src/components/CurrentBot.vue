<template>
    <div>
        <div v-if="bot">
            <div class="columns">
                <div class="column is-4">
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Name</label>
                        </div>
                        <div class="field-body">
                            <div class="field has-addons has-addons-right">
                                <p class="control long">
                                    <input class="input readonly" type="text" :value="bot.name" readonly>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Statpoints</label>
                        </div>
                        <div class="field-body">
                            <div class="field has-addons has-addons-right">
                                <p class="control long">
                                    <input class="input readonly" type="text" :value="workshop.statPoints" readonly>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Constitution</label>
                        </div>
                        <div class="field-body">
                            <div class="field has-addons has-addons-right">
                                <p class="control long">
                                    <input class="input readonly" type="text" :value="bot.con" readonly>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Strength</label>
                        </div>
                        <div class="field-body">
                            <div class="field has-addons has-addons-right">
                                <p class="control long">
                                    <input class="input readonly" type="text" :value="bot.str" readonly>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Dexterity</label>
                        </div>
                        <div class="field-body">
                            <div class="field has-addons has-addons-right">
                                <p class="control long">
                                    <input class="input readonly" type="text" :value="bot.dex" readonly>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Intelligence</label>
                        </div>
                        <div class="field-body">
                            <div class="field has-addons has-addons-right">
                                <p class="control long">
                                    <input class="input readonly" type="text" :value="bot.int" readonly>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="column"></div>

                <div class="column is-4">
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label has-text-left">Armor</label>
                        </div>
                        <div class="field-body">
                            <div class="field has-addons has-addons-right">
                                <p class="control long">
                                    <input class="input readonly" type="text" :value="defense" readonly>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal is-right">
                        <div class="field-label is-normal">
                            <label class="label has-text-left">Absorb</label>
                        </div>
                        <div class="field-body">
                            <div class="field has-addons has-addons-right">
                                <p class="control long">
                                    <input class="input readonly" type="text" :value="absorb" readonly>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label has-text-left">Hp</label>
                        </div>
                        <div class="field-body">
                            <div class="field has-addons has-addons-right">
                                <p class="control long">
                                    <input class="input readonly" type="text" :value="health" readonly>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label has-text-left">Damage</label>
                        </div>
                        <div class="field-body">
                            <div class="field has-addons has-addons-right">
                                <p class="control long">
                                    <input class="input readonly" type="text" :value="damage" readonly>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal is-right">
                        <div class="field-label is-normal">
                            <label class="label has-text-left">Hit</label>
                        </div>
                        <div class="field-body">
                            <div class="field has-addons has-addons-right">
                                <p class="control long">
                                    <input class="input readonly" type="text" :value="attackRating" readonly>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal is-right">
                        <div class="field-label is-normal">
                            <label class="label has-text-left">Dodge</label>
                        </div>
                        <div class="field-body">
                            <div class="field has-addons has-addons-right">
                                <p class="control long">
                                    <input class="input readonly" type="text" :value="defenseRating" readonly>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <p>
                Warning: You lose the currently equipped item when replacing it on an active bot!<br><br>
            </p>

            <div class="field is-horizontal" v-for="(equipped, slot) in bot.gear">
                <div class="field-label is-normal">
                    <label class="label has-text-left">{{slot}}</label>
                </div>
                <div class="field-body">
                    <div class="field has-addons has-addons-left">
                        <p class="control is-expanded">
                        <span class="select is-fullwidth">
                          <select @change="gearChange(slot, $event.target.value)" :disabled="inCombat">
                              <option v-if="equipped" :value="JSON.stringify(equipped)">
                                  <span v-bind:class="equipped.rarity">{{equipped.name}} ({{equipped.rarity}}) <span
                                          v-if="!equipped.defense">{{equipped.minDmg}} - {{equipped.maxDmg}}</span><span
                                          v-if="equipped.defense">{{equipped.defense}} defense</span></span>
                              </option>
                              <option v-else selected disabled hidden value="">
                                  No {{slot}} installed
                              </option>
                              <option v-for="item in warehouse" :value="JSON.stringify(item)"
                                      v-if="item.type === slot">
                                  <span v-bind:class="item.rarity">{{item.name}} ({{item.rarity}}) <span
                                          v-if="!item.defense">{{item.minDmg}} - {{item.maxDmg}}</span><span
                                          v-if="item.defense">{{item.defense}} defense</span></span>
                              </option>
                          </select>
                        </span>
                        </p>
                        <!--<p class="control">-->
                        <!--<button class="button is-primary">Equip</button>-->
                        <!--</p>-->
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            Please construct a bot first
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Mechanics from '../assets/mechanics'

  export default {
    name: 'CurrentBot',
    data () {
      return {}
    },
    methods: {
      build () {
        this.$store.commit('build')
      },
      updateBot (field, value) {
        this.$store.commit('updateBot', {field, value})
      },
      gearChange (slot, event) {
        console.log(slot, JSON.parse(event))
        this.$store.commit('equipBot', JSON.parse(event))
      }
    },
    computed: mapState({
      inCombat: 'inCombat',
      bot: 'bot',
      workshop: 'workshop',
      warehouse: 'warehouse',
      gear: {},
      health () {
        let max = Mechanics.getMaxHealth(this.bot)
        return max - Math.round(this.bot.damage) + '/' + max
      },
      damage () {
        if (this.bot.gear.Weapon) {
          return Math.round(Mechanics.getDamage(this.bot, this.bot.gear.Weapon.minDmg) * 100) / 100 + '-' + Math.round(Mechanics.getDamage(this.bot, this.bot.gear.Weapon.maxDmg) * 100) / 100
        } else {
          return Mechanics.getDamage(this.bot, 1) + '-' + Mechanics.getDamage(this.bot, 3)
        }
      },
      attackRating () {
        return Mechanics.getAttackRating(this.bot)
      },
      defenseRating () {
        return Mechanics.getDefenseRating(this.bot)
      },
      defense () {
        return Math.round(Mechanics.getArmor(this.bot) * 100) / 100
      },
      absorb () {
        return Math.round(Mechanics.getAbsorb(this.bot) * 100) / 100 + '%'
      }
    })
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .long {
        max-width: 130px;
    }

    .short {
        max-width: 55px;
    }

    .button.is-warning {
        background-color: orange !important;
    }

    .readonly {
        background-color: inherit !important;
        border: 1px solid rgb(128, 83, 38) !important;
        color: inherit;
    }

    .editable {
        background-color: inherit !important;
        border: 1px solid orange !important;
        color: inherit;
    }
</style>
