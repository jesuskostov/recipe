import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: '',
      name: '',
      email: ''
    },
    ideas: [],
    recipe: [],
    ideaUsers: []
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user.id = user.id
      state.user.name = user.name
      state.user.email = user.email
    },
    SET_IDEAS: (state, payload) => {
      state.ideas = payload
    },
    SET_RECIPE: (state, payload) => {
      state.recipe = payload
    },
    SET_IDEA_USERS: (state, payload) => {
      state.ideaUsers = payload
    }
  },
  actions: {
    getUser: async ({commit}) => {
      let res = await axios.get('http://localhost:1000/user', { headers: {token: localStorage.getItem('token')} });
      commit('SET_USER', res.data.user)
    },
    getIdeas: async ({commit}) => {
      let res = await axios.get('http://localhost:1000/ideas')
      commit('SET_IDEAS', res.data)
    },
    getRecipe: async ({commit}, id) => {
      let res = await axios.get(`http://localhost:1000/ideas/${id}`)
      commit('SET_RECIPE', res.data)
    },
    applyToIdea: async ({dispatch}, {ideaID, user}) => {
      await axios.put(`http://localhost:1000/applyIdea`, {ideaID, user})
      dispatch('getIdeas')
    },
    usersInIdea: async ({commit}, userIDs) => {
      let res = await axios.get(`http://localhost:1000/userInIdea/${userIDs}`)
      commit('SET_IDEA_USERS', res.data)
    }
  },
  modules: {
  }
})
