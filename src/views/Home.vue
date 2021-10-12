<template>
  <div class="home">
    Home
    <br>
    <br>
    <br>
    <div v-if="user" style="border: 1px solid black; display: inline-block; margin: 30px">
      user: {{user._id}} <br>
      user: {{user.name}} <br>
      user: {{user.email}} <br>
    </div>
    <div v-if="user" style="border: 1px solid green; display: flex; flex-wrap: wrap;">
      <div v-for="(idea, i) in ideas" :key="i" :class="{'active': idea.authorID === user._id}" style="width: 28%; background-color: gray; margin: 15px; padding: 10px; text-align: left; color: #fff">
        <b>author id: </b>{{idea.authorID}}<br>
        <b>author: </b>{{idea.author}}<br>
        <b>idea title: </b>{{idea.title}}<br>
        <b>idea description: </b>{{idea.description}}<br>
        <b>idea creation date: </b>{{idea.date}}
      </div>
    </div>
    <br>
    <br>
    <br>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import axios from 'axios'
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      user: null,
    }
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/register')
    }
  },
  computed: {
    ideas() {
      return this.$store.state.ideas
    }
  },
  mounted() {
    axios.get('http://localhost:5000/user', { headers: {token: localStorage.getItem('token')} }).then( res => {
      this.user = res.data.user
    });
    this.$store.dispatch('getIdeas')    
  },
  created() {
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.active {
  outline: 5px solid yellow
}
</style>