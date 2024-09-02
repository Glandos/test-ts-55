<template>
  <div id="app">
    <v-app id="test-ts-55">
      <span>Hello test</span>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class App extends Vue {
  get title() {
    const title: string = this.$t('hello')

    return title
  }
}
</script>

<style lang="scss"></style>