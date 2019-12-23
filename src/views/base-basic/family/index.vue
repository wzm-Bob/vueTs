<template>
  <div class="layout poorFamilyList">
    <Layout>
      <Layout>
        <Sider hide-trigger :style="{ background: '#fff' }">
          <com-tree
            :areaCode="areaCode"
            :dataYear="dataYear"
            :listate="listate"
            v-on:onSelectChange="onSelectChange"
          ></com-tree>
        </Sider>
        <Layout>
          <Content :style="{ paddingLeft: '12px' }">
            <Content>
              <household-Tabs
                :areaCode="areaCode"
                :dataYear="dataYear"
                :listate="listate"
                v-on:poorState="poorState"
              ></household-Tabs>
            </Content>
            <Content>
              <Collapse
                v-model="collapseVal"
                :style="{ margin: '11px auto' }"
                @on-change="changrTel()"
              >
                <div class="first-level-title">
                  <i></i><span>高级搜索</span>
                </div>
                <div class="conditionBtn">
                  <button
                    @click="handleReset('PoorFamilyQuery')"
                    style="marginRight:12px;"
                    class="tableBtn resetBtn"
                  >
                    重置条件
                  </button>
                  <button
                    @click="handleQuery('PoorFamilyQuery')"
                    class="tableBtn queryBtn"
                  >
                    查询
                  </button>
                </div>
                <Panel>
                  <b></b><span v-if="isShowTel">展开设置筛选条件</span>
                  <span v-else>收起设置筛选条件</span>
                  <template slot="content">
                    <Form ref="PoorFamilyQuery" :model="PoorFamilyQuery">
                      <FormItem>
                        <Row>
                          <Col span="12">
                            <FormItem label="贫困户属性：" prop="nature">
                              <Select
                                v-model="PoorFamilyQuery.nature"
                                class="select-input-width"
                                clearable
                              >
                                <Option
                                  v-for="(item, index) in dict.nature"
                                  :key="index"
                                  :value="item.dictValue"
                                  >{{ item.dictName }}
                                </Option>
                              </Select>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="主要致贫原因：" prop="mainReason">
                              <Select
                                v-model="PoorFamilyQuery.mainReason"
                                class="select-input-width"
                                clearable
                              >
                                <Option
                                  v-for="(item, index) in dict.mainReason"
                                  :key="index"
                                  :value="item.dictValue"
                                  >{{ item.dictName }}
                                </Option>
                              </Select>
                            </FormItem>
                          </Col>
                        </Row>
                      </FormItem>
                      <FormItem>
                        <Row>
                          <Col span="12">
                            <FormItem label="户 主 姓 名：" prop="houseMaster">
                              <Input
                                v-model="PoorFamilyQuery.houseMaster"
                                class="select-input-width"
                              ></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="户主证件号码：" prop="identityNo">
                              <Input
                                v-model="PoorFamilyQuery.identityNo"
                                class="select-input-width"
                              ></Input>
                            </FormItem>
                          </Col>
                        </Row>
                      </FormItem>
                      <FormItem>
                        <Row>
                          <Col span="12">
                            <FormItem label="成 员 姓 名：" prop="houseMember">
                              <Input
                                v-model="PoorFamilyQuery.houseMember"
                                class="select-input-width"
                              ></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem
                              label="成员证件号码："
                              prop="cyidentityNo"
                            >
                              <Input
                                v-model="PoorFamilyQuery.cyidentityNo"
                                class="select-input-width"
                              ></Input>
                            </FormItem>
                          </Col>
                        </Row>
                      </FormItem>
                      <FormItem>
                        <Row>
                          <Col span="12">
                            <FormItem
                              label="健 康 状 况： "
                              prop="healthCondition"
                            >
                              <Select
                                v-model="PoorFamilyQuery.healthCondition"
                                class="select-input-width"
                                clearable
                              >
                                <Option
                                  v-for="(item, index) in dict.healthCondition"
                                  :key="index"
                                  :value="item.dictValue"
                                >
                                  {{ item.dictName }}
                                </Option>
                              </Select>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem
                              label=" 劳 动 能 力 ："
                              prop="laborAbility"
                            >
                              <Select
                                v-model="PoorFamilyQuery.laborAbility"
                                class="select-input-width"
                                clearable
                              >
                                <Option
                                  v-for="(item, index) in dict.laborAbility"
                                  :key="index"
                                  :value="item.dictValue"
                                >
                                  {{ item.dictName }}
                                </Option>
                              </Select>
                            </FormItem>
                          </Col>
                        </Row>
                      </FormItem>
                      <FormItem>
                        <Row>
                          <Col span="12">
                            <FormItem label=" 民 族： " prop="mz">
                              <Select
                                v-model="PoorFamilyQuery.mz"
                                class="select-input-width"
                                clearable
                              >
                                <Option
                                  v-for="(item, index) in dict.mz"
                                  :key="index"
                                  :value="item.dictValue"
                                >
                                  {{ item.dictName }}
                                </Option>
                              </Select>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label=" 在 校 生 ：" prop="zxs">
                              <Select
                                v-model="PoorFamilyQuery.zxs"
                                class="select-input-width"
                                clearable
                              >
                                <Option
                                  v-for="(item, index) in dict.zxs"
                                  :key="index"
                                  :value="item.dictValue"
                                >
                                  {{ item.dictName }}
                                </Option>
                              </Select>
                            </FormItem>
                          </Col>
                        </Row>
                      </FormItem>
                      <FormItem>
                        <Row>
                          <Col span="12">
                            <FormItem label="是否享受脱贫措施：" prop="wdtp">
                              <Select
                                v-model="PoorFamilyQuery.wdtp"
                                style="width: 80%;"
                                clearable
                              >
                                <Option value="1">是</Option>
                                <Option value="0">否</Option>
                              </Select>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="帮扶责任人姓名：" prop="bfzrrName">
                              <Input
                                v-model="PoorFamilyQuery.bfzrrName"
                                class="select-input-width"
                              ></Input>
                            </FormItem>
                          </Col>
                        </Row>
                      </FormItem>
                    </Form>
                  </template>
                </Panel>
              </Collapse>
            </Content>
            <Content>
              <Table
                :columns="poorColumns"
                :data="poorData"
                class="familyTable"
              >
                <template slot-scope="{ row }" slot="operation">
                  <div>
                    <button
                      class="tableBtn detailsBtn"
                      style="margin-right: 5px;"
                      @click="jumpVillageDetial(row)"
                    >
                      查看
                    </button>
                  </div>
                </template>
              </Table>
              <Pagination
                :pageObject="pageObject"
                @handleCurrentChange="handlePage"
                class="familyPage"
              />
            </Content>
          </Content>
        </Layout>
      </Layout>
    </Layout>
    <Loading v-if="spinShow" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import ComTree from "./components/Tree.vue";
