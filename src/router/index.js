import Vue from 'vue'
import Router from 'vue-router'
import Inventory from '@/components/Inventory'
import Warehouse from '@/components/Warehouse'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Inventory',
      component: Inventory
    },
    {
      path: '/warehouse',
      name: 'Warehouse',
      component: Warehouse
    }
  ]
})
