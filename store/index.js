import Vuex from 'vuex'
import moment from 'moment'

const store = () => {
  return new Vuex.Store({
    state: {
      users: [],
      messages: []
    },
    getters: {
      activeUsers (state) {
        return state.users
      }
    },
    mutations: {
      addMessage (state, message) {
        state.messages.push({
          message: message,
          time: moment()
        })
      },
      addNewUser (state, activeUsers) {
        state.users = activeUsers
      }
    },
    actions: {
      nuxtServerInit (context, req) {
        console.log(req)
      }
    }
  })
}

export default store
