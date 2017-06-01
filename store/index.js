import Vuex from 'vuex'
import moment from 'moment'

const store = () => {
  return new Vuex.Store({
    state: {
      users: [],
      messages: [],
      ready: false
    },
    getters: {
      activeUsers (state) {
        return state.users
      },
      activeUsersNumber (state) {
        if (state.users.length) {
          return state.users.length
        } else {
          return '0'
        }
      }
    },
    mutations: {
      changeStatus (state, status) {
        state.ready = status
      },
      addMessage (state, message) {
        state.messages.push({
          message: message.message,
          time: moment().format('HH:mm:ss'),
          username: message.username
        })
      },
      addNewUser (state, activeUsers) {
        state.users = activeUsers
      }
    }
  })
}

export default store
