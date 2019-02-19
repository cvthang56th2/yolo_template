<template>
  <div class="hello">
    test
    <div v-for="(item, index) in arrayTest" :key="`item-${index}`">
      <div>
        {{item._id}}: {{item.name}} - {{item.createdAt}}
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: () => ({
    arrayTest: []
  }),
  methods: {
    async fetchData () {
      this.arrayTest = []
    }
  },
  created () {{
    this.fetchData()
  }}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
