import Vue from "vue";
import Router, { RouteConfig } from "vue-router";
import { NEW_BASE_ROUTE } from "@/utils/config";
import basicRouter from "./modules/basic";
import analysisRouter from "./modules/analysis";

Vue.use(Router);
export const staticRoutes: RouteConfig[] = [
  { path: "/login", component: () => import("@/views/global-login/index.vue") },
  {
    path: "/no-found",
    component: () => import("@/views/global-error/index.vue")
  },
  {
    path: "/version",
    component: () => import("@/views/global-login/components/VersionUpdate.vue")
  }
];
export const dynamicRoutes: RouteConfig[] = [
  {
    path: `${NEW_BASE_ROUTE}/home`,
    name: "home-page",
    component: () => import("@/views/global-home/index.vue")
  },
  basicRouter,
  analysisRouter
];
const createRouter = () =>
  new Router({
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
    base: process.env.BASE_URL,
    routes: staticRoutes
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher; // reset router
}

export default router;
