import Vue from 'vue'
import Router from 'vue-router'
import Intro from '@/components/Intro'
import Battlefield from '@/components/Battlefield'
import Workshop from '@/components/Workshop'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Intro',
      component: Intro
    },
    // {
    //   path: '/warehouse',
    //   name: 'Warehouse',
    //   component: Warehouse
    // },
    {
      path: '/battlefield',
      name: 'Battlefield',
      component: Battlefield
    },
    {
      name: 'Warehouse',
      path: '/workshop/warehouse',
      component: Workshop,
      props: {
        tab: 'warehouse'
      }
    },
    {
      name: 'Hammerspace',
      path: '/workshop/hammerspace',
      component: Workshop,
      props: {
        tab: 'hammerspace'
      }
    },
    {
      name: 'Current bot',
      path: '/workshop/current',
      component: Workshop,
      props: {
        tab: 'current'
      },
      alias: '/workshop'
    },
    {
      name: 'Prototype',
      path: '/workshop/prototype',
      component: Workshop,
      props: {
        tab: 'prototype'
      }
    }
  ]
})
