import Cookies from "js-cookie";
// 类型检查放在moudle/@type下 或者shims-vuie.d.ts中

export const getToken = (tokenKey: string) => Cookies.get(tokenKey);
export const setToken = (tokenKey: string, token: string) =>
  Cookies.set(tokenKey, token);
export const removeToken = (tokenKey: string) => Cookies.remove(tokenKey);
