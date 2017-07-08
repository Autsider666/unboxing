<template>
    <nav class="panel">
        <p class="panel-heading">
            <router-link to="/workshop">
                Your Workshop
            </router-link>
        </p>
        <p class="panel-block">
        <table>
            <tr>
                <th>Level: </th>
                <td class="has-text-right">{{workshop.lvl}}</td>
            </tr>
        </table>
        </p>
        <p class="panel-block">
            <progress v-bind:value="workshop.exp" v-bind:max="workshop.expToNext"
                      class="progress is-small is-success"></progress>
        </p>
        <p class="panel-block">
        <table>
            <tr>
                <th>Experience: </th>
                <td class="has-text-right">{{workshop.exp}}/{{workshop.expToNext}}</td>
            </tr>
        </table>
        </p>
        <router-link class="panel-block" v-bind:class="hammerspace.length >= hammerspaceSize ? 'is-warning' : ''"
                     to="/workshop/hammerspace">
            <table>
                <tr>
                    <th><a>Hammerspace: </a></th>
                    <td class="has-text-right">{{hammerspace.length}} / {{hammerspaceSize}}</td>
                </tr>
            </table>
        </router-link>
        <router-link class="panel-block" v-bind:class="warehouse.length >= warehouseSize ? 'is-warning' : ''"
                     to="/workshop/warehouse">
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
      'hammerspace',
      'hammerspaceSize',
      'warehouse',
      'warehouseSize',
      'scrap',
      'workshop'
    ])
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

