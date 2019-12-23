import request from "@/utils/axios";
// import { ISystemData } from "../types";
// import { base } from "@/utils/config"; // 导入接口域名列表

/*  const defaultSystemData: ISystemData = {
   id: 0,
   status: 'draft',
   platforms: ['a-platform'],
   disableComment: false,
   importance: 0, 
}; */
export const vailCodeImg = (params: any) =>
  request({
    url: `/authApi/common/imgvrifyControllerDefaultKaptcha`,
    method: "get",
    params
  });

export const auth = (data: any) =>
  request({
    url: `/authApi/oauth/token`,
    method: "post",
    data
  });

//用户登录获取用户权限
export const getMenuInfo = (params: any) =>
  request({
    url: `/authApi/rs/login/userPermissions`,
    method: "get",
    params
  });

//用户登录获取用户基本信息和系统配置信息
export const userLogin = (params: any) =>
  request({
    url: `/basicApi/sysResource/login`,
    method: "get",
    params
  });

//根据用户id和权限主键获取下面的权限资源
export const findMenuByUserIdAndResId = (params: any) =>
  request({
    url: `/basicApi/sysResource/findMenuByUserId`,
    method: "get",
    params
  });

//修改密码
export const passwordModify = (params: any) =>
  request({
    url: `/basicApi/sysUser/changePassword`,
    method: "get",
    params
  });
// 重置密码
export const resetPassword = (params: any) =>
  request({
    url: `/basicApi/sysUser/initPassword`,
    method: "get",
    params
  });
// 获取账号列表
export const getAccountList = (params: any) =>
  request({
    url: `/basicApi/sysUser/findUserList`,
    method: "get",
    params
  });
