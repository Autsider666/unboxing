<template>
    <div class="event-timeline">
        <!--<div class="notification is-warning" v-if="warehouse.length >= warehouseSize">-->
        <!--Warning! Warehouse full-->
        <!--</div>-->
        <table class="table is-striped">
            <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Stats</th>
                <th>Prototype</th>
                <th>Current bot</th>
                <!--<th>Wits</th>-->
                <!--<th>Spirit</th>-->
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in warehouse" v-if="!item.equipped">
                <td v-bind:class="item.rarity">{{item.name}}</td>
                <!--<td>{{item.rarity}} {{item.subtype}} {{item.type}}</td>-->
                <td>{{item.type}}</td>

                <td v-if="item.type ==='Weapon'">{{item.minDmg}}-{{item.maxDmg}} Dmg</td>
                <td v-else>{{item.defense}} Defense</td>
                <td>
                    <span v-if="item.type === 'Weapon' && prototype.gear[item.type]"
                          v-bind:class="prototype.gear[item.type].rarity">
                        <a @click="equipPrototype(item)"><i class="fa fa-exchange" aria-hidden="true"></i></a>
                        {{prototype.gear[item.type].minDmg}} - {{prototype.gear[item.type].maxDmg}}
                    </span>
                    <span v-bind:class="prototype.gear[item.type].rarity" v-else-if="prototype.gear[item.type]">
                        <a @click="equipPrototype(item)"><i class="fa fa-exchange" aria-hidden="true"></i></a>
                        {{prototype.gear[item.type].defense}}
                    </span>
                    <a v-else @click="equipPrototype(item)"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                </td>
                <td v-if="!inCombat" >
                    <span v-if="item.type === 'Weapon' && bot && bot.gear[item.type] && bot.damage < bot.maxHealth"
                          v-bind:class="bot.gear[item.type].rarity">
                        <a @click="equipBot(item)">
                            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                        </a>
                        {{bot.gear[item.type].minDmg}} - {{bot.gear[item.type].maxDmg}}
                    </span>
                    <span v-bind:class="bot.gear[item.type].rarity"
                          v-else-if="bot && bot.gear[item.type] && bot.damage < bot.maxHealth">
                        <a @click="equipBot(item)">
                            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                        </a>
                        {{bot.gear[item.type].defense}}
                    </span>
                    <a v-else @click="equipBot(item)">
                        <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </a>
                </td>
                <td v-else></td>
                <!--<td></td>-->
                <!--<td></td>-->
                <td>
                    <!--<button class="button" @click="equip(item)">Equip</button>-->
                    <button class="button" @click="remove(item)">Remove</button>
                    <!--<button class="button" @click="send({item, targehammerspacetory'})" v-bind:disablhammerspacetory.lengthhammerspaceSizeSize">Sendhammerspacetory</button>-->
                </td>
            </tr>
            <tr v-if="warehouse.length === 0">
                <td colspan="6">Warehouse is empty</td>
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
      'equipBot',
      'equipPrototype',
      'send'
    ]),
    computed: mapState([
      'warehouse',
      'warehouseSize',
      'hammerspace',
      'hammerspaceSize',
      'bot',
      'prototype',
      'inCombat'
    ])
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .fa {
        color: orange;
    }
</style>
