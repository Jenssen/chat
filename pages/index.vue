<template>
  <div class="columns is-mobile is-gapless">
    <user-list/>
    <messages @emitMessage="sendMessage"/>
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
  created () {

  },
  beforeMount () {
    socket.on('new-message', (message) => {
      this.$store.commit('addMessage', message)
    })
    socket.on('new-user', (clients) => {
      this.$store.commit('addClients', clients)
    })
  },
  methods: {
    sendMessage (message) {
      socket.emit('send-message', message)
    }
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
