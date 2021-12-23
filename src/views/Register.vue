<template>
    <div class="container">
        <div class="row uk-grid-collapse">
            <div class="col-md-6 uk-width-1-2@m uk-padding-large uk-flex uk-flex-middle uk-flex-center" data-uk-height-viewport>
                <div class="uk-width-3-4@s">
                <div class="uk-text-center uk-margin-medium-bottom">
                    <h1 class="uk-h2 uk-letter-spacing-small">Create an Account</h1>
                </div>
                <div class="uk-text-center uk-margin">
                    <p class="uk-margin-remove">Or use your email for registration:</p>
                </div>
                <form class="uk-text-center">
                    <div class="uk-width-1-1 uk-margin">
                        <label class="uk-form-label" for="name">Full name</label>
                        <input id="name" class="uk-input uk-form-large uk-border-pill uk-text-center" v-model="name" type="text" placeholder="Tom Atkins">
                        </div>
                        <div class="uk-width-1-1 uk-margin">
                        <label class="uk-form-label" for="email">Email</label>
                        <input id="email" class="uk-input uk-form-large uk-border-pill uk-text-center" v-model="email" type="email" placeholder="tom@company.com">
                        </div>
                        <div class="uk-width-1-1 uk-margin">
                        <label class="uk-form-label" for="password">Password</label>
                        <input id="password" class="uk-input uk-form-large uk-border-pill uk-text-center" v-model="password" type="password" placeholder="Min 8 characters">
                    </div>
                    <div class="uk-width-1-1 uk-text-center">
                        <button @click.prevent="register" class="uk-button uk-button-primary uk-button-large">Sign Up</button>
                    </div>
                    <div class="uk-width-1-1 uk-margin uk-text-center">
                        <p class="uk-text-small uk-margin-remove">By signing up you agree to our <a class="uk-link-border" href="#">terms</a> of service.</p>
                    </div>
                </form>
                </div>
            </div>
            <div class="col-md-6 uk-width-1-2@m uk-padding-large uk-flex uk-flex-middle uk-flex-center uk-light" data-uk-height-viewport>
                <div class="uk-background-cover uk-background-norepeat uk-background-blend-overlay uk-background-overlay 
                    uk-border-rounded-large uk-width-1-1 uk-height-xlarge uk-flex uk-flex-middle uk-flex-center" 
                    style="background-image: url(https://source.unsplash.com/2wq0ReWAM8I/600x600);">
                <div class="uk-padding-large">
                    <div class="uk-text-center">
                    <h2 class="uk-letter-spacing-small">Welcome Back</h2>
                    </div>
                    <div class="uk-margin-top uk-margin-medium-bottom uk-text-center">
                    <p>Already signed up, enter your details and start cooking your first meal today</p>
                    </div>
                    <div class="uk-width-1-1 uk-text-center">
                    <button @click="$router.push('/login')" class="uk-button uk-button-primary uk-button-large">Sign In</button>
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
            axios.post('http://localhost:1000/signup', user).then( res => {
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