<template>
    <div>
        <nav class="panel">
            <p class="panel-heading">
                Training bots
            </p>
            <!--<p class="panel-tabs">-->
            <!--<a href="#">Easy</a>-->
            <!--<a class="is-active" href="#">Profitable</a>-->
            <!--<a href="#">Hard</a>-->
            <!--<a href="#">Impossible</a>-->
            <!--</p>-->
            <a v-for="e in enemies" v-bind:class="e.name === enemy.name ? 'is-active' : ''" class="panel-block"
               @click="queueEnemy(e)">
                <table>
                    <tr>
                        <th v-bind:class="e.name === next.name && e.name !== enemy.name ? 'has-text-right' : ''">
                            {{e.name}}
                        </th>
                        <td class="has-text-right">{{mechanics.getGearscore(e)}} GS</td>
                    </tr>
                </table>
            </a>
        </nav>
    </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import Mechanics from '../assets/mechanics'

  export default {
    name: 'Training',
    data () {
      return {
        mechanics: Mechanics
      }
    },
    methods: mapMutations([
      'queueEnemy'
    ]),
    computed: mapState([
      'enemy',
      'next',
      'enemies'
    ])
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
