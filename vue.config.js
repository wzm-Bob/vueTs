const path = require("path");
const webpack = require("webpack");
module.exports = {
  productionSourceMap: true,
  runtimeCompiler: true,
  lintOnSave:false,
  //baseUrl: process.env.NODE_ENV === 'production' ? '/online/' : '/',
  devServer: {
    port: 8080, // 端口号
    https: false,
    overlay: {
      warnings: true,
      errors: true
    },
    open: true,
    proxy: {
      "/basicApi": {
        target: "http://10.18.28.199:5093/mlfp-basic/",
        changeOrigin: true,
        pathRewrite: {
          "^/basicApi": ""
        }
      },
      "/policyApi": {
        target: "http://10.18.28.199:5092/mlfp-policy/",
        changeOrigin: true,
        pathRewrite: {
          "^/policyApi": ""
        }
      },
      "/authApi": {
        target: "http://10.18.28.199:5090/",
        changeOrigin: true,
        pathRewrite: {
          "^/authApi": ""
        }
      },
      "/analysisApi": {
        target: "http://10.18.28.236:9094/mlfp-analysis",
        changeOrigin: true,
        pathRewrite: {
          "^/analysisApi": ""
        }
      }
    }
  },
  configureWebpack: {
    plugins: []
  }
};
