<template>
    <nav class="panel">
        <p class="panel-heading">
            Grinding
        </p>
        <p class="panel-block" href="#">
            Location:  {{location.name}}
        </p>
        <p class="panel-block" href="#">
            <progress v-bind:value="progress" v-bind:max="location.gearscore"
                      class="progress is-danger is-small"></progress>
        </p>
        <p class="panel-block" href="#">
            Progress:  {{Math.floor(progress)}}/{{location.gearscore}}
        </p>
    </nav>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'StatsTab',
    data () {
      return {}
    },
    computed: mapState([
      'progress',
      'location'
    ])
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
