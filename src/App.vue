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
    html, table, .modal-card-body {
        background-color: #201F1D !important;
        color: #dbdbdb !important;
    }

    .title, .panel-block, .panel-heading {
        color: aliceblue !important;
        background-color: #201F1D !important;
    }

    .panel-block.is-active {
        border-left-color: orange !important;
    }

    .panel-tabs a {
        color: rgb(128, 83, 38) !important;
    }

    .panel-tabs a.is-active {
        border-bottom-color: rgb(222, 141, 71) !important;
        color: rgb(222, 141, 71) !important;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        /*color: #2c3e50;*/
        margin-top: 60px;
    }

    table tr:hover {
        background-color: inherit !important;
        color: inherit !important;
    }

    .table.is-striped tbody tr:not(.is-selected):nth-child(even) {
        background-color: inherit !important;
    }

    .notification.is-warning, .panel-block.is-warning {
        background-color: rgb(222, 141, 71) !important;
    }

    .Poor {
        color: grey !important;
    }

    .Normal {
        color: white !important;
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
