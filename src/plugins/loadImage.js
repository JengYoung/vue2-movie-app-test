/*
    plugin을 만듦
*/

export default {
    install(Vue) {
        // image를 받아다가 document createelement 해서 주소를 넣어서 이미지가 불러와지면 로드가 되도록 비동기 적용.
        Vue.prototype.$loadImage = (src) => {
            return new Promise((resolve) => {
                const img = document.createElement('img')
                img.src = src;
                img.addEventListener('load', () => {
                    resolve()
                });
            });
        };
    }
};