import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const _import_ = file => () => import('../views/' + file + '.vue')

const router = new Router({
    routes: [
        {
            path: '/',
            component: _import_('index')
        }
    ]
})

export default router