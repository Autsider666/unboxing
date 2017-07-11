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
                            <multiselect :placeholder="'No ' +slot+' installed'" :value="equipped"
                                         :options="sortedWarehouse[slot] || []"
                                         :searchable="false" @input="gearChange"
                                         :disabled="inCombat || sortedWarehouse[slot] === undefined"
                                         class="editable" SelectLabel="'Select to equip'"
                                         :custom-label="customSelectedField" :allow-empty="false" :show-labels="false">
                            <template slot="option" scope="props">
                                <span v-bind:class="props.option.rarity">{{props.option.name}} ({{props.option.rarity}})
                                    <span v-if="!props.option.defense">{{props.option.minDmg}} - {{props.option.maxDmg}} dmg</span>
                                    <span v-if="props.option.defense">{{props.option.defense}} defense</span>
                                </span>
                            </template>
                        </multiselect>
                        </span>
                        </p>
                    </div>
                    <!--<p class="control">-->
                        <!--<button type="submit" class="button is-primary" @click="install">Install</button>-->
                    <!--</p>-->
                </div>
            </div>
        </div>
        <div v-else>
            Please construct your prototype bot first to use it in a fight
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Mechanics from '../assets/mechanics'

  import _ from 'lodash'

  import Multiselect from 'vue-multiselect'

  export default {
    name: 'CurrentBot',
    components: {Multiselect},
    data () {
      return {}
    },
    methods: {
      customSelectedField (item) {
        let field = item.name + ' (' + item.rarity + ')'

        if (item.type === 'Weapon') {
          field += ' ' + item.minDmg + ' - ' + item.maxDmg + ' dmg'
        } else {
          field += ' ' + item.defense + ' armor'
        }

        return field
      },
      build () {
        this.$store.commit('build')
      },
      updateBot (field, value) {
        this.$store.commit('updateBot', {field, value})
      },
      gearChange (item) {
        this.$store.commit('equipBot', item)
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
        return Math.round(Mechanics.getAbsorb(this.bot) * 10000) / 100 + '%'
      },
      sortedWarehouse () {
        let data = _.chain(this.warehouse)
          .sortBy(function (item) {
            if (item.type === 'Weapon') {
              return item.minDmg + item.maxDmg
            } else {
              return item.defense
            }
          })
          .reverse()
          .groupBy('type')
          .value()
        return data
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
        background-color: #201F1D !important;
        border: 1px solid rgb(128, 83, 38) !important;
        color: inherit;
    }

    .editable {
        background-color: #201F1D !important;
        border: 1px solid orange;
        color: inherit;
    }
</style>
