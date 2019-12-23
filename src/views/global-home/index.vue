<template>
  <div class="home-page-wrap">
    <Head @isShowLayer="isShowLayer()" @isShowReset="isShowReset()"></Head>
    <div class="home-container">
      <ul class="home-list fn-clear" ref="homeList">
        <li class="home-item">
          <div
            class="item-container bg-1 red"
            :class="{ lock: !this.basic.isNotLock }"
            @click="clickModel(basic.pathName, basic.id, basic.isNotLock)"
          >
            <div class="home-content">
              <i class="home-icon icon-1"></i>
              <div class="item-name">
                <span>基础信息</span>
              </div>
            </div>
          </div>
        </li>
        <li class="home-item">
          <div class="home-item-div">
            <div
              class="item-container bg-2"
              :class="{ lock: !this.income.isNotLock }"
              @click="clickModel(income.pathName, income.id, income.isNotLock)"
            >
              <div class="home-content">
                <i class="home-icon icon-2"></i>
                <div class="item-name">
                  <span>返贫预警</span>
                </div>
              </div>
            </div>
          </div>
          <ul>
            <li class="home-item">
              <div
                class="item-container bg-3"
                :class="{ lock: !this.monitor.isNotLock }"
                @click="
                  clickModel(monitor.pathName, monitor.id, monitor.isNotLock)
                "
              >
                <div class="home-content">
                  <i class="home-icon icon-3"></i>
                  <div class="item-name">
                    <span>数据质量</span>
                  </div>
                </div>
              </div>
            </li>
            <li class="home-item">
              <div
                class="item-container bg-4"
                :class="{ lock: !this.information.isNotLock }"
                @click="
                  clickModel(
                    information.pathName,
                    information.id,
                    information.isNotLock
                  )
                "
              >
                <div class="home-content">
                  <i class="home-icon icon-4"></i>
                  <div class="item-name">
                    <span>信息发布</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
        <li class="home-item">
          <div
            class="item-container bg-7"
            :class="{ lock: !this.analysis.isNotLock }"
            @click="
              clickModel(analysis.pathName, analysis.id, analysis.isNotLock)
            "
          >
            <div class="home-content">
              <i class="home-icon icon-7"></i>
              <div class="item-name">
                <span>数据分析</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="copyright">
      <p>版权信息 | 木里县扶贫开发办公室</p>
    </div>
    <!-- 修改密码 -->
    <!--    <change-password
      class="change-password"
      :class="{ show: isShowPasswordLayer, hide: !isShowPasswordLayer }"
      @closeLayer="closeLayer()"
    ></change-password> -->
    <!-- 重置密码 -->
    <reset-password
      class="reset-password"
      :class="{ show: isShowResetLayer, hide: !isShowResetLayer }"
      @closeReset="closeReset()"
    ></reset-password>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Head from "./components/Head.vue";
//import ChangePassword from "./components/ChangePassword.vue";
import ResetPassword from "./components/ResetPassword.vue";
import { PermissionModule } from "../../store/modules/permission";
interface Classify {}

@Component({
  components: {
    Head,
    // ChangePassword,
    ResetPassword
  },
  mixins: [],
  filters: {}
})
export default class Home extends Vue {
  private itemNum: number = 0;
  private dh: number = 0;
  // 使用接口（Interfaces）来定义 对象 的类型
  private basic: Classify = {};
  private policy: Classify = {};
  private income: Classify = {};
  private monitor: Classify = {};
  private information: Classify = {};
  private activity: Classify = {};
  private analysis: Classify = {};
  private isShowPasswordLayer: boolean = false;
  private isShowResetLayer: boolean = false;

  mounted() {
    this.setHeight();
    window.sessionStorage.setItem("navId", "");
    window.onresize = () => {
      this.setHeight();
    };
    let homeList = PermissionModule.homeList;
    homeList.map(item => {
      if (item.id == "ea1f2e254f64428d82aabf5ca08bfa19") {
        this.basic = item;
      }
      if (item.id == "b0c5125ef6174781a4df202619f2e692") {
        this.policy = item;
      }
      if (item.id == "3cfb81d5315e488da57f635c3c902a65") {
        this.income = item;
      }
      if (item.id == "54902ecd89414f6ea84fcc4504592785") {
        this.monitor = item;
      }
      if (item.id == "1ba2b3aa95504fd0825b1dbcc3b80223") {
        this.information = item;
      }
      if (item.id == "1ed52d9a57b84c44b042d6751468f6d0") {
        this.activity = item;
      }
      if (item.id == "56f6ac67157542c5af632fd932795a70") {
        this.analysis = item;
      }
    });
  }
  //点击模块
  private clickModel(path: any, id: string, isNotLock: boolean) {
    if (isNotLock) {
      this.$router.push({ name: path, params: { id } });
      window.sessionStorage.setItem("navId", id);
    }
  }
  //设置首页模块高度
  private setHeight() {
    let dom = this.$refs.homeList;
   // this.dh = (dom as any).offsetWidth * (350 / 936);
    //或者
    this.dh = (dom as HTMLDivElement).offsetWidth * (350 / 936);  
  }
  //显示修改密码弹层
  private isShowLayer() {
    this.isShowPasswordLayer = true;
  }
  //关闭修改密码弹层
  private closeLayer() {
    this.isShowPasswordLayer = false;
  }
  // 显示重置密码弹层
  private isShowReset() {
    this.isShowResetLayer = true;
  }
  // 关闭重置密码弹层
  private closeReset() {
    this.isShowResetLayer = false;
  }

