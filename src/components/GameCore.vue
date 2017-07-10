<template>
</template>

<script>
  import { mapState } from 'vuex'

  import * as items from '../assets/items_no-rarity.json'
  import * as crates from '../assets/crates.json'
  import * as gear from '../assets/gear.json'
  import * as rarity from '../assets/rarity.json'
  import * as enemies from '../assets/enemies.json'
  import * as weapons from '../assets/weapons.json'

  let initState = {
    version: '0.1.0',
    loaded: false,
    delta: 0,
    healingPerSecond: 5,
    enableIdleHealing: false,
    enableIdleCombat: false,
    attackDuration: 400,
    fps: 15.0,
    inCombat: false,
    scrap: 0,
    enemy: null,
    next: null,
    bot: null,
    prototype: {
      isPlayer: true,
      name: 'Your bot',
      con: 10,
      str: 10,
      dex: 10,
      int: 10,
      attackLeft: true,
      gear: {
        Weapon: null,
        Chest: null,
        Head: null,
        Legs: null,
        Feet: null
      },
      actions: [],
      damage: 0
    },
    enemies: enemies,
    gearscore: 0,
    progress: 0,
    hammerspace: [],
    hammerspaceSize: 10,
    warehouse: [],
    warehouseSize: 50,
    workshop: {
      statPoints: 0,
      lvl: 1,
      exp: 0,
      expToNext: 70
    },
    generator: {
      weapons: weapons,
      items: items,
      gearSlots: gear,
      rarities: rarity,
      terminals: {},
      startwords: {},
      wordstats: {},
      crates: crates
    }
  }

  export default {
    name: 'core',
    data () {
      return {
        interval: 0,
        before: 0,
        delta: 0
      }
    },
    computed: mapState([
      'attackDuration',
      'fps',
      'loaded',
      'version'
    ]),
    methods: {
      coreLoop () {
        let now = new Date().getTime()
        let elapsed = now - this.before
        this.delta += elapsed
        this.$store.dispatch('tick', elapsed / 1000.0)
        while (this.delta >= this.attackDuration) {
          this.$store.dispatch('attack')
          this.delta -= this.attackDuration
        }
        this.before = now
      }
    },
    mounted () {
      if (!this.loaded || this.version !== initState.version) {
        this.$store.commit('loadState', initState)
      }
      this.before = new Date().getTime()
      this.interval = 1000.0 / this.fps
      setInterval(this.coreLoop, this.interval)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
