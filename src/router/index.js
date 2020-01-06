import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Vacancy from '@/pages/vacancy'
import Video from '@/pages/video'
import Test from '@/pages/test'
import Company from '@/pages/company'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/vacancy',
            name: 'Vacancy',
            component: Vacancy
        },
        {
            path: '/video',
            name: 'Video',
            component: Video
        },
        {
            path: '/test',
            name: 'Test',
            component: Test
        },
        {
            path: '/company',
            name: 'Company',
            component: Company
        }
    ]
})