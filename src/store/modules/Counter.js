const state = {
    count: 0
}
const getters = {
    count(state) {
        return state.count
    }
}
const mutations = {
    DECREMENT_MAIN_COUNTER(state) {
        state.count--
    },
    INCREMENT_MAIN_COUNTER(state) {
        state.count++
    }
}

const actions = {
    addCount({commit}) {
        // do something async
        commit('INCREMENT_MAIN_COUNTER')
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
