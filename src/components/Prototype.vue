<template>
    <div>
        <button class="button is-light is-large is-outlined" @click="build"
                :disabled="inCombat || bot && bot.damage !== bot.maxHealth">
            Construct prototype
        </button>
        <br><br>
        <!--<code>{{prototype}}</code><br><br>-->

        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Name</label>
            </div>
            <div class="field-body">
                <div class="field has-addons">
                    <p class="control">
                        <input class="input is-warning" type="text" :value="prototype.name"
                               v-on:keyup.stop="updatePrototype('name', $event.target.value)"/>
                    </p>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Spare stat points</label>
            </div>
            <div class="field-body">
                <div class="field has-addons">
                    <p class="control">
                        <input class="input is-warning" type="text" :value="workshop.statPoints" readonly>
                    </p>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Constitution</label>
            </div>
            <div class="field-body">
                <div class="field has-addons">
                    <p class="control" @click="minusStat('con')">
                        <a class="button is-warning" :disabled="prototype.con <= 10">
                            <i class="fa fa-minus" aria-hidden="true"></i>
                        </a>
                    </p>
                    <p class="control">
                        <input class="input is-warning" type="text" :value="prototype.con" readonly>
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
                <div class="field has-addons">
                    <p class="control" @click="minusStat('str')">
                        <a class="button is-warning" :disabled="prototype.str <= 10">
                            <i class="fa fa-minus" aria-hidden="true"></i>
                        </a>
                    </p>
                    <p class="control">
                        <input class="input is-warning" type="text" :value="prototype.str" readonly>
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
                <div class="field has-addons">
                    <p class="control" @click="minusStat('dex')">
                        <a class="button is-warning" :disabled="prototype.dex <= 10">
                            <i class="fa fa-minus" aria-hidden="true"></i>
                        </a>
                    </p>
                    <p class="control">
                        <input class="input is-warning" type="text" :value="prototype.dex" readonly>
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
                <div class="field has-addons">
                    <p class="control" @click="minusStat('int')">
                        <a class="button is-warning" :disabled="prototype.int <= 10">
                            <i class="fa fa-minus" aria-hidden="true"></i>
                        </a>
                    </p>
                    <p class="control">
                        <input class="input is-warning" type="text" :value="prototype.int" readonly>
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
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Prototype',
    data () {
      return {}
    },
    methods: {
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
      }
    },
    computed: mapState({
      inCombat: 'inCombat',
      bot: 'bot',
      workshop: 'workshop',
      prototype: 'prototype'
    })
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
