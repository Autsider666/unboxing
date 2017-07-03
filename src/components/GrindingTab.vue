<template>
    <div>
        <button class="button is-light is-large" :disabled="!isGrindable" @click="grind">
            <span>Grind</span>
        </button>
        <br><br>
    </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'Grinding',
    data () {
      return {}
    },
    methods: mapMutations([
      'grind'
    ]),
    computed: mapState([
      'isGrindable'
    ])
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
