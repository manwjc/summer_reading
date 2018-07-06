import Vue from 'vue'
import Router from 'vue-router'
//import Store from '../pages/Store'

Vue.use(Router)

const IndexNew = resolve => require(['../pages/IndexNew'], resolve)
const ApplyFormNew = resolve => require(['../pages/ApplyFormNew'], resolve)
const NameListNew = resolve => require(['../pages/NameListNew'], resolve)
const IndexOld = resolve => require(['../pages/IndexOld'], resolve)
const ApplyFormOld = resolve => require(['../pages/ApplyFormOld'], resolve)
const NameListOld = resolve => require(['../pages/NameListOld'], resolve)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexNew,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/indexNew',
      name: 'indexNew',
      component: IndexNew,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/applyFormNew',
      name: 'applyFormNew',
      component: ApplyFormNew,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/nameListNew',
      name: 'nameListNew',
      component: NameListNew,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/indexOld',
      name: 'indexOld',
      component: IndexOld,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/applyFormOld',
      name: 'applyFormOld',
      component: ApplyFormOld,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/nameListOld',
      name: 'nameListOld',
      component: NameListOld,
      meta: {
        keepAlive: true
      }
    }
  ]
})
