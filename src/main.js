import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import GameMenu from './views/GameMenu.vue';
import GamePlay from './views/GamePlay.vue';

Vue.use(VueRouter);

Vue.config.productionTip = false

const routes = [
  { 
    path: '/',
    name: 'home',
    component: GameMenu
  },
  {
    path: '/game',
    name: 'game',
    component: GamePlay
  }
];

const router = new VueRouter({
  routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
