import request from "@/utils/axios";

// 查询分析年份和批次
export const getFindAnalysisYear = (params: any) =>
  request({
    url: `/analysisApi/policyAnalysis/findAnalysisYear`,
    method: "get",
    params
  });
