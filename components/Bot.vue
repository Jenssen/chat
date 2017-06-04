<template>
  <article class="media">
    <div class="media-content">
      <div class="content">
        <p>
          {{ message.message }}
        </p>
      </div>
    </div>
  </article>
</template>

<script>

export default {
  name: 'bot',
  props: ['message']

}
</script>

<style scoped>

.content {
  color: #FFDD57;
}

</style>
