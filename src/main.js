// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import qs from 'qs'
import service from './js/service'

import showMessage from 'vue-show-message'

Vue.use(showMessage, {
	duration: 2000
})

Vue.prototype.$service = service
Vue.prototype.$qs = qs;

if(process.env.NODE_ENV === 'development'){
	let baseURL = '/baseApi'
	axios.defaults.baseURL = baseURL
}
Vue.prototype.$axios = axios
// Object.defineProperties(Vue.prototype, '$axios', {value: axios})

import filters from './js/common/filters'
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
});

// import FastClick from 'fastclick'	//会导致el-upload点击异常,需要双击才能调起相册
// FastClick.attach(document.body);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面title */
	if (to.meta.title) {
		document.title = to.meta.title
	}
	next()
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	// store,
	components: {
		App
	},
	template: '<App/>'
})