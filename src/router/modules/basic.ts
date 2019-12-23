import Layout from "@/views/global-layout/index.vue";
import { NEW_BASE_ROUTE } from "@/utils/config";

const basicRouter = {
  path: `${NEW_BASE_ROUTE}/basic`,
  name: `basic`,
  component: Layout,
  meta: {
    id: "ea1f2e254f64428d82aabf5ca08bfa19",
    name: "基础信息",
    isNav: true,
    lockColor: "red",
    headIcon: "basic"
  },
  children: [
    {
      path: "basic_poor",
      name: "basic_poor",
      component: () => import("@/views/base-basic/family/index.vue"),
      meta: {
        id: "147bee4691fa49778678e7e9524b8182",
        name: "贫困户管理",
        icon: "",
        options: [
          {
            id: "9728331a2f8f435c9b78e7d77a1a1359",
            name: "修改"
          }
        ]
      }
    },
    {
      path: "basic_village",
      name: "basic_village",
      component: () => import("@/views/base-basic/village/index.vue"),
      meta: {
        id: "d4b101605b38416ea8c8207c73ef1177",
        name: "贫困村管理",
        icon: "",
        options: [
          {
            id: "447b96b4a13d4ee69ceb1d422a23e982",
            name: "上报"
          },
          {
            id: "1db9da4dcf0b4e00a9df95f54c5e3f8a",
            name: "浏览材料"
          }
        ]
      }
    },
    {
      path: "basic_town",
      name: "basic_town",
      component: () => import("@/views/base-basic/town/index.vue"),
      meta: {
        id: "00f33ad2fe9047429e3f251de1213f5b",
        name: "乡镇信息管理",
        icon: ""
      }
    }
  ]
};

export default basicRouter;
