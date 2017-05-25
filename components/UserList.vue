<template>
  <div class="column is-1 is-hidden-touch">
    <div class="main">
      <p class="user-header has-text-centered"><b>Users</b></p>
      <hr>
      <p>{{ $store.state.totalUsers }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-list'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .column {
    border-right-style: solid;
    height: 100%;
  }
  .main {
    background-color: #3c3c3c;

    height: 100%;
    width: inherit;
    position: absolute;
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
  }
  hr {
    margin: 10px;
    background-color: #42b983;
  }
</style>
