<template>
  <div>
      <input type="text" v-model="email">
      <input type="password" v-model="password">
      <button @click="login">Login</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      let user = {
        email: this.email,
        password: this.password
      }
      axios.post('http://localhost:5000/signin', user).then( res => {
        if (res.status === 200) {
          let token = res.data.token
          localStorage.setItem('token', token);
          this.$router.push('/')
        }
      }, err => {
        console.log(err.response.data.error);
      })
    }
  }
}
</script>

<style>

</style>