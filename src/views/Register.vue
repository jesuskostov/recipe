<template>
  <div>
      <input type="text" v-model="name">
      <input type="email" v-model="email">
      <input type="password" v-model="password">
      <button @click="register">Register</button>
      <br>
      {{ error }}
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Register',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            error: ''
        }
    },
    methods: { 
        register() {
            let user = {
                name: this.name,
                email: this.email,
                password: this.password
            }
            axios.post('http://localhost:5000/signup', user).then( res => {
                if (res.status === 200) {
                    this.$router.push('/login')
                }
            }, err => {
                this.error = err.response.data.error;
            })
        }
    }
}
</script>

<style>

</style>