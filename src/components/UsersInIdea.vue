<template>
  <div>
      <pre>{{users}}</pre>
        <!-- <div v-for="(user, i) in users" :key="i">
            {{user._id}}
            {{user.email}}
        </div> -->
  </div>
</template>

<script>
export default {
    props: ['users'],
}
</script>

<style>

</style>