import Vue from 'vue'

const AppPlugin = {
  install (Vue, options) {
    /* Register prototype */
    // Vue.prototype._helpers = Helpers

    Vue.mixin({
      data: () => ({
        testData: 'lorem',
        loading: false
      }),

      methods: {
        log (txt = 'lorem ipsum') {
          console.log(txt)
        },
        setLoading (value = true) {
          this.loading = value
        }
      }
    })
  }
}

Vue.use(AppPlugin)
