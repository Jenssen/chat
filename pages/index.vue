<template>
  <div class="columns is-mobile is-gapless">
    <user-list/>
    <messages/>
  </div>
</template>

<script>
import Messages from '~components/Messages.vue'
import UserList from '~components/UserList.vue'

export default {
  components: {
    UserList,
    Messages
  },
  head () {
    return {
      title: 'Users'
    }
  }
}
</script>

<style scoped>
.columns {
  height: 100%;
}
</style>
