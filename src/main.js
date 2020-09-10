import Vue from 'vue'
import App from './App.vue'
import router from './router/router'


import { Swipe, SwipeItem } from 'vant'
import { Image as VanImage } from 'vant'
import { Lazyload } from 'vant'

Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(VanImage)
Vue.use(Lazyload)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
