<template>
    <div id="app" class="container">
        <notification/>
        <game-core/>
        <!--<div class="columns">-->
        <!--<div class="column is-8">-->
        <!--<grinding-tab></grinding-tab>-->
        <!--</div>-->
        <!--<div class="column is-4">-->
        <!--<stats-tab></stats-tab>-->
        <!--</div>-->
        <!--</div>-->
        <div class="columns">
            <div class="column is-8">
                <grinding-tab></grinding-tab>
                <router-view></router-view>
            </div>
            <div class="column is-4">
                <stats-tab></stats-tab>
                <storage-tab></storage-tab>
                <gear-tab></gear-tab>
                <locations-tab></locations-tab>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
    html, table {
        background-color: #201F1D;
    }

    .title, .panel-block, .panel-heading {
        color: aliceblue !important;
        background-color: #201F1D;
    }

    .panel-block.is-active {
        border-left-color: orange;
        /*color: #363636;*/
    }

    .panel-tabs a {
        /*border-bottom: 1px solid #dbdbdb;*/
        /*margin-bottom: -1px;*/
        /*padding: 0.5em;*/
        color: rgb(128, 83, 38);
    }

    .panel-tabs a.is-active {
        border-bottom-color: rgb(222, 141, 71);
        color: rgb(222, 141, 71);
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .Poor {
        color: grey !important;
    }

    .Normal {

    }

    .Good {
        color: lawngreen !important;
    }

    .Great {
        color: purple !important;
    }

    .Amazing {
        color: orange !important;
        text-shadow: coral 1px 0px 10px !important;
    }
</style>