import Pagination from "@/components/Pagination/index.vue";
import HouseholdTabs from "./components/HouseholdTabs.vue";
import Loading from "@/components/Loading/index.vue";
import { getPoorFamilyList } from "@/api/basic";
import { getDictType } from "@/api/dict";
import { DictTypeId } from "@/utils/common-dict-id";
import { UserModule } from "@/store/modules/user";
import { PublicDictModule } from "@/store/modules/public-dict";
interface IDictObj {
  nature: { [type: string]: any }[];
  mainReason: { [type: string]: any }[];
  healthCondition: { [type: string]: any }[];
  laborAbility: { [type: string]: any }[];
  mz: { [type: string]: any }[];
  zxs: { [type: string]: any }[];
}
interface IPoorFamilyQueryObj {
  dataYear: string;
  areaCode: string;
  listate: string;
  nature: any;
  mainReason: any;
  houseMaster: string;
  identityNo: string;
  houseMember: string;
  cyidentityNo: string;
  healthCondition: any;
  laborAbility: any;
  tpXszc: string;
  isSr: string;
  mz: any;
  zxs: any;
  wdtp: string;
  bfzrrName: string;
  pageNo: number;
}
@Component({
  components: {
    ComTree,
    Pagination,
    HouseholdTabs,
    Loading
  }
})
export default class Family extends Vue {
  private areaCode: string = UserModule.areaCode;
  private dataYear: string = UserModule.currYear;
  private listate: string = "";
  private spinShow: boolean = false;
  private isShowTel: boolean = true;
  private poorColumns: any[] = [
    {
      title: "序号",
      type: "index",
      align: "center",
      width: 80,
      indexMethod: (row: any) => {
        return row._index + 1 + this.pageObject.start;
      }
    },
    {
      title: "户主姓名",
      key: "aad001",
      align: "center",
      minWidth: 10
    },
    {
      title: "贫困户属性",
      align: "center",
      minWidth: 10,
      render: (h: any, params: any) => {
        if (
          params.row.aad107 == "01" &&
          (params.row.aah009 == "0" || params.row.aah009 == "-1")
        ) {
          return h("div", ["一般贫困户"]);
        } else if (params.row.aad107 == "02" && params.row.aah009 == "0") {
          return h("div", ["低保贫困户"]);
        } else if (
          params.row.aad107 == "03" &&
          (params.row.aah009 == "1" || params.row.aah009 == "-1")
        ) {
          return h("div", ["特困供养户"]);
        } else if (
          params.row.aad107 == "01" &&
          (params.row.aah009 == "1" || params.row.aah009 == "-1")
        ) {
          return h("div", ["一般农户"]);
        } else if (
          params.row.aad107 == "02" &&
          (params.row.aah009 == "1" || params.row.aah009 == "-1")
        ) {
          return h("div", ["低保农户"]);
        } else if (params.row.aad107 == "03" && params.row.aah009 == "0") {
          return h("div", ["特困供养贫困户"]);
        } else {
          return h("div", [""]);
        }
      }
    },
    {
      title: "主要致贫原因",
      key: "aae960",
      align: "center",
      minWidth: 10
    },
    {
      title: "成员人数",
      key: "member_num",
      align: "center",
      width: 100
    },
    {
      title: "贫困户所在地",
      align: "center",
      minWidth: 50,
      render: (h: any, params: any) => {
        return h("div", [
          params.row.county + "-" + params.row.town + "-" + params.row.village
        ]);
      }
    },
    {
      title: "操作",
      align: "center",
      minWidth: 10,
      slot: "operation"
    }
  ];
  private dict: IDictObj = {
    nature: [],
    mainReason: [],
    healthCondition: [],
    laborAbility: [],
    mz: [],
    zxs: []
  };
  private poorData: any[] = [];
  private iconJson: any = {
    "0": require("@/assets/img/basic/red.png"),
    "1": require("@/assets/img/basic/green.png")
  };
  private PoorFamilyQuery: IPoorFamilyQueryObj = {
    dataYear: "",
    areaCode: "",
    listate: "",
    nature: [],
    mainReason: [],
    houseMaster: "",
    identityNo: "",
    houseMember: "",
    cyidentityNo: "",
    healthCondition: [],
    laborAbility: [],
    tpXszc: "",
    isSr: "",
    mz: [],
    zxs: [],
    wdtp: "",
    bfzrrName: "",
    pageNo: 1
  };
  private pageObject: { [type: string]: number } = {
    pageNo: 1,
    pageSize: PublicDictModule.pageSize,
    total: 0,
    start: 0
  };
  private treeHeight: string = "";
  private collapseVal: string = "1";
  mounted() {
    this.selectDictValue(DictTypeId.nature, "nature");
    this.selectDictValue(DictTypeId.mainReason, "mainReason");
    this.selectDictValue(DictTypeId.healthCondition, "healthCondition");
    this.selectDictValue(DictTypeId.laborAbility, "laborAbility");
    this.selectDictValue(DictTypeId.mz, "mz");
    this.selectDictValue(DictTypeId.zxs, "zxs");
    this.PoorFamilyQuery.areaCode = this.areaCode;
    this.PoorFamilyQuery.dataYear = this.dataYear;
    this.getPoorFamilyList(this.PoorFamilyQuery);
  }
  @Watch("listate")
  onListateChange() {
    (this.$refs["PoorFamilyQuery"] as any).resetFields();
    this.pageObject.pageNo = 1;
    this.PoorFamilyQuery.pageNo = 1;
    this.PoorFamilyQuery.listate = this.listate;
    this.getPoorFamilyList(this.PoorFamilyQuery);
  }
  @Watch("areaCode")
  onAreaCodeChange() {
    (this.$refs["PoorFamilyQuery"] as any).resetFields();
    this.pageObject.pageNo = 1;
    this.PoorFamilyQuery.pageNo = 1;
    this.PoorFamilyQuery.areaCode = this.areaCode;
    this.getPoorFamilyList(this.PoorFamilyQuery);
  }
  @Watch("dataYear")
  onDataYearChange() {
    (this.$refs["PoorFamilyQuery"] as any).resetFields();
    this.pageObject.pageNo = 1;
    this.PoorFamilyQuery.pageNo = 1;
    this.PoorFamilyQuery.dataYear = this.dataYear;
    this.getPoorFamilyList(this.PoorFamilyQuery);
  }

