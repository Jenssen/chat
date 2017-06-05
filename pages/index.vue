<template>
  <div class="columns is-mobile is-gapless">
    <modal @newUser="addNewUser"/>
    <user-list/>
    <mobile-user-list/>
    <messages @emitMessage="sendMessage" @writing="writing"/>
  </div>
</template>

<script>
import socket from '~plugins/socket.io.js'

import UserList from '~components/UserList.vue'
import MobileUserList from '~components/MobileUserList.vue'
import Messages from '~components/Messages.vue'
import Modal from '~components/Modal.vue'

export default {
  components: {
    UserList,
    MobileUserList,
    Messages,
    Modal
  },
  computed: {
    usersOnline () {
      return this.$store.getters.activeUsersNumber
    }
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
    socket.on('isWriting', (writing) => {
      this.$store.commit('writing', writing)
    })
  },
  methods: {
    sendMessage (message) {
      socket.emit('send-message', message, socket.id)
    },
    addNewUser (username) {
      socket.emit('addNewUser', username, socket.id)
      this.$store.commit('changeStatus', true)
    },
    writing (userId, state) {
      socket.emit('writing', userId, state)
    }
  },
  head () {
    return {
      title: this.usersOnline,
      titleTemplate: 'Chat | %s online'
    }
  }
}
</script>

<style scoped>
.columns {
  height: 100%;
}
</style>
