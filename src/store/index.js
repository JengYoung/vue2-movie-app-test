import Vue from 'vue';
import Vuex from 'vuex';
// 어차피 다 가까운 곳에서 import 할 거라, 절대경로를 굳이...?
import message from './message';
import movie from './movie';
import about from './about';

// Plugin 등록
Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    getters:{},
    mutations: {},
    actions: {},
    modules: {
        message,
        movie,
        about,
    }
})
