<template>
    <div id="app">
        <link rel="stylesheet" href="./static/css/font-awesome.min.css">
        <notification/>
        <game-core/>
        <div class="section">
            <div class="columns">
                <aside class="column is-2-widescreen is-3-desktop is-4-tablet">
                    <nav class="menu">
                        <stats-tab></stats-tab>
                        <training-tab></training-tab>
                    </nav>
                </aside>
                <main class="column">
                    <management-tab></management-tab>
                    <router-view></router-view>
                </main>
                <aside class="column is-2-widescreen is-3-desktop is-4-tablet">
                    <nav class="menu">
                        <bot-tab :bot="$store.state.bot" type="player"></bot-tab>
                        <bot-tab :bot="$store.state.enemy" type="enemy"></bot-tab>
                    </nav>
                </aside>
            </div>
        </div>

        <!--<div class="columns">-->
        <!--<aside class="column is-3">-->
        <!--<stats-tab></stats-tab>-->
        <!--<bot-tab :bot="$store.state.bot"></bot-tab>-->
        <!--<bot-tab :bot="$store.state.enemy"></bot-tab>-->
        <!--<training-tab></training-tab>-->
        <!--</aside>-->
        <!--<div class="column is-6">-->
        <!--<management-tab></management-tab>-->
        <!--<router-view></router-view>-->
        <!--</div>-->
        <!--<div class="column is-3">-->
        <!--<stats-tab></stats-tab>-->
        <!--<bot-tab :bot="$store.state.bot"></bot-tab>-->
        <!--<bot-tab :bot="$store.state.enemy"></bot-tab>-->
        <!--<training-tab></training-tab>-->
        <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
    .label {
        color: #dbdbdb !important;
    }

    html, body {
        height: 100%;
    }

    .tabs a:hover {
        color: #4a4a4a !important;
    }

    .tabs a {
        color: #dbdbdb !important;
    }

    .tabs .is-active a {
        color: #4a4a4a !important;
    }

    @media screen and (min-width: 1384px) {
        .container {
            /*max-width: 1344px;*/
            max-width: 95% !important;
            width: 100% !important;
        }
    }

    .hero {
        background-color: inherit !important;
    }

    .modal .panel-heading a {
        color: inherit !important;
    }

    .panel-heading a:hover {
        color: inherit !important;
    }

    tr {
        background-color: inherit !important;
    }

    .highlight {
        color: yellow;
    }

    .nav, .section, html, table, .modal-card-body, .panel-block th {
        background-color: #201F1D !important;
        color: #dbdbdb !important;
    }

    /*.panel-block {*/
    /*text-align: center !important;*/
    /*}*/

    table {
        background-color: inherit !important;
    }

    .panel-block th {
        background-color: inherit !important;
    }

    .panel-block a:hover {
        color: inherit !important;
    }

    .title, .panel-block, .panel-heading, .panel-tabs {
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
        /*margin-top: 60px;*/
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
