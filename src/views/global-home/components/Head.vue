<template>
  <div class="content HP-page">
    <div class="h-left">
      {{ projectName }}
    </div>
    <div class="h-right">
      <div class="menu-wrap">
        <div class="user">
          <div class="user-info">
            <i class="logo"></i>
            <span>{{ userName }}</span>
          </div>
          <div class="user-operator">
            <ul>
              <li @click="isShowReset()" v-if="powerButton">
                <i></i>
                <span>重置密码</span>
              </li>
              <li @click="isShowLayer()">
                <i></i>
                <span>密码修改</span>
              </li>
              <li @click="logout">
                <i></i>
                <span>退出</span>
              </li>
            </ul>
            <div class="triangle"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { UserModule } from "@/store/modules/user";
import store from "@/store";
import { PublicDictModule } from "@/store/modules/public-dict";
import { removeToken } from "@/utils/storage";
import { TOKEN_KEY } from "@/utils/config";
@Component({})
export default class Head extends Vue {
  private powerButton: boolean = false;
  get userName() {
    return UserModule.userName;
  }
  get projectName() {
    return PublicDictModule.projectName;
  }
  private logout() {
    store.commit("SET_TOKEN", "");
    removeToken(TOKEN_KEY);
    this.$router.push("/login");
  }
  private isShowLayer() {
    this.$emit("isShowLayer");
  }
  private isShowReset() {
    this.$emit("isShowReset");
  }
}
</script>
<style lang="scss">
@import "@/assets/css/head.scss";
</style>
