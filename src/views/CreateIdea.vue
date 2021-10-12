<template>
  <div>
      create idea <br><br>
      title: <input type="text" v-model="title"> <br>
      description: <input type="text" v-model="description"> <br>
      <button @click="create">Create</button>
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
        async create() {
            let user = await this.$store.state.user;
            let idea = {
                authorID: user.id,
                author: user.name,
                title: this.title,
                description: this.description,
                date: new Date()
            }
            await axios.post('http://localhost:5000/createIdea', idea)
            this.$store.dispatch('getIdeas')    
        }
    }
}
</script>

<style>

</style>