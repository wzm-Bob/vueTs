<template>
  <div
    class="page-box"
    v-if="isShowPage"
  >
    <Page
      :current="pageObject.pageNo"
      :page-size="pageObject.pageSize"
      :total="pageObject.total"
      show-total
      show-elevator
      prev-text="上一页"
      next-text="下一页"
      @on-change="handleCurrentChange"
    >
    </Page>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
interface Classify {
  pageNo: number;
  pageSize: number;
  total: number;
}
@Component({})
export default class Pagination extends Vue {
  @Prop({
    default: () => {
      return {
        pageNo: 1,
        pageSize: 15,
        total: 0
      };
    }
  })
  private pageObject!: Classify;
  // 这里 !和可选参数?是相反的, !告诉TypeScript我这里一定有值.

  get isShowPage() {
    console.log(this.pageObject);
    debugger;
    return this.pageObject.total / this.pageObject.pageSize > 1;
  }
  handleCurrentChange(nextPage: string) {
    this.$emit("handleCurrentChange", nextPage);
  }
}
</script>

<style scoped>
.page-box {
  text-align: center;
  font-size: 14px;
  width: 100%;
}
</style>
