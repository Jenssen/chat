<template>
  <div class="column is-11-desktop is-offset-1-desktop">
    <div class="main">
      <div class="messages" ref="messagesContainer">
        <div v-for="(message, index) in $store.state.messages" class="message-chat">
          <hr v-if="index != 0">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ message.username }}</strong> <small> {{ message.time }}</small>
                  <br>
                  {{ message.message }}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
      <div class="footer-container">
        <div class="field">
          <p class="control">
            <input class="input" ref="messageInput" type="text" v-model="message" @keyup.enter="emitMessage" placeholder="...">
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
  watch: {
    setFocus () {
      this.$refs.messageInput.focus()
    }
  },
  computed: {
    setFocus () {
      return this.$store.state.ready
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
      this.scrollToBottom()
      this.$emit('emitMessage', this.message)
      this.message = ''
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
    flex-wrap: wrap;
    word-break: break-all
  }
  article {

  }
  .messages {
    flex: 1 1 auto;
    overflow-y: scroll;
    overflow-x: hidden;
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
  .content {
    color: #42b983;
  }
  .content strong {
    color: #42b983;
  }
  hr {
    background-color: #3c3c3c;
    margin: 3px 0px 3px 0px;
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
