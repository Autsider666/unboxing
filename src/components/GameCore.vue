<template>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'core',
    data () {
      return {
        interval: 0,
        before: 0,
        running: false
      }
    },
    computed: mapState([
      'progress',
      'fps',
      'location',
      'load'
    ]),
    methods: {
      coreLoop () {
        let now = new Date().getTime()
        let elapsed = now - this.before
        if (elapsed > Math.ceil(this.interval)) {
          this.idle(elapsed / this.interval)
        } else {
          this.idle(1)
        }
        this.before = now
      },
      idle (time) {
        this.$store.commit('grindIdle', time / this.fps)
        if (Math.ceil(this.progress) >= this.location.gearscore) {
          this.$store.commit('goalReached')
        }
      }
    },
    mounted () {
      this.$store.commit('loadGenerator')
      if (!this.load) {
        this.before = new Date().getTime()
      }
      this.interval = 1000.0 / this.fps
      setInterval(this.coreLoop, this.interval)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
