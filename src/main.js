// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import index from './components/Index.vue';
import indexCopy from './components/IndexCopy.vue';
import detail from './components/Detail.vue';
import series from './components/Series.vue';
import VueRouter from 'vue-router'; // router路由
import VueResource from 'vue-resource';// ajax请求 方式1
import Axios from 'axios';// ajax请求 方式2
Vue.prototype.$http = Axios;// ajax请求
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.config.productionTip = false;

const routes = [{
    path: '/',
    redirect: '/index'
  }, {
  path: '/index',
  component: index
  }, {
  path: '/indexCopy',
  component: indexCopy
  }, {
    path: '/series',
    component: series
  }, {
    path: '/detail',
    component: detail
}];
const router = new VueRouter({
  // mode: 'history', // 去除#
  linkActiveClass: 'active',
  routes
});
// 切换路由时回到顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
