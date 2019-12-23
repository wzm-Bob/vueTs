<template>
  <div class="login-page">
    <div class="login-header">
      <div class="header">
        <div class="head-title"></div>
        <div class="but">
          <router-link to="/version" target="_Blank">
            <div class="update">
              <i></i>
              <span>版本更新</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="login-content">
      <div class="inputSquare">
        <div class="input-title">
          <h4>登录</h4>
        </div>
        <Form
          class="login-form-wrap"
          ref="lg"
          :model="lg"
          :rules="loginValidateRule"
        >
          <FormItem prop="username" class="form-item">
            <Input
              v-model="lg.username"
              placeholder="请输入账号"
              class="size-40 font-16"
            >
              <Icon type="username-icon" slot="prefix" />
            </Input>
          </FormItem>

          <FormItem prop="password" class="form-item">
            <Input
              v-model="lg.password"
              placeholder="请输入密码"
              class="size-40"
              type="password"
            >
              <Icon type="password-icon" slot="prefix" />
            </Input>
          </FormItem>

          <FormItem>
            <Row>
              <Col span="11">
                <FormItem prop="validateCode" class="form-item">
                  <Input
                    v-model="lg.validateCode"
                    placeholder="请输入验证码"
                    class="size-40"
                  >
                    <Icon type="code-icon" slot="prefix" />
                  </Input>
                </FormItem>
              </Col>
              <Col span="2" style="height:10px"> </Col>
              <Col span="16">
                <FormItem prop="image" class="form-item item-img">
                  <img :src="codeImageUrl" class="code-img" alt="验证码" @click="getCodeImg" />
                </FormItem>
              </Col>
            </Row>
          </FormItem>

          <FormItem class="form-item">
            <Button type="primary" class="sub-btn" long @click="submit"
              >登 录</Button
            >
            <Spin fix v-show="isSpinShow">
              <Icon
                type="ios-loading"
                size="18"
                class="demo-spin-icon-load"
              ></Icon>
            </Spin>
          </FormItem>
        </Form>
      </div>
      <div class="two-code">
        <div class="edit-mes">
          <div class="tit">
            <span>精准扶贫</span>
            <i>v1.0</i>
          </div>
          <div class="edit">Android 版本</div>
          <div class="android">
            <i></i>
            <span>立即下载</span>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">
      <span class="num">{{ key }}</span>
      <p>版权信息 | 木里县扶贫开发办公室</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { setToken } from "@/utils/storage";
import { TOKEN_KEY, codeImageLink, NEW_BASE_ROUTE } from "@/utils/config";
import { UserModule } from "@/store/modules/user";
import { validation } from "@/utils/validate";
import { vailCodeImg, auth } from "@/api/system";
import md5 from "js-md5";
import qs from "qs";
declare var window: any; // 或者 this.GlobalWin = window;

@Component({
  name: "Login",
  components: {},
  mixins: [],
  filters: {}
})
export default class Login extends Vue {
  // computed  get styles () {}
  // methods  method(){}
  // data() 直接不用了 用private声明
  private lg = {
    username: "",
    password: "",
    grant_type: "password",
    scope: "read",
    client_id: "1b8a0531bfaa40ebb4261761b3f7df67",
    client_secret: "40681dfaf98b4a9a9937c8d2985050c2",
    validateCode: ""
  };
  private loginValidateRule = {
    username: [{ validator: validation.require, trigger: "blur" }],
    password: [{ validator: validation.require, trigger: "blur" }],
    validateCode: [
      { validator: validation.require, trigger: "blur" },
      { validator: validation.valiCodeLengthRule4, trigger: "blur" }
    ]
  };
  private codeImageUrl = "";
  private key = "";
  private isSpinShow = false;
  private FromData: any; //强类型语言 必须类型明确 如from和window

  created() {
    document.onkeyup = () => {
      var key = window.event.keyCode;
      if (key === 13) {
        this.submit();
      }
    };
  }
  mounted() {
    this.getCodeImg();
  }

  private async getCodeImg() {
    this.key = new Date().getTime().toString();
    this.codeImageUrl = await `${codeImageLink}${this.key}`;
  }
  private submit() {
    this.key = "123";
    this.FromData = this.$refs["lg"];
    this.FromData.validate(async (valid: boolean) => {
      if (valid) {
        this.isSpinShow = true;
        const { data } = await vailCodeImg({
          validateCode: this.lg.validateCode,
          key: this.key
        });
        // (data as any)类型推断
        if (data.code === 0) {
          this.lg.password = md5(this.lg.password);
          try {
            await UserModule.Login(qs.stringify(this.lg));
          } catch (error) {
            this.$Message.error("用户名或密码错误！");
            console.log(error.error_description);
            this.$router.push(`/login`);
            this.isSpinShow = false;
            return false;
          }
          // this.$store.commit("IS_ADD_BACKSITE_ASYNC_ROUTER", false);
          this.$router.push(`${NEW_BASE_ROUTE}/home`);
          this.isSpinShow = false;
        } else {
          this.lg.validateCode = "";
          this.getCodeImg();
          this.isSpinShow = false;
          this.$Message.error(data.msg);
        }
      } else {
        this.$Message.error("校验失败！");
      }
    });
  }
}
</script>

