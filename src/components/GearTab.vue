<template>
    <nav class="panel">
        <p class="panel-heading">
            Gear ({{gearscore}} GS)
        </p>
        <a class="panel-block" v-for="item in gear" v-bind:class="item.rarity">
            {{item.type}}: {{item.name}} ({{ item.gearscore}} GS)
        </a>
    </nav>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'GearTab',
    data () {
      return {}
    },
    computed: mapState([
      'gear',
      'gearscore'
    ])
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
