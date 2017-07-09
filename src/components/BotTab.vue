<template>
    <nav class="panel">
        <div v-if="bot">
            <p class="panel-heading">
                {{bot.name}} <br/>
                <span v-if="bot.lvl !== undefined">(Lvl {{bot.lvl}})</span>
            </p>
            <p class="panel-block" href="#">
            <table>
                <tr>
                    <th>Status: </th>
                    <td class="has-text-right">{{getStatus}}</td>
                </tr>
            </table>
            </p>
            <p class="panel-block" href="#">
                <progress v-bind:value="health" v-bind:max="maxHealth"
                          class="progress is-small" v-bind:class="progressColor"></progress>
            </p>
            <p class="panel-block" href="#">
            <table>
                <tr>
                    <th>Health: </th>
                    <td class="has-text-right">{{Math.ceil(health)}} / {{maxHealth}}</td>
                </tr>
            </table>
            </p>
            <p class="panel-block" href="#">
            <table>
                <tr>
                    <th>Last Attack: </th>
                    <td class="has-text-right">{{bot.lastAttack}}</td>
                </tr>
            </table>
            </p>
            <p class="panel-block">
            <table>
                <tr>
                    <th>Constitution: </th>
                    <td>{{bot.con}}</td>
                </tr>
                <tr>
                    <th>Strength: </th>
                    <td>{{bot.str}}</td>
                </tr>
                <tr>
                    <th>Dexterity: </th>
                    <td>{{bot.dex}}</td>
                </tr>
                <tr>
                    <th>Intelligence: </th>
                    <td>{{bot.int}}</td>
                </tr>
            </table>
            </p>
        </div>
        <div v-else-if="type === 'player'">
            <p class="panel-heading">
                Please construct a bot in <span class="highlight">your workshop</span> to fight
            </p>
        </div>
        <div v-else-if="type === 'enemy'">
            <p class="panel-heading">
                Please select an enemy to fight from the list of <span class="highlight">training bots</span>
            </p>
        </div>


        <!--<a class="panel-block" v-for="(value, key) in bot.gear">-->
        <!--{{ key }} : {{ value }}-->
        <!--</a>-->
    </nav>
</template>

<script>
  import Mechanics from '../assets/mechanics'

  export default {
    name: 'Bot',
    props: {
      type: {
        required: true
      },
      bot: {
        required: true
      }
    },
    data () {
      return {
        mechanics: Mechanics
      }
    },
    computed: {
      health () {
        return this.maxHealth - this.bot.damage
      },
      getStatus () {
        if (this.bot.damage === this.maxHealth) {
          return 'Disabled'
        } else if (this.inCombat) {
          return 'Fighting'
        } else if (this.$store.state.enableIdleHealing && this.bot.damage > 0 && this.bot.isPlayer && this.$store.state.enableIdleCombat) {
          return 'Repairing'
        } else if (!this.bot.isPlayer) {
          return 'Awaiting Opponent'
        } else {
          return 'Idle'
        }
      },
      inCombat () {
        return this.$store.state.inCombat
      },
      maxHealth () {
        return Mechanics.getMaxHealth(this.bot)
      },
      progressColor () {
        if (this.bot.isPlayer && this.$store.state.enableIdleHealing && this.bot.damage > 0 && !this.inCombat) {
          return 'is-primary'
        }
        let amount = this.health / this.maxHealth
        if (amount >= 0.75) {
          return 'is-success'
        } else if (amount >= 0.25) {
          return 'is-warning'
        } else {
          return 'is-danger'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
