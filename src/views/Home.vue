<template>
  <div>
      <Nav />
      <div class="container mt-5">
         <div class="uk-section uk-section-default">
            <div data-uk-grid>
               <div class="uk-width-expand@m">
                  <div data-uk-grid>
                     <div class="uk-width-expand@m mb-4">
                        <form class="uk-search uk-search-default uk-width-1-1">
                           <span data-uk-search-icon></span>
                           <input v-model="search" class="uk-search-input uk-text-small uk-border-rounded uk-form-large" type="search" placeholder="Search for recipes...">
                        </form>
                     </div>
                  </div>
                  <div class="row uk-child-width-1-2 uk-child-width-1-3@s" data-uk-grid>
                     <div v-for="(recipe, i) in recipies" :key="i" class="col-md-3">
                        <router-link :to="`/recipe/${recipe._id}`">
                           <div class="img">
                              <img :src="recipe.image" alt="">
                           </div>
                           <h2 class="title">{{recipe.title}}</h2>
                           <p class="little-text d-flex justify-content-between"><span class="text-capitalize">By {{recipe.author}}</span> <span>Приготвяне: {{recipe.time}}мин </span></p>
                        </router-link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <button @click="$router.push('/create-idea')" class="add-new">Добави нова рецепта</button>
   </div>
</template>

<script>
import Nav from '../components/Navigation.vue'
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      user: null,
      search: ''
    }
  },
  components: {
     Nav
  },
  methods: {
    apply(id) {
      let ideaID = id
      let user = this.user
      this.$store.dispatch('applyToIdea', {ideaID, user})
    },
    logout() {
      localStorage.clear()
      this.$router.push('/register')
    }
  },
  computed: {
    recipies() {
      return this.$store.state.ideas.filter( recipe => {
         return recipe.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }

  },
  mounted() {
      axios.get('http://localhost:1000/user', { headers: {token: localStorage.getItem('token')} }).then( res => {
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

<style lang="scss" scoped>
.add-new {
   width: 300px;
   height: 60px;
   border: 0;
   border-radius: 22px;
   position: fixed;
   right: 40px;
   bottom: 40px;
   background-color: #e6870b;
   color: #fff;
}

.active {
  outline: 5px solid yellow
}

.img {
   width: 100%;
   height: 150px;
   border-radius: 20px;
   overflow: hidden;
   img {
      width: 100%;
      height: 100%;
      object-fit: cover;
   }
}

.title {
   margin-top: 5px;
   text-align: left;
   font-size: 14px;
}

.little-text {
   font-size: 12px;
   color: #747474;
}

.job-block {
    .inner-box {
        box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1);
        position: relative;
        padding: 32px 20px 22px 30px;
        background: #FFFFFF;
        border: 1px solid #ECEDF2;
        box-sizing: border-box;
        border-radius: 10px;
        transition: all 300ms ease; 
    }
}
</style>