  beforeDestroy() {
    window.onresize = () => {
      return "";
    };
  }
}
</script>
<style lang="scss" >
.show {
  display: block;
}
.hide {
  display: none;
}
.change-password,
.reset-password {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
}
.home-page-wrap {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: url("../../assets/img/homePage/HP-bg.png") no-repeat center;
  background-size: 100% 100%;
  overflow: hidden;

  .home-container {
    height: 56.2%;
    position: absolute;
    top: 52%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 85%;
    min-width: 940px;
    min-height: 400px;
  }
  .home-title {
    width: 70%;
    margin: auto;
    text-align: center;
  }
}

.home-list {
  height: 100%;
  -webkit-box-reflect: below 2px -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(250, 250, 250, 0.15)));
  .home-item {
    list-style: none;
  }
  .home-item:nth-child(1) {
    height: 100%;
    width: 21%;
  }
  .home-item:nth-child(2) {
    height: 100%;
    width: 59%;
    .home-item-div {
      padding-bottom: 7px;
      height: 50%;
      .item-container {
        height: 100%;
        width: 100%;
        border: 2px solid #f4f4fc;
      }
    }
    ul {
      height: 50%;
      .home-item {
        height: 100%;
        .item-container {
          height: 100%;
          border: 2px solid #f4f4fc;
        }
      }
      .home-item:nth-child(1) {
        width: 50%;
        padding: 7px 7px 0px 0px;
      }
      .home-item:nth-child(2) {
        width: 50%;
        padding: 7px 0px 0px 7px;
      }
    }
  }
  .home-item:nth-child(3) {
    height: 100%;
    width: 20%;
    .home-item-div:nth-child(1) {
      padding-bottom: 7px;
      height: 50%;
      .item-container {
        height: 100%;
        width: 100%;
        border: 2px solid #f4f4fc;
      }
    }
    .home-item-div:nth-child(2) {
      padding-top: 7px;
      height: 50%;
      .item-container {
        height: 100%;
        width: 100%;
        border: 2px solid #f4f4fc;
      }
    }
  }
  .home-item:nth-child(4) {
    height: 100%;
    width: 21%;
  }
}
.home-item {
  float: left;
  width: 20%;
  padding: 7px;
  &.h-100p {
    height: 100%;

    .home-icon {
      width: 142px !important;
      height: 101px !important;
    }
  }
  .item-container {
    position: relative;
    height: 100%;
    border: 2px solid #f4f4fc;
    cursor: pointer;
    &.bg-1 {
      background: url("../../assets/img/homePage/HP-list-bg1.png") no-repeat
        center / cover;
    }
    &.bg-2 {
      background: url("../../assets/img/homePage/HP-list-bg2.png") no-repeat
        center / cover;
    }
    &.bg-3 {
      background: url("../../assets/img/homePage/HP-list-bg3.png") no-repeat
        center / cover;
    }
    &.bg-4 {
      background: url("../../assets/img/homePage/HP-list-bg4.png") no-repeat
        center / cover;
    }
    &.bg-5 {
      background: url("../../assets/img/homePage/HP-list-bg5.png") no-repeat
        center / cover;
    }
    &.bg-6 {
      background: url("../../assets/img/homePage/HP-list-bg6.png") no-repeat
        center / cover;
    }
    &.bg-7 {
      background: url("../../assets/img/homePage/HP-list-bg5.png") no-repeat
        center / cover;
    }
    &.lock {
      cursor: not-allowed;
      &::after {
        content: "";
        position: absolute;
        right: 0px;
        top: 0px;
        display: inline-block;
        width: 70px;
        height: 70px;
        background: url("../../assets/img/homePage/lock.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .home-content {
      position: relative;
      top: 50%;
      left: 50%;
      text-align: center;
      transform: translate(-50%, -50%);
      .home-icon {
        display: inline-block;
        height: 83px;
        &.icon-1 {
          width: 70px;
          background: url("../../assets/img/homePage/HP-icon1.png") no-repeat
            center;
          background-size: 100% 100%;
        }
        &.icon-2 {
          width: 70px;
          background: url("../../assets/img/homePage/HP-icon2.png") no-repeat
            center;
          background-size: 100% 100%;
        }
        &.icon-3 {
          width: 86px;
          height: 80px;
          background: url("../../assets/img/homePage/HP-icon3.png") no-repeat
            center;
          background-size: 100% 100%;
        }
        &.icon-4 {
          width: 84px;
          height: 80px;
          background: url("../../assets/img/homePage/HP-icon4.png") no-repeat
            center;
          background-size: 100% 100%;
        }
        &.icon-5 {
          width: 70px;
          background: url("../../assets/img/homePage/HP-icon5.png") no-repeat
            center;
          background-size: 100% 100%;
        }
        &.icon-6 {
          width: 76px;
          height: 80px;
          background: url("../../assets/img/homePage/HP-icon6.png") no-repeat
            center;
          background-size: 100% 100%;
        }
        &.icon-7 {
          width: 89px;
          height: 82px;
          background: url("../../assets/img/homePage/HP-icon7.png") no-repeat
            center;
          background-size: 100% 100%;
        }
      }
    }

    .item-name {
      margin-top: 25px;
      line-height: 1;
      color: #fff;
      font-weight: bold;

      & > span {
        position: relative;
        font-size: 28px;
        line-height: 30px;
        font-weight: 400;
        &::before,
        &::after {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          content: "";
          display: inline-block;
          width: 42px;
          height: 12px;
        }
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
@media screen and (min-width: 1900px) {
  .item-name {
    font-size: 24px;
  }
}

@media screen and (min-width: 1600px) and (max-width: 1900px) {
  .item-name {
    font-size: 18px;
  }
}
@media screen and (min-width: 1400px) and (max-width: 1600px) {
  .item-name {
    font-size: 16px;
  }
}
</style>
