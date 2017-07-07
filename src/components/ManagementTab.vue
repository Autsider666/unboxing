<template>
    <div>
        <button class="button is-light is-large is-outlined" @click="startCombat"
                :disabled="inCombat || enableIdleCombat">
            Fight
        </button>
        <button class="button is-light is-large is-outlined" @click="build"
                :disabled="inCombat || bot.damage !== bot.maxHealth">
            Rebuild
        </button>
        <button class="button is-light is-large" @click="toggleIdleCombat"
                v-bind:class="enableIdleCombat ? '' : 'is-inverted'">
            <!--<span v-if="enableIdleCombat">Disable</span>-->
            <!--<span v-else>Enable</span>-->
            <!--&nbsp-->
            <i v-if="enableIdleCombat" class="fa fa-play" aria-hidden="true"></i>
            <i v-else="" class="fa fa-pause" aria-hidden="true"></i>
            &nbsp;
            Idle Combat
        </button>

        <button class="button is-light is-large" @click="toggleIdleHealing"
                v-bind:class="enableIdleHealing ? '' : 'is-inverted'">
            <!--<span v-if="enableIdleHealing">Disable</span>-->
            <!--<span v-else>Enable</span>-->
            <!--&nbsp-->
            <i v-if="enableIdleHealing" class="fa fa-check" aria-hidden="true"></i>
            <i v-else="" class="fa fa-times" aria-hidden="true"></i>
            &nbsp;
            Idle Repair
        </button>

        <br><br>
    </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'Management',
    data () {
      return {}
    },
    methods: mapMutations([
      'grind',
      'toggleIdleCombat',
      'toggleIdleHealing',
      'startCombat',
      'build'
    ]),
    computed: mapState([
      'enableIdleCombat',
      'enableIdleHealing',
      'inCombat',
      'bot'
    ])
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
