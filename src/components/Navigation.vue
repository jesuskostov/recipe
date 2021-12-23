<template>
  <div class="nav">
    <div class="container h-100">
        <div v-if="user" class="d-flex justify-content-between align-items-center h-100 pt-5">
            <h4>Здравей {{user.name}}<br><span>{{user.email}}</span></h4>
            <h4>
                {{ new Date().getHours() }}:{{ new Date().getMinutes() }}
                <br>
                <span>{{ new Date().getDate() }}/{{ new Date().getMonth() }}/{{ new Date().getFullYear() }}</span>
            </h4>
            <h4>Вие имате {{user.recipe}}<br>рецепти</h4>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            user: null
        }
    },
    mounted() {
        axios.get('http://localhost:1000/user', { headers: {token: localStorage.getItem('token')} }).then( res => {
            this.user = res.data.user
        });
    }
}
</script>

<style lang="scss" scoped> 
.nav {
    height: 80px;
}

h4 {
    text-align: left;
    margin-bottom: 0;
    line-height: 1;
    span {
        font-size: 14px;
        color: rgb(130, 130, 130);
    }
}

</style>