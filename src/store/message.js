export default {
    namespaced: true, // 모듈로 쓸 것이라는 것을 명시해야 함.
    state: () => ({
        msg: '000fewf0f'
    }),
    getters: {
        reversedMsg(state) {
            return state.msg.split('').reverse().join('')
        }
    },
    mutations: {
        updateMsg(state, newMsg) {
            state.msg = newMsg;
        }
    },
    actions: {
        reverseMsg({ state, commit }) {
            const newMsg = state.msg.split('').reverse().join('');
            // 현재 파일 안에서는 모듈이름을 앞에 붙여주지 않아도 자동으로 계산됨.
            commit('updateMsg', newMsg);
        }
    },
}