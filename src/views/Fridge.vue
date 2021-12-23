<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-4">
        <!-- <h3>Имаш продукти за {{ foundRecipies.length }} рецепти:</h3> -->
        <h3 class="text-left mb-4">Твоите продукти:</h3>
        <div class="box">
          <div class="row">
            <div v-for="(product, i) in fridge" :key="i" class="col-md-6 mb-4">
              <div class="product-box">
                {{ product }}
                <button @click="deleteProduct(i)" class="delete-btn">X</button>
              </div>
            </div>
          </div>
          <div class="adding">
            <input
              type="text"
              v-model="product"
              placeholder="Име на продукта"
              v-on:keyup.enter="onEnter"
            />
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <h3 class="text-left mb-4">
          Имаме {{ foundRecipies.length }} рецепти за теб:
        </h3>
        <div class="row">
          <div
            v-for="(recipe, i) in foundRecipies"
            :key="i"
            class="col-md-6 mb-4"
          >
            <div class="recipe-box text-left p-3">
              <div>
                <h2>{{ recipe.title }}</h2>
                <p>{{ recipe.text[0] }}</p>
              </div>
              <h5>Време: {{ recipe.time }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import recipeDB from "../../../recipe.json";
// import VueSlickCarousel from "vue-slick-carousel";
// import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  data() {
    return {
      fridge: ["боб", "домати", "ориз"],
      foundRecipies: [],
      product: "",
    };
  },
  watch: {
    fridge() {
        if (this.fridge.length !== 0) {
            this.findRecipies(this.fridge, recipeDB, 3);
        }
    },
  },
  methods: {
    findRecipies(fridge, recipies, minIngredients) {
      for (const key in recipies) {
        const recipe = recipies[key];
        const { ingredients } = recipe;
        const matchedIngredients = [];

        fridge.forEach((fridgeItem) => {
          const isMatched = ingredients.some((ingredientItem) =>
            ingredientItem.includes(fridgeItem)
          );
          isMatched && matchedIngredients.push(fridgeItem);
        });

        const minMatched = matchedIngredients.length >= minIngredients;
        minMatched && this.foundRecipies.push(recipe);
      }
    },
    onEnter() {
      this.fridge.push(this.product);
      this.product = "";
    },
    deleteProduct(i) {
      this.fridge.splice(i, 1);
    },
  },
  mounted() {
    if (this.fridge.length !== 0) {
        this.findRecipies(this.fridge, recipeDB, 3);
    }
  },
};
</script>

<style lang="scss">
.adding {
  position: absolute;
  bottom: 4px;
  left: 4px;
  right: 4px;

  input {
    padding-left: 10px;
    width: 100%;
    height: 40px;
    border: 0;
    border-radius: 8px;
  }
}

.recipe-box {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  min-height: 180px;
  height: 100%;
  background-color: #6486c4;
  h2 {
    font-weight: bold;
    font-size: 16px;
    color: #fff;
  }
  p {
    font-size: 12px;
    color: #fff;
  }
  h5 {
    margin-top: auto;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }
}

.box {
  top: 10px;
  position: sticky;
  padding: 30px;
  border-radius: 8px;
  background-color: #a4dbe8;
  height: 500px;
}

.product-box {
  position: relative;
  padding: 5px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: white;
  min-height: 60px;
  height: 100%;
  .delete-btn {
    position: absolute;
    top: -10px;
    right: -10px;
    font-size: 12px;
    font-weight: bold;
    width: 20px;
    height: 20px;
    background-color: rgb(204, 81, 81);
    color: #fff;
    border: 0;
    border-radius: 99999px;
  }
}
</style>
