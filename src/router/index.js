import Vue from 'vue'
import Router from 'vue-router'
import Intro from '@/components/Intro'
import Inventory from '@/components/Inventory'
import Warehouse from '@/components/Warehouse'
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
    {
      path: '/inventory',
      name: 'Inventory',
      component: Inventory
    },
    {
      path: '/warehouse',
      name: 'Warehouse',
      component: Warehouse
    },
    {
      path: '/battlefield',
      name: 'Battlefield',
      component: Battlefield
    },
    {
      path: '/workshop',
      name: 'Workshop',
      component: Workshop
    }
  ]
})
