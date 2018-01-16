import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
Vue.prototype.axios = axios
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})