import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const IndexPage = resolve => require(['../pages/Index'], resolve)
const CheckPhone = resolve => require(['../pages/CheckPhone'], resolve)
const NameList = resolve => require(['../pages/NameList'], resolve)
const NewGay = resolve => require(['../pages/NewGay'], resolve)

const SceneList = resolve => require(['../pages/SceneList'], resolve)
const SceneCon = resolve => require(['../pages/SceneCon'], resolve)
const SceneLastDay = resolve => require(['../pages/SceneLastDay'], resolve)
const SceneShare = resolve => require(['../pages/SceneShare'], resolve)

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
    },
    {
      path: '/sceneList',
      name: 'sceneList',
      component: SceneList,
      meta: {
        keepAlive: true,
        title: '乔希“小剧场”阅读表演营'
      }
    },
    {
      path: '/sceneCon/:id',
      name: 'sceneCon',
      component: SceneCon,
      meta: {
        keepAlive: true,
        title: '乔希“小剧场”阅读表演营'
      }
    },
    {
      path: '/sceneLastDay',
      name: 'sceneLastDay',
      component: SceneLastDay,
      meta: {
        keepAlive: true,
        title: '乔希“小剧场”阅读表演营'
      }
    },
    {
      path: '/sceneShare',
      name: 'sceneShare',
      component: SceneShare,
      meta: {
        keepAlive: true,
        title: '乔希“小剧场”阅读表演营'
      }
    },
  ]
})
