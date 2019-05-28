import Vue from 'vue'

const AppPlugin = {
  install (Vue, options) {
    /* Register prototype */
    // Vue.prototype._helpers = Helpers

    Vue.mixin({
      data: () => ({
        testData: 'lorem'
      }),

      methods: {
        log (txt = 'lorem ipsum') {
          console.log(txt)
        }
      }
    })
  }
}

Vue.use(AppPlugin)
