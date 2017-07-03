<template>
    <div>
        <notifications position="bottom right" >
            <template slot="body" scope="props">
                <article class="message">
                    <div class="message-header">
                        <p>{{props.item.title}}</p>
                        <button class="delete" @click="props.close"></button>
                    </div>
                    <div class="message-body" v-html="props.item.text"></div>
                </article>
                <!--<div>-->
                <!--<a class="title">-->
                <!--{{props.item.title}}-->
                <!--</a>-->
                <!--<a class="close" @click="props.close">-->
                <!--<i class="fa fa-fw fa-close"></i>-->
                <!--</a>-->
                <!--<div v-html="props.item.text">-->
                <!--</div>-->
                <!--</div>-->
            </template>
        </notifications>

        <notifications position="bottom right" group="warning">
            <template slot="body" scope="props">
                <article class="message is-warning">
                    <div class="message-header">
                        <p>{{props.item.title}}</p>
                        <button class="delete" @click="props.close"></button>
                    </div>
                    <div class="message-body" v-html="props.item.text"></div>
                </article>
                <!--<div>-->
                <!--<a class="title">-->
                <!--{{props.item.title}}-->
                <!--</a>-->
                <!--<a class="close" @click="props.close">-->
                <!--<i class="fa fa-fw fa-close"></i>-->
                <!--</a>-->
                <!--<div v-html="props.item.text">-->
                <!--</div>-->
                <!--</div>-->
            </template>
        </notifications>

        <notifications position="bottom right" group="error">
            <template slot="body" scope="props">
                <article class="message is-danger">
                    <div class="message-header">
                        <p>{{props.item.title}}</p>
                        <button class="delete" @click="props.close"></button>
                    </div>
                    <div class="message-body" v-html="props.item.text"></div>
                </article>
                <!--<div>-->
                <!--<a class="title">-->
                <!--{{props.item.title}}-->
                <!--</a>-->
                <!--<a class="close" @click="props.close">-->
                <!--<i class="fa fa-fw fa-close"></i>-->
                <!--</a>-->
                <!--<div v-html="props.item.text">-->
                <!--</div>-->
                <!--</div>-->
            </template>
        </notifications>
    </div>
</template>

<script>
  export default {
    name: 'notification',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
