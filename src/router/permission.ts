import router from "./index";
import store from "@/store";
import { Route } from "vue-router";
import { UserModule } from "@/store/modules/user";
import { PermissionModule } from "@/store/modules/permission";

const whiteList = ["/login", "/version"];

router.beforeEach(async (to: Route, _: Route, next: any) => {
  if (UserModule.token) {
    if (!UserModule.dynamicRouterFlag) {
      store.commit("SET_DYNAMIC_ROUTER_FLAG", true);
      try {
        //正常逻辑是用户信息查出角色 通过角色查权限 这里业务不同
        debugger
        const data = await PermissionModule.GetPermissionRoutes();
        router.addRoutes(data);
        await UserModule.GetUserInfo();
        next({ ...to, replace: true });
      } catch (error) {
        throw Error(error);
      }
    } else {
      next();
    }
  } else {
    // 白名单
    if (whiteList.indexOf(to.path) != -1) {
      next();
    } else {
      next("/login");
    }
  }
});

router.afterEach(() => {});
