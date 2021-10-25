<template>
  <div class="container">
    <div class="row uk-grid-collapse" data-uk-grid>
      <div class="col-md-6 uk-width-1-2@m uk-padding-large uk-flex uk-flex-middle uk-flex-center" data-uk-height-viewport>
        <div class="uk-width-3-4@s">
          <div class="uk-text-center uk-margin-bottom">
            <a class="uk-logo uk-text-primary uk-text-bold" href="index.html">Kocina</a>
          </div>
          <div class="uk-text-center uk-margin-medium-bottom">
            <h1 class="uk-h2 uk-letter-spacing-small">Sign In to Kocina</h1>
          </div>
          <div class="uk-text-center uk-margin">
            <p class="uk-margin-remove">Or use your email account:</p>
          </div>
          <form class="uk-text-center">
            <div class="uk-width-1-1 uk-margin">
              <label class="uk-form-label" for="email">Email</label>
              <input v-model="email" id="email" class="uk-input uk-form-large uk-border-pill uk-text-center" type="email" placeholder="tom@company.com">
            </div>
            <div class="uk-width-1-1 uk-margin">
              <label class="uk-form-label" for="password">Password</label>
              <input v-model="password" id="password" class="uk-input uk-form-large uk-border-pill uk-text-center" type="password" placeholder="Min 8 characters">
            </div>
            <div class="uk-width-1-1 uk-margin uk-text-center">
              <a class="uk-text-small uk-link-muted" href="#">Forgot your password?</a>
            </div>
            <div class="uk-width-1-1 uk-text-center">
              <button @click.prevent="login" class="uk-button uk-button-primary uk-button-large">Sign In</button>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-6 uk-width-1-2@m uk-padding-large uk-flex uk-flex-middle uk-flex-center uk-light" data-uk-height-viewport>
        <div class="uk-background-cover uk-background-norepeat uk-background-blend-overlay uk-background-overlay 
          uk-border-rounded-large uk-width-1-1 uk-height-xlarge uk-flex uk-flex-middle uk-flex-center" 
          style="background-image: url(https://source.unsplash.com/7MAjXGUmaPw/600x700);">
          <div class="uk-padding-large">
            <div class="uk-text-center">
              <h2 class="uk-letter-spacing-small">Hello There, Join Us</h2>
            </div>
            <div class="uk-margin-top uk-margin-medium-bottom uk-text-center">
              <p>Enter your personal details and join the cooking community</p>
            </div>
            <div class="uk-width-1-1 uk-text-center">
              <button @click="$router.push('/register')" class="uk-button uk-button-primary uk-button-large">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: ''
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
        this.error = err.response.data.error
      })
    }
  }
}
</script>

<style>

</style>