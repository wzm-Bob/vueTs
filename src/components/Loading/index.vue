<style scoped>
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.demo-spin-col {
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
.ivu-spin-fix {
  z-index: 9999;
  position: fixed;
  top: 0px;
}
</style>
<template>
  <Spin fix>
    <Icon type="ios-loading" size="24" class="demo-spin-icon-load"></Icon>
    <div>数据加载中...</div>
  </Spin>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class Loading extends Vue {}
</script>
