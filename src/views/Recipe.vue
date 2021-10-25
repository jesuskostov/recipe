<template>
  <div class="container pt-5">
      <div class="row">
        <div class="col-md-8">
            <h1 class="text-left mb-4">{{recipe.title}}</h1>
            <div class="img">
                <img :src="recipe.image" :alt="recipe.title">
                <p class="time">Време за приготвяне {{recipe.time}}мин.</p>
            </div>
            <div class="text-left pt-3">
                <p>{{recipe.description}}</p>
            </div>
        </div>
        <div class="col-md-4 pt-5 mt-3">
            <div v-for="(step, i) in recipe.cooking" :key="i" class="step">
                <h3> <span>{{i + 1}}</span> {{step.title}}</h3>
                <p>{{step.text}}</p>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    methods: {
        async getRecipe(id) {
            await this.$store.dispatch('getRecipe', id)
        }
    },
    computed: {
        recipe() {
            return this.$store.state.recipe
        }
    },
    async mounted() {
        let id = await this.$route.params.id
        this.getRecipe(id)
    }
}
</script>

<style lang="scss" scoped>
.step {
    margin-bottom: 30px;
    h3 {
        font-size: 20px;
        display: flex;
        align-items: center;
        margin-bottom: 0;
        text-align: left;
        span {
            margin-right: 12px;
            flex-shrink: 0;
            width: 50px;
            height: 50px;
            border-radius: 9999px;
            background-color: orange;
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    p {
        margin: 0;
        text-align: left;
        font-size: 14px;
        padding-left: 65px;
    }
}

.img {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    height: 250px;
    .time {
        position: absolute;
        bottom: -20px;
        left: 0;
        color: #fff;
        background-color: #e6870b;
        padding: 10px;
        border-top-right-radius: 12px;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>