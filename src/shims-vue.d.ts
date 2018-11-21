declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
/* 
这是定义文件，为了让ts代码识别 .vue 文件
在ts代码中导入vue代码包，需要写成 import xxx form xxx.vue ，
需要带上后缀 vue
 */
declare module '*.svg' {
  import Vue from 'vue';
  export default Vue;
}
