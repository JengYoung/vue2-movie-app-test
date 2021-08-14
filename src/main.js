import 'regenerator-runtime';
import Vue from 'vue';
import App from './App';
import router from '@/routes';
import store from '@/store';
import loadImage from '@/plugins/loadImage';

// plugin -> use에 등록
Vue.use(loadImage);

new Vue({
    el: '#app',
    router,
    store,
    render: createElement => createElement(App),
})