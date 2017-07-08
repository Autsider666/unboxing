<template>
    <div class="event-timeline">
        <unbox-tab></unbox-tab>
        <!--<div class="notification is-warning" v-if="warehouse.length >= warehouseSize">-->
            <!--Warning! Warehouse full-->
        <!--</div>-->
        <table class="table is-striped">
            <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Stats</th>
                <!--<th>Fight</th>-->
                <!--<th>Body</th>-->
                <!--<th>Wits</th>-->
                <!--<th>Spirit</th>-->
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in warehouse" v-if="!item.equipped">
                <td v-bind:class="item.rarity">{{item.name}}</td>
                <td>{{item.rarity}} {{item.subtype}} {{item.type}}</td>

                <td v-if="item.type ==='Weapon'">{{item.minDmg}}-{{item.minDmg}} Dmg</td>
                <td v-else>{{item.defense}} Defense</td>
                <!--<td></td>-->
                <!--<td></td>-->
                <!--<td></td>-->
                <!--<td></td>-->
                <td v-if="item.type == 'Crate'">
                    <button class="button" @click="open(item)">Open</button>
                    <button class="button" @click="remove(item)">Remove</button>
                    <!--<button class="button" @click="send({item, targehammerspacetory'})" v-bind:disablhammerspacetory.lengthhammerspaceSizeSize">Sendhammerspacetory</button>-->
                </td>
                <td v-else>
                    <button class="button" @click="equip(item)">Equip</button>
                    <button class="button" @click="remove(item)">Remove</button>
                    <!--<button class="button" @click="send({item, targehammerspacetory'})" v-bind:disablhammerspacetory.lengthhammerspaceSizeSize">Sendhammerspacetory</button>-->
                </td>
            </tr>
            <tr v-if="warehouse.length === 0">
                <td colspan="4">Warehouse is empty</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'Warehouse',
    data () {
      return {}
    },
    methods: mapMutations([
      'open',
      'close',
      'remove',
      'equip',
      'send'
    ]),
    computed: mapState([
      'warehouse',
      'warehouseSize',
      'hammerspace',
      'hammerspaceSize'
    ])
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
