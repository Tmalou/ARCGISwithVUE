import Vue from 'vue'
import Router from 'vue-router'
import Hybrid from '@/views/hybrid'
import Popups from '@/views/popups'
import Draw from '@/views/draw'
import SceneLayer from '@/views/sceneLayer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hybrid',
      component: Hybrid
    },{
      path: '/popups',
      name: 'popups',
      component: Popups
    },{
      path: '/draw',
      name: 'draw',
      component: Draw
    },{
      path: '/scenelayer',
      name: 'scenelayer',
      component: SceneLayer
    },
  ]
})
