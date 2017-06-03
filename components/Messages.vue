<template>
  <div class="column">
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
            <span class="tag is-danger" v-if="(hasErrors && !this.$v.message.required)">Message can't be empty</span>
            <input class="input" @input="" v-model.trim="message" ref="messageInput" type="text"  @keyup.enter="validateBeforeSubmit" placeholder="...">
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'messages',
  data: () => {
    return {
      message: ''
    }
  },
  watch: {
    setFocus () {
      // this.$refs.messageInput.focus()
    }
  },
  computed: {
    setFocus () {
      return this.$store.state.ready
    },
    hasErrors () {
      if (this.$v.message.$error) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    this.scrollToBottom()
  },
  updated () {
    this.scrollToBottom()
  },
  methods: {
    validateBeforeSubmit () {
      this.$v.message.$touch()
      if (!this.$v.message.$invalid) {
        this.scrollToBottom()
        this.$emit('emitMessage', this.message)
        this.message = ''
        this.$v.message.$reset()
      }
    },
    scrollToBottom () {
      this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight
    }
  },
  validations: {
    message: {
      required
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
  .tag {
    color: #42b983;
    background-color: #3c3c3c;
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
    padding-top: 5px;
    padding-bottom: 41px;
    height: 100%;
  }
  .footer-container {
    display: flex;
    position: fixed;
    align-content: flex-end;
    bottom: 0px;
  }
  .field {
    width: 100vw;
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
