<template>
  <div class="column is-1 is-hidden-touch">
    <div class="main">
      <p class="user-header"><b>Users</b></p>
      <hr>
      <p v-for="user in activeUsers" class="">
        {{ user.username }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'user-list',
  computed: mapGetters(['activeUsers'])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .column {
    border-right-style: solid;
    height: 100%;
    min-width: 200px;
  }
  .main {
    background-color: #3c3c3c;
    height: 100%;
    width: inherit;
    position: absolute;
    min-width: 200px;
  }
  p {
    padding-right: 10px;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .user-header {
    margin-top: 10px;
    font-size: 24px;
    text-align: center;
  }
  hr {
    margin: 10px;
    background-color: #42b983;
  }
</style>
