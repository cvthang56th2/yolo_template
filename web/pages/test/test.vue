<template>
  <div>
    test
    <button @click="test">
      123123
    </button>
    <div class="test-scss">
      <p class="p-test">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium amet iusto quibusdam ab nisi? Voluptatibus dolore doloremque ipsam provident fugit sapiente quos officiis soluta, facere dolorum perspiciatis non corrupti culpa?
      </p>
    </div>
  </div>
</template>

<style lang="scss">
  .test-scss {
    .p-test {
      color: red;
    }
  }
</style>

<script>

export default {
  methods: {
    test() {
      this.$notify({
        group: 'success',
        title: 'Important message',
        text: 'Hello user! This is a notification!'
      })
    }
  }
}
</script>
