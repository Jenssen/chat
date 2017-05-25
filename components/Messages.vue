<template>
  <div class="column is-11-desktop is-offset-1-desktop">
    <div class="main">
      <div class="messages">
        <p>{{ $store.state.messages }}</p>
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
  methods: {
    emitMessage () {
      this.$emit('emitMessage', this.message)
      this.message = ''
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

    width: 100%;

    height: 100%;
    position: fixed;
    min-height: 100%;
  }
  .messages {
    padding-left: 10px;
    height: 100%;
    margin-bottom: -36px;
  }
  .footer-container {
    padding-left: -10px;
    height: 100px;
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
