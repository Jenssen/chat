import Vuex from 'vuex'
import moment from 'moment'

const store = () => {
  return new Vuex.Store({
    state: {
      users: ['Admin', 'Linda'],
      messages: [],
      clientsId: [],
      totalUsers: 0
    },
    mutations: {
      addMessage (state, message) {
        console.log('fire!')
        state.messages.push({
          message: message,
          time: moment()
        })
        console.log(state.messages)
      },
      addClients (state, clients) {
        state.clientsId = clients
        state.totalUsers = clients.length - 1
      }
    }
  })
}

export default store
