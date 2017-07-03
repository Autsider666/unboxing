<template>
    <nav class="panel">
        <p class="panel-heading">
            Storage
        </p>
        <router-link class="panel-block" to="/">
            Inventory: {{inventory.length}} / {{inventorySize}}
        </router-link>
        <router-link class="panel-block" to="warehouse">
            Warehouse: {{warehouse.length}} / {{warehouseSize}}
        </router-link>
        <!--<a class="panel-block" href="/">-->
            <!--Inventory: {{inventory.length}} / {{inventorySize}}-->
        <!--</a>-->
        <!--<a class="panel-block" href="/warehouse">-->
            <!--Warehouse: {{warehouse.length}} / {{warehouseSize}}-->
        <!--</a>-->
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
