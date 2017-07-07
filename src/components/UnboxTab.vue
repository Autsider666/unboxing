<template>
    <div>
        <div class="modal is-active" v-for="crate in inventory" v-if="crate.type === 'Crate' && crate.open">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Pick an item</p>
                    <button class="delete" @click="close(crate)"></button>
                </header>
                <section class="modal-card-body">
                    <tr>
                        <td v-for="item in crate.items">
                            <div class="content has-text-centered">
                                <p class="card-header-title" v-bind:class="item.rarity">
                                    {{item.name}}
                                </p>
                                <strong>Type: </strong>
                                {{item.type}}<br/>
                                <strong>Rarity: </strong>
                                {{item.rarity}}<br/><br/>
                                <strong>Gearscore: </strong>
                                <span v-bind:class="item.rarity">{{item.gearscore}}</span><br/><br/>
                                <!--<span v-bind:class="item.rarity">{{item.gearscore}}</span> <span v-if="gear[item.type]" v-bind:class="gear[item.type].rarity">({{gear[item.type].gearscore}})</span><br/><br/>-->
                                <button class="button" @click="chooseItem({crate, item})">Pick</button>
                            </div>
                        </td>
                    </tr>
                </section>
                <footer class="modal-card-foot has-text-centered">
                    <a class="button" @click="remove(crate)">Throw it all away</a>
                </footer>
            </div>
        </div>
        <div class="modal is-active" v-for="crate in warehouse" v-if="crate.type === 'Crate' && crate.open">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Pick an item</p>
                    <button class="delete" @click="close(crate)"></button>
                </header>
                <section class="modal-card-body">
                    <tr>
                        <td v-for="item in crate.items">
                            <div class="content has-text-centered">
                                <p class="card-header-title" v-bind:class="item.rarity">
                                    {{item.name}}
                                </p>
                                <strong>Type: </strong>
                                {{item.type}}<br/>
                                <strong>Rarity: </strong>
                                {{item.rarity}}<br/><br/>
                                <strong>Gearscore: </strong>
                                <span v-bind:class="item.rarity">{{item.gearscore}}</span> <span v-if="gear[item.type]" v-bind:class="gear[item.type].rarity">({{gear[item.type].gearscore}})</span><br/><br/>
                                <button class="button" @click="chooseItem({crate, item})">Pick</button>
                            </div>
                        </td>
                    </tr>
                </section>
                <footer class="modal-card-foot has-text-centered">
                    <a class="button" @click="remove(crate)">Throw it all away</a>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'Unbox',
    data () {
      return {}
    },
    methods: mapMutations([
      'chooseItem',
      'close',
      'remove'
    ]),
    computed: mapState([
      'inventory',
      'warehouse',
      'gear'
    ])
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
