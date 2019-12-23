import axios from "axios";
import { UserModule } from "@/store/modules/user";
// import app from "@/main";
import Qs from "qs";
import Route from "@/router";

const service = axios.create({});
service.defaults.timeout = 20000;
service.defaults.headers.post["Content-Type"] = "application/json";
//请求拦截
service.interceptors.request.use(
  (config: any) => {
    if (config.url.indexOf("authApi") > 0) {
      //authApi
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    } else if (config.url.indexOf("basicApi") > 0) {
      if (config.method == "post") {
        config.data = JSON.stringify(Qs.parse(config.data));
      }
    }
    // config.headers['X-Access-Token'] = UserModule.token
    config.headers.Authorization = UserModule.token;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//响应拦截
service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error.response.data);
  }
);

/* function validateData(res: any) {
  if (res.access_token) return true;

  let { code, message, msg } = res;
  if (isNaN(code)) {
    return false;
  }

  if (!(code == 0 || code == 500)) {
    if (code == 401 && msg == "invalid_token") {
      removeToken(TOKEN_KEY);
      // app.$Message.error("token过期，请重新登录！");
      Route.push("login");
    } else {
      //  app.$Message.error(message);
      return false;
    }
  }
  return true;
} */

export default service;
