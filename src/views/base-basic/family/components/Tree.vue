<template>
  <div
    class="tree-wrap"
    ref="scrollWrap"
  >
    <div class="tree-content">
      <Tree
        :data="areaData"
        :load-data="loadData"
        :render="renderContent"
        ref="tree"
      ></Tree>
    </div>
  </div>
</template>

<script lang="ts">
import { CreateElement } from "Vue";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { getAdministrativeTree } from "@/api/basic";
import { UserModule } from "../../../../store/modules/user";
@Component({})
export default class ComTree extends Vue {
  @Prop({ required: false }) private areaCode!: string;
  @Prop({ required: false }) private dataYear!: string;
  //：非null和？非undefined的类型断言
  @Prop({ required: false }) private listate!: string;
  private rootAreaCode: string = UserModule.areaCode;
  private areaData: any[] = [];
  mounted() {
    this.getInitArea(
      this.rootAreaCode,
      this.dataYear,
      this.listate,
      (list: any) => {
        this.areaData = list;
      }
    );
  }
  @Watch("listate")
  private onListateChange() {
    this.getInitArea(
      this.rootAreaCode,
      this.dataYear,
      this.listate,
      (list: any) => {
        this.areaData = list;
      }
    );
  }
  @Watch("dataYear")
  private onDataYearChange() {
    this.getInitArea(
      this.rootAreaCode,
      this.dataYear,
      this.listate,
      (list: any) => {
        this.areaData = list;
      }
    );
  }
  private loadData(item: any, callback: Function) {
    this.getChildArea(item.id, this.dataYear, this.listate, callback);
  }
  private async getInitArea(
    areaCode: string,
    dataYear: string,
    listate: string,
    callback: Function
  ) {
    if (areaCode == this.areaCode) {
      const { data } = await getAdministrativeTree({
        areaCode: areaCode,
        listate: listate,
        dataYear: dataYear
      });
      callback(data.data);
    } else {
      const res: any = getAdministrativeTree({
        areaCode: areaCode,
        openNode: this.areaCode,
        listate: listate,
        dataYear: dataYear
      });
      callback(res.data.data);
    }
  }
  private async getChildArea(
    areaCode: string,
    dataYear: string,
    listate: string,
    callback: Function
  ) {
    const { data } = await getAdministrativeTree({
      areaCode: this.rootAreaCode,
      parentCode: areaCode,
      listate: listate,
      dataYear: dataYear
    });
    callback(data.data);
  }
  private renderContent(h: CreateElement, { root, node, data }: any) {
    let title = data.title.split("_");
    let colorValue = "#515a6e";
    if (this.listate == "0") {
      colorValue = "#f00";
    } else if (
      this.listate == "2" ||
      this.listate == "-2" ||
      this.listate == "4"
    ) {
      colorValue = "#f38b25";
    } else if (this.listate == "1") {
      colorValue = "#54cb54";
    }
    return h(
      "span",
      {
        class: "ivu-tree-title",
        style: {
          cursor: "pointer",
          border: node.node.selected
            ? "1px solid #0ba0fd"
            : "1px solid transparent",
          backgroundColor: node.node.selected ? "#d5e8fc" : "#fff"
        },
        on: {
          click: () => {
            this.onSelectChange(data);
            this.onSelection(root, node);
          }
        }
      },
      [
        h("span", title[0]),
        h(
          "span",
          {
            style: {
              color: colorValue,
              marginRight: "12px"
            }
          },
          title[1]
        )
      ]
    );
  }
  private onSelectChange(data: any) {
    this.$emit("onSelectChange", data);
  }
  private onSelection(root: any[], node: any) {
    if (!node.node.selected) {
      (this.$refs.tree as any).handleSelect(node.nodeKey);
    }
  }
}
</script>
<style lang="scss" scoped>
.layout {
  background: #fff;
  position: relative;
  border-radius: 4px;
  margin: 10px;
  overflow: hidden;
}

.select-input-width {
  width: 80%;
}
.ivu-layout {
  background: #fff;
  padding: 2px 0;
}
.layout {
  .ivu-tree {
    ul {
      li {
        margin: 2px 0;
      }
    }
    .ivu-tree-title {
      padding: 4px;
      border: 1px solid transparent;
    }
    .ivu-tree-arrow {
      position: relative;
      i {
        transition: all 0s ease-in-out;
      }
      .ivu-icon-ios-arrow-forward:before {
        content: "";
        position: absolute;
        width: 14px;
        height: 14px;
        top: 6px;
        left: -1px;
        background-image: url(~@/assets/img/zTree/zTreeStandard.png);
        background-position: -19px -142px;
      }
    }
    .ivu-tree-arrow-open {
      i {
        transform: rotate(0deg);
      }
      .ivu-icon-ios-arrow-forward:before {
        content: "";
        width: 14px;
        height: 14px;
        position: absolute;
        top: -5px;
        left: -8px;
        background-image: url(~@/assets/img/zTree/zTreeStandard.png);
        background-position: -63px -141px;
      }
    }
    .ivu-tree-title-selected,
    .ivu-tree-title-selected:hover {
      border: 1px solid #0ba0fd;
    }
  }
}
</style>
