<template>
    <div class="event-timeline">
        <h1 class="title">
            Warehouse
        </h1>
        <unbox-tab></unbox-tab>
        <div class="notification is-warning" v-if="warehouse.length >= warehouseSize">
            Warning! Warehouse full
        </div>
        <table class="table is-striped">
            <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Gear Score</th>
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
                <td>{{item.gearscore}}</td>
                <!--<td></td>-->
                <!--<td></td>-->
                <!--<td></td>-->
                <!--<td></td>-->
                <td v-if="item.type == 'Crate'">
                    <button class="button" @click="open(item)">Open</button>
                    <button class="button" @click="remove(item)">Remove</button>
                    <button class="button" @click="send({item, target: 'inventory'})" v-bind:disabled="inventory.size >= inventorySize">Send to inventory</button>
                </td>
                <td v-else>
                    <button class="button" @click="equip(item)">Equip</button>
                    <button class="button" @click="remove(item)">Remove</button>
                    <button class="button" @click="send({item, target: 'inventory'})" v-bind:disabled="true">Send to inventory</button>
                </td>
            </tr>
            <tr v-if="warehouse.length === 0">
                <td colspan="4">Start grinding to get more items</td>
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
      'inventory',
      'inventorySize'
    ])
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
