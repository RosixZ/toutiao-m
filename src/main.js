import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入全局的css
import './styles/index.less'
//引入Vant组件库
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
// 引入 自动设置 REM基准值
import 'amfe-flexible';

Vue.config.productionTip = false

// 注册过滤器
import filter from './utils/dayjs'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
