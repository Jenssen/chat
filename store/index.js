import Vuex from 'vuex'

const store = () => {
  return new Vuex.Store({
    state: {
      users: ['Admin', 'Linda'],
      messages: [],
      clients: []
    },
    mutations: {
      addMessage (state, message) {
        state.messages.push(message)
      },
      addClients (state, clients) {
        state.clients = clients
      }
    }
  })
}

export default store