<style lang="scss" scoped>
/*强制修改iveiw样式*/
.login-wrap {
  .ivu-input-prefix {
    width: 40px;
  }

  .ivu-input-with-prefix {
    padding-left: 40px;
  }
  .ivu-checkbox-wrapper {
    font-size: 14px;
  }

  .item-img {
    cursor: pointer;

    .ivu-form-item-content {
      line-height: 1;
    }

    img {
      height: 40px;
      width: 100%;
    }
  }
}
.ivu-form-item {
  margin-bottom: 25px;
}
.ivu-col-span-11 {
  width: 66%;
}
.ivu-col-span-16 {
  width: 32%;
  float: right;
  margin-top: -5px;
}
.ivu-input-prefix {
  i {
    font-size: 18px;
    margin-top: 4px;
  }
}
.ivu-input {
  padding-left: 36px;
  font-size: 14px;
}
.ivu-input::placeholder {
  color: #666;
  font-size: 14px;
  line-height: 40px;
}
.ivu-btn {
  line-height: 28px;
  font-size: 18px;
  font-weight: bold;
}
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
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
<style lang="scss" scoped>
.login-page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../../assets/img/login/bg.png") no-repeat center;
  background-size: 100% 100%;
  .login-header {
    height: 100px;
    background: url("../../assets/img/login/title-bg.png") no-repeat center;
    background-size: 100% 100%;
    .header {
      width: 1200px;
      height: 100px;
      overflow: hidden;
      margin: 0 auto;
    }
    .head-title {
      float: left;
      width: 495px;
      height: 66px;
      background: url("../../assets/img/login/title.png") no-repeat center;
      background-size: 100% 100%;
      position: relative;
      top: 17px;
    }
    .but {
      float: right;
      // width:232px;
      width: 118px;
      height: 30px;
      border-radius: 15px;
      border: 2px solid #d4d4d4;
      box-sizing: border-box;
      background: #fff;
      position: relative;
      top: 35px;
    }
    .update {
      display: inline-block;
      vertical-align: middle;
      padding: 0 14px;
      cursor: pointer;
      i {
        display: inline-block;
        vertical-align: middle;
        width: 22px;
        height: 22px;
      }
      span {
        display: inline-block;
        vertical-align: middle;
        line-height: 26px;
        margin-left: 8px;
        font-size: 14px;
        color: #0d69c7;
      }
    }
    .update {
      i {
        background: url("../../assets/img/login/download-icon.png") no-repeat
          center;
        background-size: 100% 100%;
      }
    }
  }
  .login-content {
    width: 1200px;
    position: absolute;
    top: 100px;
    bottom: 0;
    left: 50%;
    margin-left: -600px;
    .inputSquare {
      width: 346px;
      height: 430px;
      padding: 0 20px;
      background: url(../../assets/img/login/inp-bg.png) no-repeat center;
      background-size: 100% 100%;
      border-radius: 4px;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
    }
    .input-title {
      padding-top: 12px;
      height: 80px;
      border-bottom: 1px solid #e1e1e1;
      h4 {
        text-align: center;
        line-height: 80px;
        font-size: 26px;
        color: #0d69c7;
        letter-spacing: 0.5em;
        font-weight: 500;
      }
    }
    .ivu-icon-username-icon {
      width: 14px;
      height: 14px;
      background: url(../../assets/img/login/inp-icon1.png) no-repeat center;
      background-size: 100% 100%;
      margin-top: 12px;
    }
    .ivu-icon-username-icon:after,
    .ivu-icon-password-icon:after,
    .ivu-icon-code-icon:after {
      content: "";
      position: absolute;
      width: 1px;
      height: 16px;
      background: #999;
      left: 30px;
      top: 12px;
    }
    .ivu-icon-password-icon {
      width: 12px;
      height: 15px;
      background: url(../../assets/img/login/inp-icon2.png) no-repeat center;
      background-size: 100% 100%;
      margin-top: 12px;
    }
    .ivu-icon-code-icon {
      width: 12px;
      height: 15px;
      background: url(../../assets/img/login/inp-icon3.png) no-repeat center;
      background-size: 100% 100%;
      margin-top: 12px;
    }
    .login-form-wrap {
      padding: 36px 30px 0;
    }
    .two-code {
      position: absolute;
      bottom: 20px;
      left: 0;
    }
    .code-img {
      display: inline-block;
      vertical-align: middle;
      width: 113px;
      height: 111px;
      background: url("../../assets/img/login/code-img.png") no-repeat center;
      background-size: 100% 100%;
    }
    .edit-mes {
      display: inline-block;
      vertical-align: middle;
      margin-left: 12px;
      cursor: pointer;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      i {
        display: inline-block;
        vertical-align: middle;
      }
      .tit {
        span {
          font-size: 22px;
          color: #fff;
          line-height: 48px;
        }
        i {
          font-style: normal;
          width: 30px;
          height: 14px;
          border-radius: 7px;
          background: #fff;
          text-align: center;
          line-height: 14px;
          font-size: 12px;
          color: #333;
          margin-top: 7px;
          margin-left: 4px;
        }
      }
      .edit {
        font-size: 14px;
        color: #fff;
        line-height: 14px;
        margin-bottom: 12px;
      }
      .android {
        width: 126px;
        height: 30px;
        border: 1px solid #fff;
        border-radius: 15px;
        padding: 0 16px;
        box-sizing: border-box;
        i {
          width: 17px;
          height: 20px;
          background: url("../../assets/img/login/android-icon.png") no-repeat
            center;
          background-size: 100% 100%;
        }
        span {
          font-size: 16px;
          color: #fff;
          margin-left: 8px;
          line-height: 28px;
        }
      }
    }
  }
  .copyright {
    font-size: 14px;
    color: #fff;
    text-align: center;
    position: absolute;
    bottom: 20px;
    left: 50%;
    margin-left: -100px;
    text-align: center;
  }
}
</style>
