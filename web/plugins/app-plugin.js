import Vue from 'vue'
import Helpers from '@/utils/helpers'

const AppPlugin = {
  install (Vue, options) {
    /* Register prototype */
    Vue.prototype._helpers = Helpers

    Vue.mixin({
      data: () => ({
        testData: 'lorem'
      }),

      methods: {
        log (txt = 'lorem ipsum') {
          console.log(txt)
        },
        setLoading (value = true) {
          this.$store.dispatch('root/setLoading', value)
        },
        successNotify (data = {}) {
          this.$notify({
            type: 'success',
            title: data.title || 'Success',
            text: data.message || 'Action successfully!'
          })
        },
        errorHandle (error) {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: (error && String(error)) || 'Something when wrong!'
          })
        }
      }
    })
  }
}

Vue.use(AppPlugin)
