const state = {
    toDoList: [],
    doneList: [],
    filePath: '',
    searchContent: '',
    tags: []
}
const getters = {
    toDoList(state) {
        return state.toDoList
    },
    searchContent(state) {
        return state.searchContent
    },
    filePath(state) {
        return state.filePath
    },
    tags(state) {
        return state.tags
    }
}
const mutations = {
    SET_TODO_LIST(state, list) {
        state.toDoList = list
    },
    SET_FILEPATH(state, path) {
        state.filePath = path
    },
    SET_TAGS(state, tags) {
        state.tags = tags
    },
}

const actions = {
    setToDoList({commit}, list) {
        // do something async
        commit('SET_TODO_LIST', list)
    },
    setfilePath({commit}, path) {
        // do something async
        commit('SET_FILEPATH', path)
    },
    setTags({commit}, tags) {
        // do something async
        commit('SET_TAGS', tags)
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}
