// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'



import 'iview/dist/styles/iview.css'
import {
  Button,
  Layout,
  Header,
  Content,
  Row,
  Col,
  Form,
  FormItem,
  Input,
  Icon,
  Message,
} from 'iview';
Vue.component('Button', Button)
Vue.component('Layout', Layout)
Vue.component('Header', Header)
Vue.component('Content', Content)
Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Input', Input)
Vue.component('Icon', Icon)

Vue.prototype.$Message = Message

axios.defaults.baseURL = 'http://localhost:9999'
axios.defaults.withCredentials = 'include'

Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
