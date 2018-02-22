import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/pages/index/Index.vue'
import Login from '@/pages/login'
import Errors from '@/pages/errors'
import Article from '@/pages/article'
import AddArticle from '@/pages/addArticle'
import { beforeEach, afterEach } from '@/router/event'
/**子路由 */
const ErrorCom = {
    path: 'Errors',
    name: 'Errors',
    component: Errors
}
const Others = {
    path: '*',
    redirect: '/Errors'
}
const router = new VueRouter({
    routes: [{
        path: '/',
        name: 'home',
        component: Index,
        children: [ErrorCom, {
            path: 'article',
            name: 'Article',
            component: Article
        },{
            path:'addArticle',
            name: 'AddArticle',
            component: AddArticle
        }]
    }, {
        path: '/login',
        name: 'Login',
        component: Login,
    }, Others]
})
router.beforeEach(beforeEach)
router.afterEach(afterEach);

export default router
