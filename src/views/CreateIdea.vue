<template>
  <div class="container pt-5 pb-5">
        <form class="uk-text-center">
            <div class="row">
                <div class="col-md-6 mx-auto border-bottom my-4 pb-4">
                    <!-- <div class="uk-width-1-1 uk-margin">
                        <label class="uk-form-label" for="image">Снимка</label>
                        <input id="image" class="uk-input uk-form-large uk-border-pill uk-text-center" type="file" placeholder="Вкусен боб">
                    </div> -->
                    <input type="file" class="image-input" ref="imageInput" accept="image/*" @change="onFileChange">
                    <div @click="pickImage" class="add-photo-container">
                        <img v-if="this.image != null" class="img" :src="this.image" alt="">
                    </div>
                    <!-- <img v-if="image != null" @click="deletePhoto" class="img-bin-icon ml-3" src="../assets/images/bin.svg" alt="bin icon"> -->
                    <div class="uk-width-1-1 uk-margin">
                        <label class="uk-form-label" for="title">Заглавие</label>
                        <input v-model="title" id="title" class="uk-input uk-form-large uk-border-pill uk-text-center" type="text" placeholder="Пример: Вкусен боб">
                    </div>
                    <div class="uk-width-1-1 uk-margin">
                        <label class="uk-form-label" for="description">Описание</label>
                        <input v-model="description" id="description" class="uk-input uk-form-large uk-border-pill uk-text-center" type="text" placeholder="Пример: Уникален боб, който върви много с бира">
                    </div>
                    <div class="uk-width-1-1 uk-margin">
                        <label class="uk-form-label" for="description">Време за приготвяне в минути (приблизително)</label>
                        <input v-model="time" id="description" class="uk-input uk-form-large uk-border-pill uk-text-center" type="text" placeholder="Пример: 30min">
                    </div>
                </div>
                <div class="col-md-6 offset-md-3">
                    <div v-for="(step, i) in cooking" :key="i" class="uk-width-1-1 uk-margin">
                        <div>
                            <label class="uk-form-label" for="description"><span v-if="step.title">{{step.title}}</span><span v-else>Стъпка {{ 1 + i}}</span></label>
                            <input v-model="step.title" class="mb-4 uk-input uk-form-large uk-text-center" type="text">
                        </div>
                        <div>
                            <label class="uk-form-label" for="description">Опиши</label>
                            <textarea v-model="step.text" class="mb-4 uk-input uk-form-large uk-text-center"></textarea>
                        </div>
                        <hr>
                    </div>
                    <button @click.prevent="newStep" class="uk-button uk-button-primary uk-button-large">Нова стъпка</button>
                </div>
            </div>
            <div class="uk-width-1-1 uk-text-center mt-5">
                <button @click.prevent="create" class="uk-button uk-button-primary uk-button-large">Добави</button>
            </div>
        </form>
  </div>
</template>

<style scoped>
.img {
    width: 400px;
    height: 300px;
    border: 1px solid red;
    object-fit: cover;
}
</style>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            image: '',
            title: '',
            description: '',
            cooking: [],
            time: ''
        }
    },
    methods: {
        async create() {
            let user = await this.$store.state.user;
            let idea = {
                authorID: user.id,
                author: user.name,
                image: this.image,
                title: this.title,
                description: this.description,
                cooking: this.cooking,
                time: this.time,
                date: new Date()
            }
            await axios.post('http://localhost:1000/createIdea', idea)
            this.$store.dispatch('getIdeas')    
            this.$router.push('/')
        },
        newStep() {
            this.cooking.push({
                title: '',
                text: ''
            })
        },
        onFileChange(e) {
            let image = e.target.files[0]
            this.createImage(image)
        },
        pickImage() {
            this.$refs.imageInput.click()
        },
        createImage(image) {
            const reader = new FileReader()
            reader.onloadend = () => {
                this.image  = reader.result;
            }
            reader.readAsDataURL(image);
        },
        deletePhoto() {
            this.image = null
        }
    },
    async mounted() {
        await this.$store.dispatch('getUser');
        this.cooking.push({
            title: '',
            text: ''
        })
    }
}
</script>