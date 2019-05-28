<template>
  <v-dialog :value="value" max-width="500px" @input="hide">
    <v-card>
      <v-card-title class="headline">
        ADD
      </v-card-title>

      <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="green darken-1" flat="flat" @click="hide">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AdminPopupDetailNews',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hide() {
      this.$emit('input', false)
    }
  }
}
</script>
