import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.use(require('vue-moment'));


Vue.config.productionTip = false
Vue.mixin({
    methods: {
        isMobile: function () {
           return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent))
        }
    }
})


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
