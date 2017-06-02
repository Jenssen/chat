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
                <input @input="$v.userName.$touch()" v-model.trim="userName" ref="userName" class="input" type="text">
              </p>
              <p class="control">
                <button class="button is-primary" type="submit">Enter</button>
              </p>
            </div>
            <p class="help is-danger" v-if="(hasErrors && !this.$v.userName.required)">Field is required</p>
            <p class="help is-danger" v-if="(hasErrors && !this.$v.userName.maxLength)">Username can max have {{$v.userName.$params.maxLength.max}} letters.</p>
            <p class="help is-danger" v-if="(hasErrors && !this.$v.userName.checkExistingUsers)">Username is already taken.</p>
            <p class="help is-danger" v-if="(hasErrors && !this.$v.userName.checkForIlligalCharacters)">Username can only have alphabetic characters, numbers, dashes or underscores</p>
          </form>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'

function checkExistingUsers () {
  if (this.usersOnline.map(x => x.username.toLowerCase()).indexOf(this.userName.toLowerCase()) < 0) {
    return true
  } else {
    return false
  }
}

function checkForIlligalCharacters () {
  if (/^[a-zA-Z0-9_-]*$/.test(this.userName)) {
    return true
  } else {
    return false
  }
}

export default {
  name: 'modal',
  data: () => {
    return {
      isActive: true,
      userName: ''
    }
  },
  computed: {
    hasErrors () {
      if (this.$v.userName.$error) {
        return true
      } else {
        return false
      }
    },
    usersOnline () {
      return this.$store.getters.activeUsers
    }
  },
  mounted () {
    this.$refs.userName.focus()
  },
  methods: {
    validateBeforeSubmit () {
      if (!this.$v.userName.$invalid) {
        this.isActive = false
        this.$emit('newUser', this.userName)
      }
    }
  },
  validations: {
    userName: {
      required,
      maxLength: maxLength(25),
      checkExistingUsers,
      checkForIlligalCharacters
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
