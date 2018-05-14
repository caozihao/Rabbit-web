

const language = 'EN';

// const word = {
//   required: {
//     required: true,
//     message: '不能为空',
//   },
//   int: {
//     // type: 'integer',
//     pattern: /[+-]?[0-9]*\.?[0-9]+$/,
//     message: '请输入数字',
//   },
//   positiveInt: {

//   },
//   float: {
//     type: 'float',
//     message: '请输入数字',
//   },
//   positiveFloat8bit: {
//     pattern: /^[0-9]*\.?[0-9]{0,8}$/,
//     message: '请输入正数,小数部分最多8位',
//   },
//   legalCurreny: {
//     pattern: /^[0-9]*\.?[0-9]{0,2}$/,
//     message: '请输入正数,小数部分最多2位',
//   },
//   cellphone: {
//     // pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
//     pattern: /^1[0-9]{10}$/,
//     message: '手机号码不正确',
//   },
//   email: {
//     pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
//     message: '邮箱不正确'
//   },
//   password: {
//     pattern: /^[a-zA-Z0-9]*([a-zA-Z][0-9]|[0-9][a-zA-Z])[a-zA-Z0-9]*$/,
//     message: '密码不能为纯数字或者纯字母'
//   }
// };

const validateDict = {
  require: (item) => {
    return {
      CN: `${item}不能为空`,
      EN: `${item} can't be empty`,
    }
  },
  email: {
    pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
    message: {
      CN: '邮箱不正确',
      EN: 'Unqualified mailbox',
    }
  },
  phone: {
    pattern: /^1[0-9]{10}$/,
    message: {
      CN: '手机号不正确',
      EN: 'Unqualified phone',
    }
  },
  password: {
    pattern: /^[a-zA-Z0-9]*([a-zA-Z][0-9]|[0-9][a-zA-Z])[a-zA-Z0-9]*$/,
    message: {
      CN: '并且不能是纯数字或纯字母',
      EN: `The password must contain a mix of letters and numbers`,
    }
  }
}
const otherMessageDict = {
  '密码': (item, len) => {
    return {
      max: {
        CN: `${item} 不能超过 ${len} 位`,
        EN: `The ${item} can't be greater than ${len} word`,
      },
      min: {
        CN: `${item} 不能少于 ${len} 位`,
        EN: `The ${item} can't be less than ${len} word`,
      },
      same: {
        CN: `${item} 不相同`,
        EN: `The two ${item} are not the same`,
      },
    }
  }
}

// 没有数据的信息
const requireMessage = (param, item, language = 'CN') => {
  return validateDict[param](item)[language];
}

// 验证数据的信息
const validate = (param, language = 'CN') => {
  const pattern = validateDict[param].pattern;
  const message = validateDict[param].message[language];
  return {
    pattern,
    message
  }
}

// 其他信息
const otherMessage = (param, type, len, language = 'CN') => {
  return otherMessageDict[param](param, len)[type][language];
}

export default {
  validate,
  requireMessage,
  otherMessage
};
