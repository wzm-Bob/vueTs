<template>
  <div class="resetPassword">
    <div class="content changePasswordHead">
      <div class="h-left">{{ projectName }}</div>
      <div class="h-right">
        <div class="back-home" @click="closeReset">
          <span></span>
        </div>
        <div class="text">
          <span></span>
        </div>
      </div>
    </div>
    <!--  <div class="main">
      <div class="title fn-clear">
        <h4>系统用户</h4>
        <button @click="closeReset">返回</button>
      </div>
      <div class="passwordTable">
        <Collapse @on-change="changeShow">
          <Panel class="PW-tit">
            <h5>高级搜索</h5>
            <div class="but">
              <span>{{ isShow.name }}</span>
              <i>{{ isShow.icon }}</i>
            </div>
            <div slot="content">
              <Form ref="paramList" :model="paramList">
                <div class="label">请选择地区：</div>
                <area-chose class="area" ref="areaMessage"></area-chose>
                <FormItem>
                  <Row>
                    <Col span="12">
                      <FormItem label="用户名称：" prop="userName">
                        <Input
                          placeholder="请输入"
                          class="select-input-width"
                          v-model="paramList.userName"
                        ></Input>
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem label="登录账号：" prop="loginName">
                        <Input
                          placeholder="请输入"
                          class="select-input-width"
                          v-model="paramList.loginName"
                        ></Input>
                      </FormItem>
                    </Col>
                  </Row>
                </FormItem>
                <div class="conditionBtn">
                  <button
                    @click="handleReset('paramList')"
                    :style="{}"
                    class="tableBtn resetBtn"
                    style="marginRight:12px;"
                  >
                    重置条件
                  </button>
                  <button
                    type="primary"
                    @click="handleQuery('paramList')"
                    :style="{}"
                    class="tableBtn queryBtn"
                  >
                    查询
                  </button>
                </div>
              </Form>
            </div>
          </Panel>
        </Collapse>
        <Table :columns="poorColumns" :data="userData" class="familyTable">
        </Table>
        <page
          :pageObject="pageObject"
          @handleCurrentChange="handlePage"
          class="familyPage"
        ></page>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { PublicDictModule } from "../../../store/modules/public-dict";
@Component({
  name: "resetPassword"
})
export default class extends Vue {
  get projectName() {
    return PublicDictModule.projectName;
  }
  private closeReset() {
    this.$emit("closeReset");
  }
}
</script>
<style lang="scss">
.resetPassword {
  .ivu-icon {
    display: none;
  }
  .ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
    padding: 0 16px;
  }
  .ivu-collapse {
    background: #2d8cf0;
  }
  .ivu-select-dropdown {
    z-index: 1000;
  }
  .ivu-form .ivu-form-item-label,
  .ivu-form .ivu-input-wrapper {
    display: inline-block;
    vertical-align: middle;
  }
  .ivu-input-wrapper {
    width: 80%;
  }
}
</style>
<style lang="scss" scoped>
.resetPassword {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  .h-right {
    .back-home,
    .text {
      display: inline-block;
      vertical-align: middle;
      margin-top: 22px;
    }
    .back-home:after {
      content: "";
      display: inline-block;
      vertical-align: middle;
      width: 1px;
      height: 26px;
      background: #fff;
      margin: 0 15px;
    }
    .text:before {
      content: "";
      display: inline-block;
      vertical-align: middle;
      width: 24px;
      height: 24px;
      // background: url(~/src/assets/img/homePage/exit-icon2.png) no-repeat center;
      background-size: 100% 100%;
      margin-right: 10px;
    }
  }
  .main {
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    padding: 0 10px;
    overflow-y: auto;
    .title {
      border-bottom: 1px solid #e6e6e6;
      overflow: hidden;
      h4 {
        float: left;
        border-bottom: 2px solid #777;
        padding: 10px 10px 8px;
        font-size: 22px;
        color: #777;
      }
      button {
        float: right;
        display: block;
        line-height: 12px;
        font-size: 12px;
        color: #333;
        background: #f0f0f0;
        padding: 6px 12px;
        border-radius: 3px;
        outline: 0;
        cursor: pointer;
        border: 1px solid #d2d2d2;
        margin-top: 18px;
      }
    }
    .passwordTable {
      margin-top: 26px;
    }
    .PW-tit {
      font-size: 12px;
      font-weight: 500;
      h5 {
        float: left;
        color: #fff;
      }
      .but {
        float: right;
        cursor: pointer;
        color: #fff;
        i {
          margin-left: 4px;
        }
      }
    }
    .label,
    .area {
      display: inline-block;
    }
    .area {
      margin-bottom: 16px;
    }
  }
  .familyPage {
    margin-top: 10px;
  }
  .conditionBtn {
    text-align: right;
    padding-right: 5%;
  }
}
</style>
