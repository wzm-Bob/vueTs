<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "App",
  components: {}
  //这里放name components filters等等
})
export default class extends Vue {

}
</script>

<style lang="scss">
@import "./assets/css/basics.scss";
@import "./assets/css/theme.scss";
</style>
