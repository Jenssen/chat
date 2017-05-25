import Vuex from 'vuex'

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
        state.messages.push(message)
      },
      addClients (state, clients) {
        state.clientsId = clients
        state.totalUsers = clients.length - 1
      }
    }
  })
}

export default store
