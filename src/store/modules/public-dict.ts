import { VuexModule, Module, getModule } from "vuex-module-decorators";
import store from "@/store";
export interface IPublicDictState {
  projectName: string;
  detailed: string;
  docking: string;
  fpdx: string;
  fpcx: string;
  defaultPassword: string;
  typeId: string;
  pageSize: number;
  exportUrl: string;
}
@Module({ dynamic: true, store, name: "publicDict" })
class PublicDict extends VuexModule implements IPublicDictState {
  public projectName = "木里县脱贫攻坚指挥调度平台"; //项目名称
  public detailed = "b5cb904a76114943bd328d1a6c17be08"; //行业政策清单权限主键
  public docking = "d65c2b8f4ed546bf896fee8433f3a457"; //行业政策对接权限主键
  public fpdx = "40b34011f2fd4b31abce53498e5f1b06"; //扶贫对象分析权限主键
  public fpcx = "7b6e3caddc2d47f680b9a412dea8409b"; //扶贫成效分析权限主键
  public defaultPassword = "jzfp@2019";
  public typeId = "8a9299015334d6a3015334dfa6e30001";
  public pageSize = 15;
  public exportUrl = "http://localhost:8075/WebReport";
}
export const PublicDictModule = getModule(PublicDict);
