import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import { RouteConfig } from "vue-router";
import { dynamicRoutes } from "@/router";
import store from "@/store";
import Vue from "vue";
import { getMenuInfo } from "@/api/system";
import { UserModule } from "./user";

/* const hasPermission = (configRoute: RouteConfig, limitRoute: RouteConfig[]) => {
  if (configRoute.children) {
    return true;
  } else {
    if (configRoute.meta && configRoute.meta.id) {
      return limitRoute.map(v => {
        return (configRoute.meta.id = v.id);
      });
    } else {
      return true;
    }
  }
}; */
export const filterGlobalRouter = (routes: RouteConfig[]) => {
  let filterFirstRouter = dynamicRoutes.filter(item => {
    for (let obj of routes) {
      if (item.children) {
        if (item.meta && item.meta.id == obj.id) {
          return item;
        }
      } else {
        return item;
      }
    }
  });
  //过滤二级路由
  let filterSecondRouter = filterFirstRouter.map(item => {
    if (item.children) {
      item.children = item.children.filter(innerItem => {
        for (let obj of routes) {
          if (innerItem.meta && innerItem.meta.id == obj.id) {
            return innerItem;
          }
          if (innerItem.meta && innerItem.meta.noAuth) {
            return innerItem;
          }
        }
      });
      return item;
    } else return item;
  });

  //过滤三级路由
  let filterThreeRouter = filterSecondRouter.map(item => {
    if (item.children) {
      item.children = item.children.filter(innerItem => {
        for (let obj of routes) {
          if (innerItem.meta && innerItem.meta.id == obj.id) {
            return innerItem;
          }
          if (innerItem.meta && innerItem.meta.noAuth) {
            return innerItem;
          }
        }
      });
      return item;
    } else return item;
  });
  return filterThreeRouter;
};

export const homeFilterRoutes = (routes: RouteConfig[]) => {
  let homeList: RouteConfig[] = [];
  for (let item of dynamicRoutes) {
    if (item.meta && item.meta.isNav) {
      homeList.push({
        id: item.meta.id,
        name: item.meta.name,
        path: item.path,
        pathName: item.name,
        headIcon: item.meta.headIcon,
        lockColor: item.meta.lockColor
      });
    }
  }
  if (routes.length == 0) {
    //this.$Message.error("暂无权限!");
    //this.$router.push(`login`);
  }
  homeList.map(item => {
    routes.map(innerItem => {
      if (item.id == innerItem.id) {
        item.isNotLock = true;
        item.name = innerItem.name;
      }
    });
  });
  return homeList;
};
export interface IPermissionState {
  commModal: any;
  modulePath: string;
  spinShow: boolean;
  tabType: string;
}

@Module({ dynamic: true, store, name: "permission" })
class Permission extends VuexModule implements IPermissionState {
  public staticRoutes: RouteConfig[] = [];
  public dynamicRoutes: RouteConfig[] = [];
  public commModal = {};
  public homeList: RouteConfig[] = [];
  public menuList: RouteConfig[] = [];
  public slideList: RouteConfig[] = [];
  public modulePath = "";
  public spinShow = false;
  public tabType = "";

  @Mutation
  private SET_ROUTES(staticRoutes: RouteConfig[]) {
    this.staticRoutes = dynamicRoutes.concat(staticRoutes);
    this.dynamicRoutes = staticRoutes;
  }
  @Mutation
  private SET_MENU_LIST(menuList: RouteConfig[]) {
    this.menuList = menuList;
  }
  @Mutation
  private SET_HOME_LIST(homeList: RouteConfig[]) {
    this.homeList = homeList;
  }
  @Mutation
  private SET_SLIDE_LIST(slideList: RouteConfig[]) {
    this.slideList = slideList;
  }
  @Mutation
  private SET_MODULE_PATH(modulePath: string) {
    this.modulePath = modulePath;
  }
  @Mutation
  private SET_COMM_MODAL(commModal: string) {
    this.commModal = commModal;
  }
  @Mutation
  private SET_LOADING_SHOW(spinShow: boolean) {
    this.spinShow = spinShow;
  }
  @Mutation
  private SET_TAB_TYPE(tabType: string) {
    this.tabType = tabType;
  }

  @Action
  public async GetPermissionRoutes() {
    debugger
    const { data } = await getMenuInfo({
      access_token: UserModule.token,
      clientId: "1b8a0531bfaa40ebb4261761b3f7df67"
    });
    let homeRoutes = homeFilterRoutes(data.data);
    this.SET_HOME_LIST(homeRoutes);
    this.SET_MENU_LIST(data.data);
    //依据自己的业务过滤动态路由并返回
    return filterGlobalRouter(data.data);
  }
}

export const PermissionModule = getModule(Permission);
