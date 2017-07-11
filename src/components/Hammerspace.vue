<template>
    <div>
        <div class="field is-grouped">
            <p class="control is-expanded">
                <input v-model="filterKey" class="input" type="text" placeholder="Filter/search here">
            </p>
            <p class="control">
                <a class="button is-danger" @click="removeFiltered">
                    Remove all remaining items
                </a>
            </p>
        </div>
        <table class="table">
            <thead>
            <tr>
                <th v-for="key in columns"
                    @click="sortBy(key)"
                    :class="{ active: sortKey == key }">
                    {{ key | capitalize }}
                    <span class="fa" :class="sortOrders[key] > 0 ? 'fa-chevron-down' : 'fa-chevron-up'">
          </span>
                </th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in filteredData">
                <td v-for="key in columns" v-bind:class="item.rarity">
                    {{item[key]}}
                </td>
                <td>
                    <div class="field has-addons">
                        <p class="control">
                            <button class="button is-success" @click="open(item)">Open</button>
                        </p>
                        <p class="control">
                            <button class="button is-danger" @click="remove(item)">Remove</button>
                        </p>
                        <!--<p class="control">-->
                        <!--<button class="button is-primary" @click="send({item, target: 'warehouse'})"-->
                        <!--v-bind:disabled="warehouse.size >= warehouseSize">Send to warehouse-->
                        <!--</button>-->
                        <!--</p>-->
                    </div>
                </td>
            </tr>
            <tr v-if="filteredData.length === 0">
                <td colspan="4">Hammerspace is empty</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
  export default {
    props: {
      data: Array
    },
    data () {
      let sortOrders = {}
      let columns = ['name', 'type', 'rarity', 'gearscore']
      columns.forEach(function (key) {
        sortOrders[key] = 1
      })
      return {
        sortKey: '',
        sortOrders: sortOrders,
        columns: columns,
        filterKey: ''
      }
    },
    computed: {
      filteredData: function () {
        let sortKey = this.sortKey
        let filterKey = this.filterKey && this.filterKey.toLowerCase()
        let order = this.sortOrders[sortKey] || 1
        let data = this.data
        if (filterKey) {
          data = data.filter(function (row) {
            let match = filterKey.split(' ')
            Object.keys(row).forEach(function (key) {
              for (let i in match) {
                let filter = match[i]
                if (String(row[key]).toLowerCase().indexOf(filter) > -1) {
                  match.splice(i, 1)
                }
              }
            })
            return match.length === 0
          })
        }
        if (sortKey) {
          data = data.slice().sort(function (a, b) {
            a = a[sortKey]
            b = b[sortKey]
            return (a === b ? 0 : a > b ? 1 : -1) * order
          })
        }
        return data
      }
    },
    filters: {
      capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }
    },
    methods: {
      removeFiltered () {
        let vm = this
        this.filteredData.forEach(function (item) {
          vm.remove(item)
        })
        vm.filterKey = ''
      },
      open (item) {
        this.$store.commit('open', item)
      },
      remove (item) {
        this.$store.commit('remove', item)
      },
      sortBy: function (key) {
        this.sortKey = key
        this.sortOrders[key] = this.sortOrders[key] * -1
      }
    }
  }
</script>

<style scoped>

</style>
