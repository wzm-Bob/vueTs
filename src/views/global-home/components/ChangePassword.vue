<template>
  <div class="changePassword">
    <div class="content changePasswordHead">
      <div class="h-left">{{ projectName }}</div>
      <div class="h-right">
        <div class="back-home" @click="closeLayer">
          <span>返回首页</span>
        </div>
      </div>
    </div>
    <div class="changePasswordCont">
      <Form
        ref="formCustom"
        :model="formCustom"
        :rules="ruleCustom"
        :label-width="100"
        class="formW"
      >
        <Row>
          <Col span="24">
            <FormItem label="用户姓名：">
              <span class="fn-style">{{ userName }}</span>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="登录账号：">
              <span class="fn-style">{{ loginName }}</span>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="原始密码：" prop="originalPasswd">
              <Input
                type="password"
                v-model="formCustom.originalPasswd"
                placeholder="请输入原始密码"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="新密码：" prop="passwd">
              <Input
                type="password"
                v-model="formCustom.passwd"
                placeholder="请输入新密码"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="确认新密码：" prop="passwdCheck">
              <Input
                type="password"
                v-model="formCustom.passwdCheck"
                placeholder="请再次输入新密码"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <div class="submitBtn">
          <button
            type="primary"
            @click="handleSubmit('formCustom')"
            class="tableBtn queryBtn"
          >
            保存
          </button>
          <button
            @click="handleReset('formCustom')"
            style="margin-left: 8px"
            class="tableBtn resetBtn"
          >
            重置
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { UserModule } from "@/store/modules/user";
import { PublicDictModule } from "@/store/modules/public-dict";
import { passwordModify } from "@/api/system";
import md5 from "js-md5";
import { removeToken } from "@/utils/storage";
import { TOKEN_KEY } from "@/utils/config";
export default class changePassword extends Vue {
  public projectName: string = PublicDictModule.projectName;
  private formCustom = {
    originalPasswd: "",
    passwd: "",
    passwdCheck: ""
  };
  //校验规则
  private ruleCustom = {
    originalPasswd: [
      { required: true, message: "原始密码不能为空", trigger: "blur" }
    ],
    passwd: [{ validator: this.validatePass, trigger: "blur" }],
    passwdCheck: [{ validator: this.validatePassCheck, trigger: "blur" }]
  };
  private formData: any;
  private validatePass(rule: any, value: string, callback: Function) {
    if (value === "") {
      callback(new Error("请输入新密码"));
    } else {
      if (this.formCustom.passwdCheck !== "") {
        // 对第二个密码框单独验证
        (this.$refs.formCustom as any).validateField("passwdCheck");
      }
      callback();
    }
  }
  private validatePassCheck(rule: any, value: string, callback: Function) {
    if (value === "") {
      callback(new Error("请再次输入新密码"));
    } else if (value !== this.formCustom.passwd) {
      callback(new Error("两次输入密码不一致!"));
    } else {
      callback();
    }
  }
  get userName() {
    return UserModule.userName;
  }
  get loginName() {
    return UserModule.loginName;
  }
  private closeLayer() {
    this.$emit("closeLayer");
  }
  private handleSubmit(name: string) {
    this.formData = this.$refs[name];
    this.formData.validate(async (valid: boolean) => {
      if (valid) {
        // let _data = Object.assign({},this.formCustom);
        if (this.formCustom.originalPasswd === this.formCustom.passwd) {
          this.$Message.warning("原始密码和新密码不能相同！");
        } else {
          const { data } = await passwordModify({
            userId: UserModule.userId,
            oldPassword: md5(this.formCustom.originalPasswd),
            newPassword: md5(this.formCustom.passwd)
          });
          if (data.data.result === "1") {
            UserModule.token = "";
            removeToken(TOKEN_KEY);
            this.$router.push("/login");
          } else {
            this.$Message.warning(data.data.msg);
          }
        }
      } else {
        this.$Message.warning("请完善表单信息！");
      }
    });
  }
  private handleReset(name: string) {
    (this.$refs[name] as any).resetFields();
  }
}
</script>
<style lang="scss">
.changePassword {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  .back-home {
    margin-top: 22px;
  }
  .changePasswordCont {
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    padding: 40px 0 12px;
    overflow-y: auto;
  }
  .formW {
    width: 680px;
    margin: 0 auto;
  }
  .ivu-form-item {
    // margin-bottom: 10px;
  }
  .fn-style {
    display: inline-block;
    width: 100%;
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: text;
    transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
      box-shadow 0.2s ease-in-out;
  }
  .submitBtn {
    text-align: center;
    margin-top: 20px;
    .tableBtn {
      height: 32px;
      padding: 0 20px;
      font-size: 14px;
    }
  }
  .ivu-form .ivu-form-item-label {
    font-size: 14px;
    color: #666;
  }
}
</style>
