<template>
    <div>
        <div class="modal is-active" v-for="crate in inventory" v-if="crate.type === 'Crate' && crate.open">
            <div class="modal-background"></div>
            <div class="modal-content">
                <nav class="panel">
                    <!--<p class="panel-heading">-->
                        <!--Pick an Item-->
                    <!--</p>-->
                    <!--<div class="panel-block">-->
                    <!--<p class="control has-icons-left">-->
                    <!--<input class="input is-small" type="text" placeholder="Search">-->
                    <!--</p>-->
                    <!--</div>-->
                    <!--<p class="panel-tabs">-->
                    <!--<a v-bind:class="filter == null ? 'is-active' : ''" @click="filter = null">All</a>-->
                    <!--<a v-bind:class="filter == 'Poor' ? 'is-active' : ''" @click="filter = 'Poor'">Poor</a>-->
                    <!--<a v-bind:class="filter == 'Normal' ? 'is-active' : ''" @click="filter = 'Normal'">Normal</a>-->
                    <!--<a v-bind:class="filter == 'Good' ? 'is-active' : ''" @click="filter = 'Good'">Good</a>-->
                    <!--<a v-bind:class="filter == 'Great' ? 'is-active' : ''" @click="filter = 'Great'">Great</a>-->
                    <!--<a v-bind:class="filter == 'Amazing' ? 'is-active' : ''" @click="filter = 'Amazing'">Amazing</a>-->
                    <!--</p>-->
                    <div v-for="item in crate.items" @click="chooseItem({crate, item})">
                        <p class="panel-heading" v-bind:class="item.rarity">
                            <a>
                                {{item.name}}
                                <small>({{item.type}})</small>
                            </a>
                        </p>
                        <a class="panel-block has-text-centered">
                            <table>
                                <tr>
                                    <td class="has-text-centered">
                                        <strong v-if="item.type === 'Weapon'">Attack: </strong>
                                        <strong v-else>Defense: </strong>
                                        <span v-if="item.type === 'Weapon'" v-bind:class="item.rarity">
                                            {{item.minDmg}} - {{item.maxDmg}}
                                            <span v-if="bot.gear[item.type]" v-bind:class="bot.gear[item.type].rarity">({{bot.gear[item.type].minDmg}} - {{bot.gear[item.type].maxDmg}})</span>
                                        </span>
                                        <span v-bind:class="item.rarity" v-else>
                                            {{item.defense}}
                                            <span v-if="bot.gear[item.type]" v-bind:class="bot.gear[item.type].rarity">({{bot.gear[item.type].defense}})</span>
                                        </span>

                                    </td>
                                </tr>
                            </table>
                        </a>
                    </div>
                    <div class="panel-block">
                        <button class="button is-warning is-outlined is-fullwidth" @click="remove(crate)">
                            Throw it all away
                        </button>
                    </div>
                </nav>
            </div>
            <button class="modal-close is-large" @click="close(crate)"></button>
        </div>
    </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'Unbox',
    data () {
      return {
//        filter: null
      }
    },
    methods: mapMutations({
      chooseItem: 'chooseItem',
      close: 'close',
      remove: 'remove'
    }),
    computed: mapState({
      inventory: 'inventory',
      warehouse: 'warehouse',
      gear: 'gear',
      bot: 'bot'
    })
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
