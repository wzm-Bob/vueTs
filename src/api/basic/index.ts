import request from "@/utils/axios";

//贫困户管理贫困户列表接口接口修改
export const getPoorFamilyList = (params: any) =>
  request({
    url: `/basicApi/poorFamily/getPoorFamilyList`,
    method: "get",
    params
  });

//行政区划树
export const getAdministrativeTree = (params: any) =>
  request({ url: `/basicApi/poorFamily/poorTree`, method: "get", params });

//户列表头部数据
export const getPoorListCount = (params: any) =>
  request({ url: `/basicApi/poorFamily/getPoorCount`, method: "get", params });

//户详情数据
export const getPoorDetail = (params: any) =>
  request({ url: `/basicApi/poorFamily/input`, method: "get", params });

//户成效数据
export const getTcysZbView = (params: any) =>
  request({ url: `/basicApi/fpcx/cxzb`, method: "get", params });

//获取贫困状态
export const getPoorState = (params: any) =>
  request({ url: `/basicApi/dict/getDictTypeByName`, method: "get", params });

// 贫困村数据获取
export const getPoorVillage = (params: any) =>
  request({ url: `/basicApi/filVillage/findList`, method: "get", params });

// 贫困村详情数据
export const getVillageDetail = (params: any) =>
  request({ url: `/basicApi/filVillage/input`, method: "get", params });

// 贫困村驻村工作
export const getVillageHelp = (params: any) =>
  request({
    url: `/basicApi/filVillage/villageHelpList`,
    method: "get",
    params
  });

// 贫困村成效动态
export const getVillageEffect = (params: any) =>
  request({ url: `/basicApi/poorHelp/pkcEdit`, method: "get", params });

// 村列表头部数据
export const getVillageListCount = (params: any) =>
  request({
    url: `/basicApi/filVillage/findVillageCount`,
    method: "get",
    params
  });

export const getFpkVillageCount = (params: any) =>
  request({
    url: `/basicApi/filVillage/findFpkVillageCount`,
    method: "get",
    params
  });

//乡镇表头数据
export const getTownCount = (params: any) =>
  request({ url: `/basicApi/filTown/findTownCount`, method: "get", params });

// 乡镇数据获取
export const getTown = (params: any) =>
  request({ url: `/basicApi/filTown/findList`, method: "get", params });

// 成员列表
export const getMemberListByPoorId = (params: any) =>
  request({
    url: `/basicApi/poorFamily/findMenberListByPoorId`,
    method: "get",
    params
  });

// 成员详情
export const getMemberInfo = (params: any) =>
  request({
    url: `/basicApi/poorFamily/findMemberInfoById`,
    method: "get",
    params
  });

// 帮扶负责人数据
export const getHelpList = (params: any) =>
  request({ url: `/basicApi/poorFamily/poorBfzrr`, method: "get", params });

//脱贫措施数据
export const getTpcsListByPoorId = (params: any) =>
  request({ url: `/basicApi/poorFamily/poorTpcs`, method: "get", params });

//脱贫措施详情数据
export const getCsDetail = (params: any) =>
  request({ url: `/basicApi/poorFamily/cxdetail`, method: "get", params });

//帮扶工作动态数据
export const getLogListByPoorId = (params: any) =>
  request({ url: `/basicApi/poorFamily/log`, method: "get", params });

//成效指标规则数据
export const getZbRuleByDataYear = (params: any) =>
  request({ url: `/basicApi/fpcx/rule`, method: "get", params });

// 上一户下一户
export const nextFamily = (params: any) =>
  request({
    url: `/basicApi/poorFamily/findPreviousNextPoorId`,
    method: "get",
    params
  });

// 工作汇报保存
export const saveReportInfo = (data: any) =>
  request({ url: `/basicApi/report/saveReporInfo`, method: "post", data });

// 工作汇报查询
export const findReporInfo = (params: any) =>
  request({ url: `/basicApi/report/findReporInfo`, method: "get", params });

//数据质量贫困户存疑数据列表接口
export const getPoorFamilyCysjList = (params: any) =>
  request({
    url: `/basicApi/poorFamily/getPoorFamilyCysjList`,
    method: "get",
    params
  });

//数据质量头部数据
export const getPoorListCysjCount = (params: any) =>
  request({
    url: `/basicApi/poorFamily/getPoorCysjCount`,
    method: "get",
    params
  });

//数据存疑属性
export const getPoorFamilySjhcSx = (params: any) =>
  request({
    url: `/basicApi/poorFamily/getPoorFamilySjhcSx`,
    method: "get",
    params
  });

export const getPoorFamilySubType = (params: any) =>
  request({
    url: `/basicApi/poorFamily/getPoorFamilySubType`,
    method: "get",
    params
  });

//村脱贫成效数据接口
export const getVillageTcysZhiBView = (params: any) =>
  request({
    url: `/basicApi/filVillage/getVillageTcysZhiBView`,
    method: "get",
    params
  });

//监测规则库
export const getRules = (params: any) =>
  request({ url: `/basicApi/poorFamily/getRules`, method: "get", params });

//数据质量概况
export const getZlgkList = (params: any) =>
  request({ url: `/basicApi/poorFamily/getZlgkList`, method: "get", params });

//数据质量概况详情
export const getClassList = (params: any) =>
  request({ url: `/basicApi/poorFamily/getClassList`, method: "get", params });

//数据质量排行
export const getDxhcZhis = (params: any) =>
  request({ url: `/basicApi/poorFamily/getDxhcZhis`, method: "get", params });

//监管进度排行
export const getDxhcJinDu = (params: any) =>
  request({ url: `/basicApi/poorFamily/getDxhcJinDu`, method: "get", params });

// 村公示公告
export const getFilelistService = (params: any) =>
  request({ url: `/basicApi/fileGet/getFilesList`, method: "get", params });
