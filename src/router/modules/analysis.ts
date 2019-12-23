import Layout from "@/views/global-layout/index.vue";
import { NEW_BASE_ROUTE } from "@/utils/config";

const analysisRouter = {
  path: `${NEW_BASE_ROUTE}/analysis`,
  name: `analysis`,
  component: Layout,
  meta: {
    id: "56f6ac67157542c5af632fd932795a70",
    name: "数据分析",
    isNav: true,
    lockColor: "red",
    headIcon: "analysis"
  },
  children: [
    {
      path: "fpdx",
      name: "fpdx",
      component: () => import("@/views/base-analysis/fpdx/index.vue"),
      meta: {
        id: "40b34011f2fd4b31abce53498e5f1b06",
        name: "扶贫对象分析",
        icon: ""
      }
    },
    {
      path: "fpcx",
      name: "fpcx",
      component: () => import("@/views/base-analysis/fpcx/index.vue"),
      meta: {
        id: "7b6e3caddc2d47f680b9a412dea8409b",
        name: "扶贫成效分析",
        icon: ""
      }
    }
  ]
};

export default analysisRouter;
