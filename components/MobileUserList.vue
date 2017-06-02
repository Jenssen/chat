<template>
    <nav class="nav is-hidden-desktop">
      <span class="nav-toggle" v-on:click="listToggle = !listToggle">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div class="nav-right nav-menu" v-bind:class="{ 'is-active': listToggle }">
        <p class="user-header has-text-centered"><b>Users</b></p>
        <hr>
        <p v-for="user in activeUsers" class="">
          {{ user.username }}
        </p>
      </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'mobile-user-list',
  data () {
    return {
      listToggle: false
    }
  },
  computed: mapGetters(['activeUsers'])
}
</script>

<style scoped>

.nav {
  position: fixed;
  width: 100vw;
  height: 100vh;
  /* Makes it so you can click through element */
  pointer-events: none;
}
.nav-toggle:hover {
  background-color: #3c3c3c;
}
.nav-toggle span {
  background-color: #42b983;
}
@media screen and (max-width: 999px) {
  .nav-toggle {
      display: flex;
      position: absolute;
      top: 0px;
      right: 0px;
      /* Makes it so you can click on child element again */
      pointer-events:auto;
  }
}
@media screen and (max-width: 999px) {
  .nav-menu.nav-right {
    background-color: #3c3c3c;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 40vw;
    max-width: 200px;
    display: none;
    position: fixed;
  }
  .nav-menu.nav-right.is-active {
      display: block;
  }
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
p {
  text-align: left;
  padding-right: 10px;
  margin-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
