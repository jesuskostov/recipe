<template>
  <div>
      <div class="page-wrapper">
            <span class="header-span"></span>
            <!--Page Title-->
            <section class="page-title">
                <div class="auto-container">
                    <div class="title-outer">
                        <h1>My Ideas</h1>
                    </div>
                </div>
            </section>
            <!--End Page Title-->      
       </div>
    <div>
        <div v-for="(idea, i) in myIdeas" :key="i"  class="job-block col-lg-6 col-md-12 col-sm-12">
            <div class="inner-box">
                <div class="content">
                    <h4 class="text-left"><a href="#">{{idea.title}}</a></h4>
                    <p class="text-left">{{idea.description}}</p>
                </div>
            </div>
            <div class="text-left">
                <button class="theme-btn btn-style-three call-modal mr-3" @click="$router.push(`/update-idea/${idea._id}`)" style="background-color: orange">Edit</button>
                <button class="theme-btn btn-style-three call-modal" @click="deleteIdea(idea._id)" style="background-color: red">Delete</button>
            </div>
        </div>
      <!-- <div v-for="(idea, i) in myIdeas" :key="i" style="background-color: gray; margin: 30px; padding: 10px; text-align: left; color: #fff">
        <b>author id: </b>{{idea.authorID}}<br>
        <b>author: </b>{{idea.author}}<br>
        <b>idea title: </b>{{idea.title}}<br>
        <b>idea description: </b>{{idea.description}}<br>
        <b>idea creation date: </b>{{idea.date}}
      </div> -->
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