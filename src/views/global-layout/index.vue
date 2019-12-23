<template>
  <div class="basic">
    <div class="basic-head">
      <div class="content">
        <div class="h-left">{{ projectName }}</div>
        <div class="h-right">
          <ul class="nav fn-clear">
            <template v-for="item in navList">
              <li
                :key="item.id"
                class="nav-item"
                :class="{ activeClass: item.id == navMenId }"
                @click="selectNav(item)"
                :title="item.name"
              >
                <a href="javascript:;" class="link" :class="item.headIcon">
                  <span>{{ item.name }}</span>
                </a>
              </li>
            </template>
          </ul>
          <div class="back-home" @click="backHome">
            <span>返回首页</span>
          </div>
        </div>
      </div>
    </div>
    <div class="main-content">
      <router-view :key="Math.random()"></router-view>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { dynamicRoutes } from "@/router";
import { NEW_BASE_ROUTE } from "@/utils/config";
import { RouteConfig } from "vue-router";
import { PublicDictModule } from "../../store/modules/public-dict";
import { PermissionModule } from "../../store/modules/permission";
@Component({
  name: "Layout",
  components: {}
})
export default class Layout extends Vue {
  private moduleId?: string = "";
  private navMenId: string = "";
  private navList: RouteConfig[] = [];
  private headList?: Array<any> = [];
  get projectName() {
    return PublicDictModule.projectName;
  }
  mounted() {
    this.initNav();
  }
  private initNav() {
    let homeList = [];
    homeList = PermissionModule.homeList;
    homeList.map(item => {
      if (this.$route.path.indexOf(item.path) != -1) {
        this.moduleId = item.id;
      }
    });
    //获取头部列表

    dynamicRoutes.map(item => {
      if (item.meta && item.meta.id == this.moduleId) {
        this.headList = item.children;
      }
    });
    let menuList = PermissionModule.menuList;
    //获取模块 所对应的头部菜单资源
    menuList.map(item => {
      if (this.moduleId == item.parent.id) {
        this.navList.push(item);
      }
    });
    this.navList.map(item => {
      (this.headList as Array<any>).map(innerItem => {
        if (innerItem.meta && item.id == innerItem.meta.id) {
          item.path = innerItem.path;
        }
      });
    });
    this.selectNav(this.navList[0]);
  }
  private selectNav(item: any) {
    if (item.path) {
      this.navMenId = item.id;
      this.$router.push({ name: item.path });
    } else {
      let oldPath = this.$route.matched[0].path;
      this.$router.push(oldPath);
    }
  }
  private backHome() {
    //路由加载
    this.$router.push(`${NEW_BASE_ROUTE}/home`);
  }
}
</script>
<style lang="scss">
@import "@/assets/css/head.scss";
</style>
