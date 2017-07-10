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
            <a v-for="e in enemies" v-bind:class="enemy && e.name === enemy.name ? 'is-active' : ''" class="panel-block"
               @click="queueEnemy(e)" v-if="e.minLvl <= workshop.lvl">
                <table>
                    <tr>
                        <!--"e.name === next.name && e.name !== enemy.name"-->
                        <th v-if="enemy && e.name === enemy.name || next && e.name === next.name"
                            v-bind:class="enemy && next && e.name !== enemy.name && e.name === next.name ? 'has-text-right' : ''">
                            {{e.name}}
                        </th>
                        <th v-else>
                            <a>{{e.name}}</a>
                        </th>
                        <td class="has-text-right"> Lvl {{ e.lvl}}</td>
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
      'enemies',
      'workshop'
    ])
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
