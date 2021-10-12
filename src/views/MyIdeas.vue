<template>
  <div>
      My idea
    <div style="border: 1px solid green; display: flex; margin: 30px">
      <div v-for="(idea, i) in myIdeas" :key="i" style="background-color: gray; margin: 30px; padding: 10px; text-align: left; color: #fff">
        <b>author id: </b>{{idea.authorID}}<br>
        <b>author: </b>{{idea.author}}<br>
        <b>idea title: </b>{{idea.title}}<br>
        <b>idea description: </b>{{idea.description}}<br>
        <b>idea creation date: </b>{{idea.date}}
        <button @click="$router.push(`/update-idea/${idea._id}`)" style="background-color: orange">Edit</button>
        <button @click="deleteIdea(idea._id)" style="background-color: red">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    methods: {
        deleteIdea(id) {
            axios.delete(`http://localhost:5000/ideas/${id}`)
            setTimeout(() => {
                this.$store.dispatch('getMyIdeas')            
            }, 10)
        }
    },
    computed: {
        myIdeas() {
            return this.$store.state.myIdeas
        }
    },
    mounted() {
        setTimeout(() => {
            this.$store.dispatch('getMyIdeas')            
        }, 10)
    }
}
</script>

<style>

</style>