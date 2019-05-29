<template>
  <v-dialog :value="value" max-width="500px" @input="hide">
    <v-card>
      <v-card-title class="headline">
        {{ formData._id ? 'EDIT' : 'ADD' }} NEWS
      </v-card-title>

      <v-card-text>
        <v-text-field v-model="formData.title" label="Tile" />
        <v-text-field v-model="formData.description" label="Description" />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="green darken-1" flat="flat" @click="hide">
          Close
        </v-btn>
        <v-btn color="green darken-1" flat="flat" @click="save">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import NewsService from '@/components/admin/news/services.js'

export default {
  name: 'AdminPopupDetailNews',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    newsId: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    formData: {}
  }),
  watch: {
    async value (v) {
      if (v) {
        this.formData = {}
        if (this.newsId) {
          const sendData = {
            _id: this.newsId,
            params: {}
          }
          const { data } = await NewsService.getItem(sendData)
          if (data) {
            this.formData = { ...data }
          }
        }
      }
    }
  },
  methods: {
    hide() {
      this.$emit('input', false)
    },
    async save () {
      this.setLoading()
      try {
        const sendData = {
          ...this.formData
        }
        const { data } = await NewsService.save(sendData)
        this.$emit('save', data)
        this.hide()
      } catch (error) {
        console.log(error)
      }
      this.setLoading(false)
    }
  }
}
</script>
