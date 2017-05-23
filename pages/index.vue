<template>
  <div class="columns is-mobile is-gapless">
    <user-list/>
    <messages/>
  </div>
</template>

<script>
import socket from '~plugins/socket.io.js'

import Messages from '~components/Messages.vue'
import UserList from '~components/UserList.vue'

export default {
  components: {
    UserList,
    Messages
  },
  asyncData (context, callback) {
    socket.emit('last-messages', function (messages) {
      callback(null, {
        messages,
        message: ''
      })
      console.log(messages)
    })
  },
  created () {

  },
  beforeMount () {

  },
  head () {
    return {
      title: 'Chat'
    }
  }
}
</script>

<style scoped>
.columns {
  height: 100%;
}
</style>
