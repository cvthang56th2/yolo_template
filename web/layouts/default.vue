<template>
  <v-app>
    <div v-if="loadingPage" class="loading-page">
      <v-progress-circular :size="50" color="primary" indeterminate />
    </div>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-tile v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="clipped" fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
    <notifications group="success" position="bottom right" />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'apps',
          title: 'Home',
          to: '/'
        }
      ],
      miniVariant: false,
      title: 'FRONT LAYOUT'
    }
  },

  computed: {
    ...mapGetters({
      loadingPage: 'root/loadingPage'
    })
  }
}
</script>

<style lang="scss">
.loading-page {
  width: 100vw;
  height: 100vh;
  position: absolute
}
</style>
