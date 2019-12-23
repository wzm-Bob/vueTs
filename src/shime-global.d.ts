declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
// 声明全局的 window ，不然使用 window.XX 时会报错
// declare var window: Window;
declare var document: Document;
declare module "qs";

// 即使配置了以上方法之后，有些地方使用 document.XXX 会在build时报错
// 在用到 document.XXX  的script片段中声明一下即可
// declare var document: any;
