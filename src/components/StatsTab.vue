<template>
    <nav class="panel">
        <p class="panel-heading">
            <router-link to="workshop">
                Your Workshop
            </router-link>
        </p>
        <p class="panel-block">
        <table>
            <tr>
                <th>Scrap: </th>
                <td class="has-text-right">{{scrap}}</td>
            </tr>
        </table>
        </p>
        <router-link class="panel-block" v-bind:class="inventory.length >= inventorySize ? 'is-warning' : ''" to="inventory">
            <table>
                <tr>
                    <th><a>Inventory: </a></th>
                    <td class="has-text-right">{{inventory.length}} / {{inventorySize}}</td>
                </tr>
            </table>
        </router-link>
        <router-link class="panel-block" v-bind:class="warehouse.length >= warehouseSize ? 'is-warning' : ''"
                     to="warehouse">
            <table>
                <tr>
                    <th><a>Warehouse: </a></th>
                    <td class="has-text-right">{{warehouse.length}} / {{warehouseSize}}</td>
                </tr>
            </table>
        </router-link>
    </nav>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Stats',
    data () {
      return {}
    },
    computed: mapState([
      'inventory',
      'inventorySize',
      'warehouse',
      'warehouseSize',
      'scrap'
    ])
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

