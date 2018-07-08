import Vue from 'vue'
import Router from 'vue-router'
//import Store from '../pages/Store'

Vue.use(Router)

const IndexPage = resolve => require(['../pages/Index'], resolve)
const CheckPhone = resolve => require(['../pages/CheckPhone'], resolve)
const NameList = resolve => require(['../pages/NameList'], resolve)
const NewGay = resolve => require(['../pages/NewGay'], resolve)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexPage,
      meta: {
        keepAlive: true,
        title: '暑假英文阅读戏剧表演营'
      }
    },
    {
      path: '/checkPhone',
      name: 'checkPhone',
      component: CheckPhone,
      meta: {
        keepAlive: true,
        title: '暑假英文阅读戏剧表演营'
      }
    },
    {
      path: '/nameList',
      name: 'nameList',
      component: NameList,
      meta: {
        keepAlive: true,
        title: '暑假英文阅读戏剧表演营'
      }
    },
    {
      path: '/newGay',
      name: 'newGay',
      component: NewGay,
      meta: {
        keepAlive: true,
        title: '暑假英文阅读戏剧表演营'
      }
    }
  ]
})
