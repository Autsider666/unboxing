<template>
    <div>
        <div class="has-text-centered">
            <h1 class="title">
                Workshop
            </h1>
        </div>
        <br>
        <div class="tabs is-centered is-boxed">
            <ul>
                <li v-bind:class="tab == 'current' ? 'is-active' : ''">
                    <router-link to="/workshop/current">
                        <span>Current bot</span>
                    </router-link>
                </li>
                <li v-bind:class="tab == 'prototype' ? 'is-active' : ''">
                    <router-link to="/workshop/prototype">
                        <span>Prototype</span>
                    </router-link>
                </li>
                <li v-bind:class="tab == 'hammerspace' ? 'is-active' : ''">
                    <router-link to="/workshop/hammerspace">
                        <span>Hammerspace</span>
                    </router-link>
                </li>
                <li v-bind:class="tab == 'warehouse' ? 'is-active' : ''">
                    <router-link to="/workshop/warehouse">
                        <span>Warehouse</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <warehouse v-if="tab === 'warehouse'"></warehouse>
        <hammerspace v-if="tab === 'hammerspace'"></hammerspace>
        <prototype v-if="tab === 'prototype'"></prototype>
        <current-bot v-if="tab === 'current'"></current-bot>
    </div>
</template>

<script>
  import Prototype from './Prototype'
  export default {
    components: {Prototype},
    props: {
      tab: {
      }
    },
    data () {
      return {}
    }
  }
</script>

<style scoped>

</style>
