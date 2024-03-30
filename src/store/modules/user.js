export default {
  state: {
    user: "",
    loginVisible: false
  },

  getters: {
    getUser (state) {
      return state.user;
    },
    getLoginVisible (state) {
      return state.loginVisible;
    }
  },
  mutations: {
    setUser (state, data) {
      state.user = data;
    },
    setShowLogin (state, data) {
      state.loginVisible = data;
    }
  },
  actions: {
    setUser ({ commit }, data) {
      commit('setUser', data);
    },
    setShowLogin ({  commit }, data) {
      commit('setShowLogin', data);
    }
  }

}
