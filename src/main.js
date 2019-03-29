/* eslint-disable */
import 'script-loader!../scripts/applican'
/* eslint-enable */
import 'babel-polyfill'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import { sync } from 'vuex-router-sync'
import store from './store'
import moment from 'vue-moment'
import AppHttp from '@/service/AppHTTP'
import AppNotification from '@/service/AppNotification'

Vue.use(moment)
window.moment = require('moment')
window.moment.locale('ja', {weekdays: ['日', '月', '火', '水', '木', '金', '土']})
// sync(store, router)

router.beforeEach((to, from, next) => {
  next()
})

Vue.config.productionTip = false

/* eslint-disable no-new */
function start () {
  let setupApplication = {
    app: window.applican,
    store: store
  }
  Vue.use(AppHttp, setupApplication)
  Vue.use(AppNotification, setupApplication)
  const appHTTP = new AppHttp()
  const appNotification = new AppNotification()
  const application = new Vue({
    store,
    router,
    appHTTP,
    appNotification,
    render: h => h(App)
  })
  application.$mount('#app')
}

if (location.href.indexOf('localhost') !== -1) {
  start()
}

document.addEventListener('deviceready', () => {
  start()
}, false)
