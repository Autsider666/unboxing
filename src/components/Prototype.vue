<template>
    <div>
        <button class="button is-light is-large is-outlined" @click="build"
                :disabled="inCombat">
            <span v-if="bot">Replace</span>
            <span v-else>Construct</span>
            &nbsp;prototype
        </button>
        <br><br>

        <div class="columns">
            <div class="column is-4">
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">Name</label>
                    </div>
                    <div class="field-body">
                        <div class="field has-addons has-addons-right">
                            <p class="control long">
                                <input class="input editable" type="text" :value="prototype.name"
                                       v-on:keyup.stop="updatePrototype('name', $event.target.value)"/>
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
                            <p class="control" @click="minusStat('con')">
                                <a class="button is-warning" :disabled="prototype.con <= 10">
                                    <i class="fa fa-minus" aria-hidden="true"></i>
                                </a>
                            </p>
                            <p class="control short">
                                <input class="input readonly" type="text" :value="prototype.con" readonly>
                            </p>
                            <p class="control" @click="plusStat('con')">
                                <a class="button is-warning" :disabled="workshop.statPoints === 0">
                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                </a>
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
                            <p class="control" @click="minusStat('str')">
                                <a class="button is-warning" :disabled="prototype.str <= 10">
                                    <i class="fa fa-minus" aria-hidden="true"></i>
                                </a>
                            </p>
                            <p class="control short">
                                <input class="input readonly" type="text" :value="prototype.str" readonly>
                            </p>
                            <p class="control" @click="plusStat('str')">
                                <a class="button is-warning" :disabled="workshop.statPoints === 0">
                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                </a>
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
                            <p class="control" @click="minusStat('dex')">
                                <a class="button is-warning" :disabled="prototype.dex <= 10">
                                    <i class="fa fa-minus" aria-hidden="true"></i>
                                </a>
                            </p>
                            <p class="control short">
                                <input class="input readonly" type="text" :value="prototype.dex" readonly>
                            </p>
                            <p class="control" @click="plusStat('dex')">
                                <a class="button is-warning" :disabled="workshop.statPoints === 0">
                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                </a>
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
                            <p class="control" @click="minusStat('int')">
                                <a class="button is-warning" :disabled="prototype.int <= 10">
                                    <i class="fa fa-minus" aria-hidden="true"></i>
                                </a>
                            </p>
                            <p class="control short">
                                <input class="input readonly" type="text" :value="prototype.int" readonly>
                            </p>
                            <p class="control" @click="plusStat('int')">
                                <a class="button is-warning" :disabled="workshop.statPoints === 0">
                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                </a>
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

        <div class="field is-horizontal" v-for="(equipped, slot) in prototype.gear">
            <div class="field-label is-normal">
                <label class="label has-text-left">{{slot}}</label>
            </div>
            <div class="field-body">
                <div class="field has-addons has-addons-left">
                    <p class="control is-expanded">
                        <multiselect :placeholder="'No ' +slot+' installed'" :value="equipped"
                                     :options="sortedWarehouse[slot] || []"
                                     :searchable="false" @input="gearChange"
                                     :disabled="sortedWarehouse[slot] === undefined"
                                     class="editable" SelectLabel="'Select to equip'"
                                     :custom-label="customSelectedField" :allow-empty="false" :show-labels="false">
                            <template slot="option" scope="props">
                                <span v-bind:class="props.option.rarity">{{props.option.name}} ({{props.option.rarity}})
                                    <span v-if="!props.option.defense">{{props.option.minDmg}} - {{props.option.maxDmg}} dmg</span>
                                    <span v-if="props.option.defense">{{props.option.defense}} defense</span>
                                </span>
                            </template>
                        </multiselect>
                    </p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Mechanics from '../assets/mechanics'
  import _ from 'lodash'

  import Multiselect from 'vue-multiselect'

  export default {
    name: 'Prototype',
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
      updatePrototype (field, value) {
        this.$store.commit('updatePrototype', {field, value})
      },
      plusStat (stat) {
        this.$store.commit('plusStat', stat)
//        this.updatePrototype(stat, this.$store.state.prototype[stat] + 1)
      },
      minusStat (stat) {
        if (this.$store.state.prototype[stat] > 10) {
          this.$store.commit('minusStat', stat)
//          this.updatePrototype(stat, this.$store.state.prototype[stat] - 1)
        }
      },
      gearChange (item) {
        this.$store.commit('equipPrototype', item)
      }
    },
    computed: mapState({
      inCombat: 'inCombat',
      bot: 'bot',
      workshop: 'workshop',
      prototype: 'prototype',
      warehouse: 'warehouse',
      gear: {},
      health () {
        return Mechanics.getMaxHealth(this.prototype)
      },
      damage () {
        if (this.prototype.gear.Weapon) {
          return Math.round(Mechanics.getDamage(this.prototype, this.prototype.gear.Weapon.minDmg) * 100) / 100 + '-' + Math.round(Mechanics.getDamage(this.prototype, this.prototype.gear.Weapon.maxDmg) * 100) / 100
        } else {
          return Mechanics.getDamage(this.prototype, 1) + '-' + Mechanics.getDamage(this.prototype, 3)
        }
      },
      attackRating () {
        return Mechanics.getAttackRating(this.prototype)
      },
      defenseRating () {
        return Mechanics.getDefenseRating(this.prototype)
      },
      defense () {
        return Math.round(Mechanics.getArmor(this.prototype) * 100) / 100
      },
      absorb () {
        return Math.round(Mechanics.getAbsorb(this.prototype) * 100) / 100 + '%'
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
