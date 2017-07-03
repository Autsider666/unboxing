<template>
    <div>
        <nav class="panel">
            <p class="panel-heading">
                Locations
            </p>
            <p class="panel-tabs">
                <a href="#">Easy</a>
                <a class="is-active" href="#">Profitable</a>
                <a href="#">Hard</a>
                <a href="#">Impossible</a>
            </p>
            <a v-for="loc in locations" v-bind:class="loc.name === location.name ? 'is-active' : ''" class="panel-block"
               @click="goToLocation(loc)">
                {{loc.name}} - ({{ loc.gearscore}} GS)
            </a>
        </nav>
    </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'

  export default {
    name: 'LocationsTab',
    data () {
      return {}
    },
    methods: mapMutations([
      'goToLocation'
    ]),
    computed: mapState([
      'location',
      'locations'
    ])
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
