<template>
  <div class="modal" v-bind:class="{ 'is-active': isActive }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="content">
        <h1 class="has-text-centered">Please enter desired username</h1>
      </div>
      <nav class="level">
        <div class="level-item">
          <form @submit.prevent="validateBeforeSubmit">
            <div class="field has-addons">
              <p class="control">
                <input v-model.trim="userName" class="input" type="text">
              </p>
              <p class="control">
                <button class="button is-primary" type="submit">Enter</button>
              </p>
            </div>
          </form>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  data: () => {
    return {
      isActive: true,
      userName: ''
    }
  },
  methods: {
    validateBeforeSubmit () {
      this.isActive = false
      this.$emit('newUser', this.userName)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .modal-content {
    width: 450px;
  }
  input {
    color: #42b983;
    border-style: hidden;
    background-color: #323232;
    border-radius: 0px;
    width: 225px;
  }
  h1 {
    color: #42b983;
  }
  .button {
    color: #42b983;
    background-color: #202020;
  }
  .button:hover {
    color: #202020;
    background-color: #42b983;
  }
</style>
