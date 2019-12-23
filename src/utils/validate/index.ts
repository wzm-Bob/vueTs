export const validation = {
  isArray: (arg: any) => {
    if (typeof Array.isArray === "undefined") {
      return Object.prototype.toString.call(arg) === "[object Array]";
    }
    return Array.isArray(arg);
  },

  isValidURL: (url: string) => {
    const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return reg.test(url);
  },
  // 非空校验
  require: (rule: any, value: string, callback: Function) => {
    if (value === "" || value === null || value === undefined) {
      callback(new Error("这个必须要填哦！"));
    } else {
      callback();
    }
  },
  // 非空校验 提示文字字数控制
  requireThree: (rule: any, value: string, callback: Function) => {
    if (value === "" || value === null || value === undefined) {
      callback(new Error("必填项！"));
    } else {
      callback();
    }
  },
  //籍贯地址非空校验
  addressRequire: (rule: any, value: string, callback: Function) => {
    let len = value.length || "";
    if (len == 0) {
      callback(new Error("这个必须要选哦！"));
    } else {
      callback();
    }
  },
  // 字数长度校验，不超过4字
  valiCodeLengthRule4: (rule: any, value: string, callback: Function) => {
    let len = value.length;
    if (len != 4) {
      callback(new Error("验证码长度为4个哦！"));
    } else {
      callback();
    }
  },
  // 字数长度校验，不超过15字
  inpLengthRule15: (rule: any, value: string, callback: Function) => {
    let len = value.length;
    if (len > 15) {
      callback(new Error("不超过15个字"));
    } else {
      callback();
    }
  },
  // 字数长度校验，不超过32字
  inpLengthRule: (rule: any, value: string, callback: Function) => {
    if (value === "" || value === null || value === undefined) {
      callback();
    } else {
      let len = value.length;
      if (len > 32) {
        callback(new Error("不超过32个字"));
      } else {
        callback();
      }
    }
  },
  // 字数长度校验，不超过64字
  inpLengthRule64: (rule: any, value: string, callback: Function) => {
    if (value === "" || value === null || value === undefined) {
      callback();
    } else {
      let len = value.length;
      if (len > 64) {
        callback(new Error("不超过64个字"));
      } else {
        callback();
      }
    }
  },
  // 长文本字数校验不超过512字
  LongTextRule: (rule: any, value: string, callback: Function) => {
    let len = value.length || "";
    if (len > 512) {
      callback(new Error("不超过512个字"));
    } else {
      callback();
    }
  },
  // 审批意见字数长度校验，不超过250字
  opinonMsgRule: (rule: any, value: string, callback: Function) => {
    if (value === undefined || value === null) {
      callback();
    } else {
      let len = value.length || "";
      if (len > 250) {
        callback(
          new Error("不超过250个字（包括空格、回车、标点符号、特殊字符）")
        );
      } else {
        callback();
      }
    }
  },
  // 字数长度校验，不超过200字
  opinonMsgRule200: (rule: any, value: string, callback: Function) => {
    if (value === undefined || value === null) {
      callback();
    } else {
      let len = value.length || "";
      if (len > 200) {
        callback(
          new Error("不超过200个字（包括空格、回车、标点符号、特殊字符）")
        );
      } else {
        callback();
      }
    }
  },
  // 审批意见字数长度校验，不超过100字
  opinonMsgRule100: (rule: any, value: string, callback: Function) => {
    if (value === undefined || value === null) {
      callback();
    } else {
      let len = value.length || "";
      if (len > 100) {
        callback(
          new Error("不超过100个字（包括空格、回车、标点符号、特殊字符）")
        );
      } else {
        callback();
      }
    }
  },
  // 字数长度校验，不超过15字
  nameLengthRule: (rule: any, value: string, callback: Function) => {
    if (value === "" || value === null || value === undefined) {
      callback();
    } else {
      let len = value.length || "";
      if (len > 15) {
        callback(new Error("不超过15个字"));
      } else {
        callback();
      }
    }
  },
  // 身份证合法验证/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/
  // //(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])
  isIdCardNo: (rule: any, value: string, callback: Function) => {
    if (
      !/^(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)$/.test(
        value
      )
    ) {
      callback(new Error("请输入正确的身份证号码!"));
    } else {
      callback();
    }
  }, // 邮编验证
  isZipCode: (rule: any, value: string, callback: Function) => {
    if (!/^[0-9]{6}$/.test(value)) {
      callback(new Error("请正确填写邮政编码!"));
    } else {
      callback();
    }
  }, // 电话号码合法验证 /^1\d{10}$/  /^1[3|4|5|8][0-9]\d{4,8}$/ || value.length != 11
  isMobile: (rule: any, value: string, callback: Function) => {
    if (!/^(1[3567984]\d{9})$/.test(value)) {
      callback(new Error("请正确填写手机号码!"));
    } else {
      callback();
    }
  }, //银行卡号合法16-19位
  isBackId: (rule: any, value: string, callback: Function) => {
    if (!/^([1-9]{1})(\d{15}|\d{18})$/.test(value)) {
      callback(new Error("请正确填写您的银行卡号!"));
    } else {
      callback();
    }
  }, // 中文汉字验证
  isChinese: (rule: any, value: string, callback: Function) => {
    if (!/^[\u4E00-\u9FA5]{0,}$/.test(value)) {
      callback(new Error("内容只能包括中文文字!"));
    } else {
      callback();
    }
  },
  // 排除特殊字符验证
  isChineseCharacters: (rule: any, value: string, callback: Function) => {
    let reg = new RegExp(
      "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）|{}【】‘；：”“'。，、？%+———— ]"
    );
    if (reg.test(value)) {
      callback(new Error("内容不能出现特殊字符!"));
    } else {
      callback();
    }
  }, // （1~4）位非负整数验证
  nonnegativeInteger: (rule: any, value: string, callback: Function) => {
    if (!/^\d{1,4}$/.test(value)) {
      callback(new Error("输入内容必须为(1~4)位非负整数！"));
    } else {
      callback();
    }
  },
  // 5位数字验证
  userNumber: (rule: any, value: string, callback: Function) => {
    if (
      value !== "" &&
      value !== null &&
      value !== undefined &&
      !/^\d{5}$/.test(value)
    ) {
      callback(new Error("工号为5位数字！"));
    } else {
      callback();
    }
  },
  // 10位数字验证
  isTenDigit: (rule: any, value: string, callback: Function) => {
    if (!/^\d{10}$/.test(value)) {
      callback(new Error("输入内容必须为10位数字！"));
    } else {
      callback();
    }
  },
  // 数字
  isNumber: (rule: any, value: string, callback: Function) => {
    if (!/^100$|^(\d|[1-9]\d)(\.\d{1,2})*$/.test(value)) {
      callback(new Error("内容必须为(0~100)的数字（可保留到2位小数)"));
    } else {
      callback();
    }
  },
  // 数字
  examNumber: (rule: any, value: string, callback: Function) => {
    if (
      value !== "" &&
      value !== null &&
      value !== undefined &&
      !/^([1-4][0-9]{2}|500|[1-9]?[0-9])$/.test(value)
    ) {
      callback(new Error("请输入0~500的整数"));
    } else {
      callback();
    }
  },
  // 数字0~8位可为空，如果输入多位，第一位不能为0
  isNumber8: (rule: any, value: string, callback: Function) => {
    if (value != "" && !/^(0|[1-9]\d{0,7})(\.\d{1,2})?$/.test(value)) {
      callback(new Error("最多8位整数(可保留2位小数)"));
    } else {
      callback();
    }
  },
  // 数字0~8位可为空，如果输入多位，第一位不能为0
  isNumber10: (rule: any, value: string, callback: Function) => {
    if (value != "" && !/^(0|[1-9]\d{0,9})(\.\d{1,2})?$/.test(value)) {
      callback(new Error("最多10位整数(可保留2位小数)"));
    } else {
      callback();
    }
  },

  // 数字0~10位，如果输入多位，第一位不能为0
  isNumber10ForRequire: (rule: any, value: string, callback: Function) => {
    if (value != "" && !/^(0|[1-9]\d{0,9})(\.\d{1,2})?$/.test(value)) {
      callback(new Error("最多10位整数(可保留2位小数)"));
    } else if (value == "" || value == null) {
      callback(new Error("数字不能为空"));
    } else {
      callback();
    }
  },
  // 正数
  isPositive: (rule: any, value: string, callback: Function) => {
    if (!/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(value)) {
      callback(new Error("输入必须为正数"));
    } else if (value === null || value === "") {
      callback(new Error("输入必须为正数"));
    } else {
      callback();
    }
  },
  //缴纳比为百分数，最多两位小数点
  isPercent: (rule: any, value: string, callback: Function) => {
    if (value) {
      if (!/^(100|(([1-9]\d|\d)(\.\d{1,2})?))$/.test(value)) {
        callback(new Error("请输入合法的缴纳比!"));
      } else {
        callback();
      }
    } else {
      callback();
    }
  },
  // 排除特殊字符验证 项目名称可以输入+号 (可以输入加号|斜杠|顿号|括号 中英文)
  isProjectName: (rule: any, value: string, callback: Function) => {
    if (
      new RegExp("[`~!@#$^&*=|':;',.<>?~！@#￥……&*‘；：”“'。，？%———— ]").test(
        value
      )
    ) {
      callback(new Error("内容不能出现特殊字符!"));
    } else {
      callback();
    }
  }
};
