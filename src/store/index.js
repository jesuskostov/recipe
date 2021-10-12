import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: String,
      name: String,
      email: String
    },
    ideas: [],
    myIdeas: []
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user.id = user._id
      state.user.name = user.name
      state.user.email = user.email
    },
    SET_IDEAS: (state, payload) => {
      state.ideas = payload
    },
    SET_MY_IDEAS: (state, payload) => {
      state.myIdeas = payload
    }
  },
  actions: {
    getUser: async ({commit}) => {
      let res = await axios.get('http://localhost:5000/user', { headers: {token: localStorage.getItem('token')} });
      commit('SET_USER', res.data.user)
    },
    getIdeas: async ({commit}) => {
      let res = await axios.get('http://localhost:5000/ideas')
      commit('SET_IDEAS', res.data)
    },
    getMyIdeas: async ({commit, state}) => {
      let userID = state.user.id      
      let res = await axios.get(`http://localhost:5000/ideas/${userID}`)
      commit('SET_MY_IDEAS', res.data)
      console.log(userID);
    },
  },
  modules: {
  }
})
