import request from "@/utils/axios";
//  获取行政区划数据
export const getAreaNameByParent = (params: any) =>
  request({ url: "/basicApi/getAreaNameByParent", method: "get", params });

// 根据字典类型值获取字典类型
export const getDictType = (params: any) =>
  request({ url: "/basicApi/dict/getDictType", method: "get", params });

// 根据字典类型值及字典值获取字典名称
export const getDictTypeByName = (params: any) =>
  request({ url: "/basicApi/dict/getDictTypeByName", method: "get", params });

// 获取导航行政行政区划
export const getAreaCodeCascading = (params: any) =>
  request({ url: "/basicApi/getAreaCodeCascading", method: "get", params });

// 获取片区
export const getPqList = () =>
  request({ url: "/basicApi/getDistrictList", method: "get" });