  private onSelectChange(item: any) {
    this.areaCode = item.id;
  }
  //下一页
  private handlePage(nextPage: number) {
    this.pageObject.pageNo = nextPage;
    this.PoorFamilyQuery.pageNo = nextPage;
    this.getPoorFamilyList(this.PoorFamilyQuery);
  }
  //查询条件
  private handleQuery() {
    this.pageObject.pageNo = 1;
    this.PoorFamilyQuery.pageNo = 1;
    this.getPoorFamilyList(this.PoorFamilyQuery);
  }
  //重置条件
  private handleReset(name: string) {
    (this.$refs[name] as any).resetFields();
  }
  //修改
  private handleEdit() {}
  private poorState(listate: string, year: string) {
    this.listate = listate;
    this.dataYear = year;
  }
  private async getPoorFamilyList(PoorFamilyQuery: any) {
    //添加遮罩层
    this.spinShow = true;
    const { data } = await getPoorFamilyList(PoorFamilyQuery);
    if (data.data) {
      this.poorData = data.data.data;
      this.pageObject.total = data.data.totalCount;
      this.pageObject.start = data.data.start;
    }

    //取消遮罩层
    this.spinShow = false;
  }
  private async selectDictValue(type: string, valueName: string) {
    const { data } = await getDictType({ typeId: type });
    if (valueName == "nature") {
      this.dict.nature = data.data;
    } else if (valueName == "healthCondition") {
      this.dict.healthCondition = data.data;
    } else if (valueName == "laborAbility") {
      this.dict.laborAbility = data.data;
    } else if (valueName == "mainReason") {
      this.dict.mainReason = data.data;
    } else if (valueName == "mz") {
      this.dict.mz = data.data;
    } else if (valueName == "zxs") {
      this.dict.zxs = data.data;
    }
  }
  //单击跳转详情
  private jumpVillageDetial(data: any) {
    this.$router.push({
      name: "basic_details",
      params: {
        areaCode: this.areaCode,
        dataYear: data.year,
        listate: this.PoorFamilyQuery.listate,
        aaa001: data.aaa001,
        nature: this.PoorFamilyQuery.nature,
        mainReason: this.PoorFamilyQuery.mainReason,
        houseMaster: this.PoorFamilyQuery.houseMaster,
        identityNo: this.PoorFamilyQuery.identityNo,
        houseMember: this.PoorFamilyQuery.houseMember,
        cyidentityNo: this.PoorFamilyQuery.cyidentityNo,
        healthCondition: this.PoorFamilyQuery.healthCondition,
        laborAbility: this.PoorFamilyQuery.laborAbility,
        tpXszc: this.PoorFamilyQuery.tpXszc,
        isSr: this.PoorFamilyQuery.isSr,
        mz: this.PoorFamilyQuery.mz,
        zxs: this.PoorFamilyQuery.zxs,
        wdtp: this.PoorFamilyQuery.wdtp,
        bfzrrName: this.PoorFamilyQuery.bfzrrName,
        /*  pageNo: this.PoorFamilyQuery.pageNo, */
        rowno: data.rowno
      }
    });
  }
  //折叠面板
  private changrTel() {
    this.isShowTel = !this.isShowTel;
  }
}
</script>
<style lang="scss">
.poorFamilyList {
  background: #fff;
  position: relative;
  border-radius: 4px;
  margin: 10px;
  overflow: hidden;
  .ivu-layout-content {
    position: relative;
  }
  .ivu-collapse {
    background: #fff;
    position: relative;
    border-color: transparent;
    .conditionBtn {
      position: absolute;
      top: 0;
      right: 10px;
      .ivu-btn-default {
        margin-right: 10px;
        border: solid 1px #dcdee2;
        border-radius: 4px;
        font-size: 12px;
        color: #333;
        background: #f0f0f0;
      }
      .ivu-btn-default:hover {
        background: #e0e0e0;
      }
      .ivu-btn-default,
      .ivu-btn-primary {
        margin-right: 12px;
        height: 26px;
        line-height: 24px;
        padding: 0 14px;
      }
    }
    .ivu-collapse-header {
      position: absolute;
      top: 0px;
      right: 158px;
      b {
        width: 14px;
        height: 14px;
        display: inline-block;
        vertical-align: middle;
        background: url(~@/assets/img/base/settings.png);
        margin-right: 4px;
      }
      span {
        display: inline-block;
        vertical-align: middle;
        height: 14px;
        line-height: 14px;
      }
    }
    .ivu-collapse-content {
      margin-top: 10px;
      border: 1px solid #dcdee2;
    }
  }
  .ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
    padding: 0px 18px 0 10px;
    height: 26px;
    line-height: 24px;
    display: block;
    border: solid 1px #dcdee2;
    border-radius: 4px;
    font-size: 12px;
    color: #333;
    background: #f0f0f0;
  }
  .ivu-collapse > .ivu-collapse-item > .ivu-collapse-header > i {
    margin-right: 0px;
    position: absolute;
    top: 6px;
    right: 4px;
  }
  .ivu-collapse
    > .ivu-collapse-item.ivu-collapse-item-active
    > .ivu-collapse-header
    > i {
    transform: rotate(180deg);
  }
  .ivu-collapse > .ivu-collapse-item > .ivu-collapse-header:hover {
    background: #e0e0e0;
  }
  .ivu-collapse > .ivu-collapse-item {
    border: none;
  }
  .first-level-title {
    font-size: 16px;
    color: #2d8cf0;
    padding: 4px 0 4px 30px;
    border-bottom: 1px solid #2d8cf0;
  }
  .first-level-title::before {
    content: "";
    position: absolute;
    top: 7px;
    left: 6px;
    width: 20px;
    height: 18px;
    background: url(~@/assets/img/base/gaoji-sou.png);
  }
  .ivu-btn-small {
    border-radius: 4px;
    padding: 1px 15px;
    border: 1px solid #2d8cf0;
    color: #2d8cf0;
    cursor: pointer;
    background: #fff;
  }
  .ivu-btn-small:hover {
    opacity: 0.8;
  }
  .ivu-btn:focus {
    box-shadow: 0 0 0 0px rgba(45, 140, 240, 0);
  }
  .ivu-icon-ios-arrow-forward:before {
    content: "\F116";
  }
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
        width: 15px;
        height: 14px;
        position: absolute;
        top: -5px;
        left: -8px;
        background-image: url(~@/assets/img/zTree/zTreeStandard.png);
        background-position: -62px -141px;
      }
    }
    .ivu-tree-title-selected,
    .ivu-tree-title-selected:hover {
      border: 1px solid #0ba0fd;
    }
  }
  .select-input-width {
    width: 80%;
  }
  .ivu-layout {
    background: #fff;
    padding: 2px 0;
  }
  .ivu-layout-sider {
    border: 1px solid #dcdee2;
    padding-left: 8px;
    max-height: 772px;
    overflow-y: auto;
  }
  .familyTable {
    // margin-top: 40px;
    .ivu-table td,
    .ivu-table th {
      height: 40px;
    }
  }
  .familyPage {
    padding-top: 10px;
  }
  .ivu-form-item {
    margin-bottom: 6px;
  }
  .ivu-collapse-content > .ivu-collapse-content-box {
    padding-bottom: 10px;
  }
  .ivu-form-item-label {
    width: 120px;
  }
}
</style>
