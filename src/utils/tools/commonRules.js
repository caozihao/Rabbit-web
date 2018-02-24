

export default {
  required: {
    required: true,
    message: '不能为空',
  },
  int: {
    // type: 'integer',
    pattern: /[+-]?[0-9]*\.?[0-9]+$/,
    message: '请输入数字',
  },

  positiveInt: {

  },
  float: {
    type: 'float',
    message: '请输入数字',
  },
  positiveFloat8bit: {
    pattern: /^[0-9]*\.?[0-9]{0,8}$/,
    message: '请输入正数,小数部分最多8位',
  },
  legalCurreny: {
    pattern: /^[0-9]*\.?[0-9]{0,2}$/,
    message: '请输入正数,小数部分最多2位',
  },

};
