import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [{
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/') // 路由懒加载
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [{
      path: '', //默认子路由
      name: 'home',
      component: () => import('@/views/home/')
    }, {
      path: '/qa', //默认qa子路由
      name: 'qa',
      component: () => import('@/views/qa/')
    }, {
      path: '/vedio', //默认子路由
      name: 'vedio',
      component: () => import('@/views/vedio/')
    }, {
      path: '/personal', //默认子路由
      name: 'personal',
      component: () => import('@/views/personal/')
    }]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/')
  },
  {
    //  配置动态路由
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/'),
    props: true

  },
  {
    //  配置编辑用户信息
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile/'),
    props: true

  }

]

const router = new VueRouter({
  routes
});

export default router;
