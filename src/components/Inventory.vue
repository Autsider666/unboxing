<template>
    <div class="event-timeline">
        <h1 class="title">
            Inventory
        </h1>
        <unbox-tab></unbox-tab>
        <div class="notification is-warning" v-if="inventory.length >= inventorySize">
            Warning! Inventory full
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
            <tr v-for="item in inventory" v-if="!item.equipped">
                <td v-bind:class="item.rarity">{{item.name}}</td>
                <td>{{item.rarity}} {{item.subtype}} {{item.type}}</td>
                <td>{{item.gearscore}}</td>
                <!--<td></td>-->
                <!--<td></td>-->
                <!--<td></td>-->
                <!--<td></td>-->
                <td v-if="item.type == 'Crate'">
                    <div class="field has-addons">
                        <p class="control">
                            <button class="button is-success" @click="open(item)">Open</button>
                        </p>
                        <p class="control">
                            <button class="button is-danger" @click="remove(item)">Remove</button>
                        </p>
                        <p class="control">
                            <button class="button is-primary" @click="send({item, target: 'warehouse'})"
                                    v-bind:disabled="warehouse.size >= warehouseSize">Send to warehouse
                            </button>
                        </p>
                    </div>
                    <button class="button is-success" @click="open(item)">Open</button>
                    <button class="button is-danger" @click="remove(item)">Remove</button>
                    <button class="button is-primary" @click="send({item, target: 'warehouse'})"
                            v-bind:disabled="warehouse.size >= warehouseSize">Send to warehouse
                    </button>
                </td>
                <td v-else>
                    <button class="button is-success is-outlined" @click="equip(item)">Equip</button>
                    <button class="button is-danger is-outlined" @click="remove(item)">Remove</button>
                    <button class="button is-primary is-outlined" @click="send({item, target: 'warehouse'})"
                            v-bind:disabled="warehouse.size >= warehouseSize">Send to warehouse
                    </button>
                </td>
            </tr>
            <tr v-if="inventory.length === 0">
                <td colspan="4">Start grinding to get more items</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'Inventory',
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
      'inventory',
      'inventorySize',
      'warehouse',
      'warehouseSize'
    ])
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
