<template>
    <nav class="panel">
        <p class="panel-heading">
            Storage
        </p>
        <router-link class="panel-block" v-bind:class="inventory.length >= inventorySize ? 'is-warning' : ''" to="/">
            Inventory: {{inventory.length}} / {{inventorySize}} &nbsp&nbsp&nbsp&nbsp
            <span v-if="inventory.length >= inventorySize">
                Inventory full!
            </span>
        </router-link>
        <router-link class="panel-block" v-bind:class="warehouse.length >= warehouseSize ? 'is-warning' : ''" to="warehouse">
            Warehouse: {{warehouse.length}} / {{warehouseSize}} &nbsp&nbsp&nbsp&nbsp
            <span v-if="warehouse.length >= warehouseSize">
                Warehouse full!
            </span>
        </router-link>
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
