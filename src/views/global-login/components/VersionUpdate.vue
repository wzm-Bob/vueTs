<template>
  <div class="version">
    <div class="content">
      <div class="h-left versionName">
        <p>{{ projectName }}</p>
        <i></i>
        <span>版本更新</span>
      </div>
    </div>
    <div class="versionList">
      <ul>
        <li>
          <div class="version-left">
            <div class="year">2019年</div>
            <div class="date">4月30日</div>
          </div>
          <div class="version-right">
            <i></i>
            <div class="version-dist">
              <h3>木里县精准扶贫信息系统 V1.0</h3>
              <p>上线内容：</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import "@/assets/css/head.scss";
export default {
  components: {},
  data() {
    return {
      projectName: "木里县"
      // projectName : this.$store.getters.projectName
    };
  }
};
</script>
<style lang="scss" scoped>
.version {
  .versionName {
    p,
    i,
    span {
      display: inline-block;
      vertical-align: middle;
    }
    i {
      width: 16px;
      height: 16px;
      border-radius: 8px;
      background: #fff;
      margin: 0 10px 0 20px;
    }
    span {
      font-size: 18px;
    }
  }
  .versionList {
    padding-top: 40px;
    ul {
      width: 650px;
      margin: 0 auto;
      li {
        list-style: none;
      }
    }
    .version-left {
      display: inline-block;
      vertical-align: top;
      color: #333;
      text-align: right;
      margin-right: 20px;
      padding-top: 20px;
      .year {
        font-size: 14px;
      }
      .date {
        font-size: 18px;
      }
    }
    .version-right {
      display: inline-block;
      vertical-align: top;
      padding: 20px 0;
      border-left: 3px solid #0d69c7;
      i {
        display: inline-block;
        vertical-align: top;
        width: 41px;
        height: 30px;
        background: url(~@/assets/img/login/location-icon.png) no-repeat center;
        background-size: 100% 100%;
        margin: 0 10px;
      }
      i:before {
        content: "";
        display: inline-block;
        vertical-align: middle;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        border: 2px solid #0d69c7;
        background: #fff;
        margin-top: 6px;
        margin-left: -16px;
      }
      .version-dist {
        display: inline-block;
        vertical-align: top;
        background-color: #fbfbfb;
        border: solid 1px #ebebeb;
        padding: 12px;
        border-radius: 4px;
        h3 {
          color: #0d69c7;
          font-size: 16px;
          line-height: 26px;
        }
        p {
          color: #333;
          font-size: 14px;
          line-height: 18px;
        }
      }
    }
  }
}
</style>
