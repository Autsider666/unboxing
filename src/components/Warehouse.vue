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
        <p>
            Warning: You lose the currently equipped item when replacing it on an active bot!<br><br>
        </p>
        <table class="table">
            <thead>
            <tr>
                <th v-for="key in columns"
                    @click="sortBy(key)"
                    :class="{ active: sortKey == key }">
                    {{ key | capitalize }}
                    <span class="fa" :class="sortOrders[key] > 0 ? 'fa-chevron-down' : 'fa-chevron-up'"></span>
                </th>
                <th>Prototype</th>
                <th>Active bot</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in filteredData">
                <td v-for="key in columns" v-bind:class="item.rarity" v-if="key !== 'stats'">
                    {{item[key]}}
                </td>
                <td v-if="item.type ==='Weapon'">{{item.minDmg}}-{{item.maxDmg}}</td>
                <td v-else>{{item.defense}} Defense</td>
                <td>
                    <a @click="equipPrototype(item)" title="Install item" v-if="prototype.str >= item.strReq && prototype.dex >= item.dexReq">
                        <i class="fa fa-long-arrow-right" aria-hidden="true" title="Install item"></i>
                    </a>
                    <i class="fa fa-long-arrow-right unequipable" title="Prototype doesn't have required stats" aria-hidden="true" v-else></i>
                    <span v-if="item.type === 'Weapon' && prototype.gear[item.type]"
                          v-bind:class="prototype.gear[item.type].rarity">
                        <!--<a @click="equipPrototype(item)"><i class="fa fa-exchange" aria-hidden="true"-->
                                                            <!--title="Swap item"></i></a>-->
                        {{prototype.gear[item.type].minDmg}} - {{prototype.gear[item.type].maxDmg}}
                    </span>
                    <span v-bind:class="prototype.gear[item.type].rarity" v-else-if="prototype.gear[item.type]">
                        <!--<a @click="equipPrototype(item)"><i class="fa fa-exchange" aria-hidden="true"-->
                                                            <!--title="Swap item"></i></a>-->
                        {{prototype.gear[item.type].defense}}
                    </span>
                    <!--<a v-else @click="equipPrototype(item)" title="Install item">-->
                        <!--<i class="fa fa-long-arrow-right" aria-hidden="true"></i>-->
                    <!--</a>-->
                </td>
                <td>
                    <a @click="equipBot(item)" title="Install item" v-if="!inCombat && bot && bot.str >= item.strReq && bot.dex >= item.dexReq">
                        <i class="fa fa-long-arrow-right" aria-hidden="true" title="Install item"></i>
                    </a>
                    <i class="fa fa-long-arrow-right unequipable" title="Bot doesn't have required stats" aria-hidden="true" v-else-if="bot && (bot.str < item.strReq || bot.dex < item.dexReq)"></i>
                    <i class="fa fa-long-arrow-right disabled" aria-hidden="true" v-else></i>
                    <span v-if="item.type === 'Weapon' && bot && bot.gear[item.type] && bot.damage < bot.maxHealth"
                          v-bind:class="bot.gear[item.type].rarity">
                        {{bot.gear[item.type].minDmg}} - {{bot.gear[item.type].maxDmg}}
                        </span>
                    <span v-bind:class="bot.gear[item.type].rarity"
                          v-else-if="bot && bot.gear[item.type] && bot.damage < bot.maxHealth">
                        {{bot.gear[item.type].defense}}
                    </span>
                </td>
                <td>
                    <div class="field has-addons">
                        <p class="control">
                            <button class="button is-danger" @click="remove(item)">Remove</button>
                        </p>
                    </div>
                </td>
            </tr>
            <tr v-if="filteredData.length === 0 && filterKey">
                <td colspan="4">Your warehouse doesn't contain any matching items</td>
            </tr>
            <tr v-else-if="filteredData.length === 0">
                <td colspan="4">Your warehouse is empty</td>
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
      let columns = ['name', 'type', 'rarity', 'strReq', 'dexReq', 'stats']
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
      inCombat () {
        return this.$store.state.inCombat
      },
      prototype () {
        return this.$store.state.prototype
      },
      bot () {
        return this.$store.state.bot
      },
      filteredData: function () {
        let sortKey = this.sortKey
        let filterKey = this.filterKey.toLowerCase()
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
            if (sortKey === 'stats') {
              if (a.type === 'Weapon') {
                a = (a.minDmg + a.maxDmg) / 2
              } else {
                a = a.defense
              }
              if (b.type === 'Weapon') {
                b = (b.minDmg + b.maxDmg) / 2
              } else {
                b = b.defense
              }
            } else {
              a = a[sortKey]
              b = b[sortKey]
            }
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
      remove (item) {
        this.$store.commit('remove', item)
      },
      equipBot (item) {
        this.$store.commit('equipBot', item)
      },
      equipPrototype (item) {
        this.$store.commit('equipPrototype', item)
      },
      sortBy: function (key) {
        this.sortKey = key
        this.sortOrders[key] = this.sortOrders[key] * -1
      }
    }
  }
</script>

<style scoped>
    .fa {
        color: orange;
    }

    .fa.disabled {
        color: rgb(128, 83, 38);
    }

    .fa.unequipable {
        color: darkred;
    }

    table {
        font-size: 13px !important;
    }

</style>
