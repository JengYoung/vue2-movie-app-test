import axios from 'axios';
import _uniqBy from 'lodash/uniqBy';

export default {
    namespaced: true,
    state: () => ({
        movies: [],
        // 뭔가 업데이트되는 동작 동안에는 true
        loading: false,
        message: "Search for the movie title!",
        theMovie: {},
    }),
    getters: {},
    mutations: {
        // 범용화 시켜서 편하게 갖다 쓸 수 있도록 설정
        updateState(state, payload) {
            Object.keys(payload).forEach(key => {
                state[key] = payload[key]
            })
        }
    },
    actions: {
        async searchMovies({ state, commit }, payload) {
            if (state.loading) return;

            // Start loading
            commit('updateState', {
                loading: true,
                message: ''
            })

            try {
                const res = await _fetchMovie(payload);
                const { Search, totalResults } = res.data;
                console.log("요기", res)

                commit('updateState', {
                    movies: _uniqBy(Search, 'imdbID'),
                })

                const total = parseInt(totalResults, 10)
                const pageLength = Math.ceil(total / 10)

                if (pageLength > 1) {
                    for (let page = 2; page <= pageLength; page++) {
                        if (page > (payload.number / 10)) break;
                        // 추가 요청 처리
                        const res = await _fetchMovie({
                            ...payload,
                            page
                        })

                        const { Search } = res.data;
                        commit('updateState', {
                            movies: _uniqBy([
                                ...state.movies,
                                ...Search
                            ], 'imdbID')
                        })
                    }
                }
            } catch (error) {
                console.log(error);
                commit('updateState', {
                    message: error.message,
                    movies: []
                })
            } finally {
                // 업데이트 여부와 관계 없이, 로딩은 꺼야 함.
                commit('updateState', {
                    loading: false
                })
            }
        },
        async searchMovieWithId({ state, commit }, payload) {
            if (state.loading) return;
            commit('updateState', {
                loading: true
            })

            try {
                const res = await _fetchMovie({
                    id: payload.id
                })
                console.log(res.data)
                commit('updateState', {
                    theMovie: res.data
                })
            } catch (error) {
                commit('updateState', {
                    message: error.message
                })
            } finally {
                commit('updateState', {
                    loading: false
                })

            }
        }
    },
}

/**
 * 현재 파일에서만 활용되므로 _를 붙임. (비공개함수에 대한 의미론적 convention)
 * @param {object} payload 
 */

async function _fetchMovie(payload) {
    return await axios.post('/.netlify/functions/movie', payload)
}