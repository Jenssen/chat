<template>
  <div class="columns is-mobile is-gapless">
    <modal @newUser="addNewUser"/>
    <user-list/>
    <messages @emitMessage="sendMessage"/>
  </div>
</template>

<script>
import socket from '~plugins/socket.io.js'

import Messages from '~components/Messages.vue'
import UserList from '~components/UserList.vue'
import Modal from '~components/Modal.vue'

export default {
  components: {
    UserList,
    Messages,
    Modal
  },
  beforeMount () {
    socket.emit('newConnect')
  },
  created () {
    socket.on('initUsers', (users) => {
      this.$store.commit('addNewUser', users)
    })
    socket.on('new-message', (message) => {
      this.$store.commit('addMessage', message)
    })
    socket.on('addUsernameToStore', (activeUsers) => {
      this.$store.commit('addNewUser', activeUsers)
    })
  },
  methods: {
    sendMessage (message) {
      socket.emit('send-message', message, socket.id)
    },
    addNewUser (username) {
      socket.emit('addNewUser', username, socket.id)
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
