import VueRouter, { RouteRecord, Route } from "vue-router";
import { Message } from "iview";

// params泛型约束 放宽限制
// type DictionaryNew = { [propName: string]: any };
// type Dictionary<T> = { [key: string]: T };

/* export interface Route {
  path: string;
  name?: string;
  hash: string;
  query: Dictionary<string | (string | null)[]>;
  params: DictionaryNew;
  fullPath: string;
  matched: RouteRecord[];
  redirectedFrom?: string;
  meta?: any;
} */
// js本身没有类型 ts的语言服务需要.d.ts文件来识别类型 提供语法检查智能提示
declare module "vue/types/vue" {
  interface Vue {
    $router: VueRouter;
    $route: Route;
    $Message: Message;
    // $api: any;
  }
}

declare module "vue-router/types/router" {
  interface RouteConfig {
    id?: string;
    headIcon?: string;
    lockColor?: string;
    isNotLock?: boolean;
    pathName?: string;
    parent?: any;
  }
}
