<template>
  <div class="column">
    <div class="main">
      <div class="messages" ref="messagesContainer">
        <div v-for="(message, index) in $store.state.messages" class="message-chat">
          <hr v-if="index != 0">
          <article class="media" v-if="!message.isBot">
            <div class="media-content">
              <div class="content">
                <small>{{ message.time }} </small><strong>{{ message.username }}</strong>
                <p>
                  {{ message.message }}
                </p>
              </div>
            </div>
          </article>
          <bot v-else-if="message.isBot" v-bind:message="message"/>
        </div>
      </div>
      <div class="footer-container">
        <div class="field">
          <p class="control">
            <span class="tag is-danger" v-if="(hasErrors && !this.$v.message.required)">Message can't be empty</span>
            <span v-if="writing" class="tag">{{ writing }} is writing...</span>
            <input class="input" @input="isWriting" v-model.trim="message" ref="messageInput" type="text"  @keyup.enter="validateBeforeSubmit" placeholder="...">
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import socket from '~plugins/socket.io.js'
import { required } from 'vuelidate/lib/validators'

import Bot from '~components/Bot.vue'

export default {
  name: 'messages',
  components: {
    Bot
  },
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
    },
    hasErrors () {
      if (this.$v.message.$error) {
        return true
      } else {
        return false
      }
    },
    writing () {
      let writers = this.$store.state.writing.filter(e => e.userId !== socket.id)
      writers = writers.map(e => e.username).join(', ')
      if (writers.length > 0) {
        return writers
      } else {
        return null
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
        this.$emit('writing', socket.id, false)
        this.message = ''
        this.$v.message.$reset()
      }
    },
    scrollToBottom () {
      this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight
    },
    isWriting () {
      this.$emit('writing', socket.id, true)
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
    background-color: #323232;
    border-radius: 0px;
    padding: 0px 5px 0px 5px;
    display: inline-block;
    border-color: #42b983;
    border-style: solid;
    border-width: 1px;
    margin-right: 1px;
  }
  .is-danger {
    border-color: #FF3860;
    color: #FF3860;
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
    height: calc(100% - 36px);
    width: 100vw;
    position: absolute;
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
