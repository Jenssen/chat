<template>
  <div class="column is-11-desktop is-offset-1-desktop">
    <div class="main">
      <div class="messages" ref="messagesContainer">
        <div v-for="message in $store.state.messages" class="message-chat">
          <p >
            {{ message.time }} : {{ message.username }} : {{ message.message }}
          </p>
        </div>
      </div>
      <div class="footer-container">
        <div class="field">
          <p class="control">
            <input class="input" type="text" v-model="message" @keyup.enter="emitMessage" placeholder="...">
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'messages',
  data: () => {
    return {
      message: ''
    }
  },
  mounted () {
    this.scrollToBottom()
  },
  updated () {
    this.scrollToBottom()
  },
  methods: {
    emitMessage () {
      this.$emit('emitMessage', this.message)
      this.message = ''
      this.scrollToBottom()
    },
    scrollToBottom () {
      this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .column {
    height: 100%;
  }
  .main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    margin: auto;
  }
  .message-chat {

  }
  .messages {
    flex: 1 1 auto;
    overflow-y: scroll;
    overflow: auto;
    flex-flow: column-reverse;
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    height: 100%;
  }
  .footer-container {
    padding-left: -10px;
    position: relative;
  }
  input {
    color: #42b983;
    border-style: hidden;
    background-color: #323232;
    border-radius: 0px;
  }
  ::-webkit-input-placeholder {
    color: #42b983;
  }
</style>
