import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSocketIO from 'vue-socket.io'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import SocketIO from 'socket.io-client'


let apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:4201/api'
if (!apiUrl.endsWith('/api')) {
  apiUrl = apiUrl.replace(/\/+$/, '') + '/api'
}
const socketUrl = process.env.VUE_APP_SOCKET_URL || 'http://localhost:4201'

const socketConnection = SocketIO(socketUrl)

Vue.config.productionTip = false
Vue.prototype.$envio=0;
Vue.prototype.$paises = ['Argentina','Chile','Perú','Bolivia','Colombia'];
Vue.prototype.$url = apiUrl;
Vue.prototype.$token = localStorage.getItem('token');
Vue.use(BootstrapVue)
Vue.use(new VueSocketIO({
  debug: true,
  connection: socketConnection,
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },

}))



new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
