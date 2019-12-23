import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import { userLogin, auth } from "@/api/system";
import { TOKEN_KEY } from "@/utils/config";
import { getToken, setToken } from "@/utils/storage";

export interface IUserState {
  // roles: string[]先声明 再在构造函数中使用
  // email?: string email可以是undefined 不能为null
  token: string;
  dynamicRouterFlag: boolean;
  areaCode: string;
  dataYear: string;
  currYear: string;
  courateYear: string;
  userId: string;
  userName: string;
  loginName: string;
}

@Module({ dynamic: true, store, name: "user" })
class User extends VuexModule implements IUserState {
  public token = getToken(TOKEN_KEY) || "";
  public dynamicRouterFlag = false;
  public areaCode = "";
  public dataYear = "";
  public currYear = "";
  public courateYear = "";
  public userId = "";
  public userName = "";
  public loginName = "";

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token;
  }
  @Mutation
  private SET_DYNAMIC_ROUTER_FLAG(dynamicRouterFlag: boolean) {
    this.dynamicRouterFlag = dynamicRouterFlag;
  }
  @Mutation
  private SET_USER_NAME(userName: string) {
    this.userName = userName;
  }
  @Mutation
  private SET_AREA_CODE(areaCode: string) {
    this.areaCode = areaCode;
  }
  @Mutation
  private SET_DATA_YEAR(dataYear: string) {
    this.dataYear = dataYear;
  }
  @Mutation
  private SET_CURR_YEAR(currYear: string) {
    this.currYear = currYear;
  }
  @Mutation
  private SET_COURATE_YEAR(courateYear: string) {
    this.courateYear = courateYear;
  }
  @Mutation
  private SET_USER_ID(userId: string) {
    this.userId = userId;
  }
  @Mutation
  private SET_LOGIN_NAME(loginName: string) {
    this.loginName = loginName;
  }

  @Action
  public async GetUserInfo() {
    if (getToken(TOKEN_KEY) === "") {
      throw Error("token未定义");
    }
    try {
      const { data } = await userLogin({
        access_token: getToken(TOKEN_KEY)
      });
      if (!data) {
        throw Error("验证失败，请重新登录");
      }
      this.SET_AREA_CODE(data.data.areaCode);
      this.SET_DATA_YEAR(data.data.data_year);
      this.SET_COURATE_YEAR(data.data.courate_year);
      this.SET_CURR_YEAR(data.data.curr_year);
      this.SET_USER_ID(data.data.userInfo.id);
      this.SET_USER_NAME(data.data.userInfo.name);
      this.SET_LOGIN_NAME(data.data.userInfo.loginName);
    } catch (error) {
      throw Error(error);
    }
  }
  @Action
  public async Login(params: any) {
    const { data } = await auth(params);
    setToken(TOKEN_KEY, data.access_token);
    this.SET_DYNAMIC_ROUTER_FLAG(false);
    this.SET_TOKEN(data.access_token);
  }
}
export const UserModule = getModule(User);
