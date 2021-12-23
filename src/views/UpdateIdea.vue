<template>
  <div>
      Update idea: {{$route.params.id}} <br>
      title <input type="text" v-model="title"> <br>
      description <input type="text" v-model="description"> <br>
      <button @click="edit($route.params.id)">Edit</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            title: '',
            description: ''
        }
    },
    methods: {
        async setMyIdea() {
            let myIdeas = await this.$store.state.myIdeas
            let myIdea = myIdeas.filter( item => item._id === this.$route.params.id)
            this.title = myIdea[0].title
            this.description = myIdea[0].description
        },
        async edit(id) {
            let user = await this.$store.state.user;
            let idea = {
                authorID: user.id,
                author: user.name,
                title: this.title,
                description: this.description,
                date: new Date()
            }
            axios.put(`http://localhost:1000/ideas/${id}`, idea)
        }
    },
    async created() {
        await this.$store.dispatch('getUser')
        await this.$store.dispatch('getMyIdeas')      
        this.setMyIdea();
    },
}
</script>

<style>

</style>