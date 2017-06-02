<template>
  <div class="columns is-mobile is-gapless">
    <modal @newUser="addNewUser"/>
    <user-list/>
    <messages @emitMessage="sendMessage"/>
  </div>
</template>

<script>
import io from 'socket.io-client'

import Messages from '~components/Messages.vue'
import UserList from '~components/UserList.vue'
import Modal from '~components/Modal.vue'

var socket

if (process.env.NODE_ENV === 'development') {
  socket = io('127.0.0.1:3000')
} else if (process.env.NODE_ENV === 'production') {
  socket = io('jenssen.me')
}

export default {
  components: {
    UserList,
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
  },
  methods: {
    sendMessage (message) {
      socket.emit('send-message', message, socket.id)
    },
    addNewUser (username) {
      socket.emit('addNewUser', username, socket.id)
      this.$store.commit('changeStatus', true)
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
