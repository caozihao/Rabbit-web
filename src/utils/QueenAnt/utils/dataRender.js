// version 1.0.0
// updated: 2017年11月22日17:15:26

import moment from 'moment';
import { Tag, Badge } from 'antd';

moment.locale('zh-cn');

function roundUp(num, bit = 2) {
  const precision = 10 ** bit;
  return Math.ceil(num * precision) / precision;
}

// 表格数据渲染函数集合
function formatDate(date, withTime = true) {
  if (typeof date === 'undefined') {
    return '';
  }
  const m = moment(date);
  if (withTime) {
    return m.format('YYYY-MM-DD HH:mm');
  } else {
    return m.format('YYYY-MM-DD');
  }
}
function formatFloat(num, comma = true, fixed = 2) {
  let result = num;
  if (typeof fixed !== 'undefined') {
    result = roundUp(result, fixed).toFixed(fixed);
  }
  if (comma) {
    result = getNumWithCommas(result);
  }
  return result;
}

// 数字增加千分位分隔符
function getNumWithCommas(num, separator = ',') {
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return parts.join('.');
}

function formatMoney(value, prefix = '￥', suffix = '', colored = true, fixed = 2) {
  let content = value;
  let style = {};
  if (value) {
    if (value < 0) {
      style = { color: 'red' };
    } else if (colored) {
      style = { color: 'green' };
    }
    const number = formatFloat(value, true, fixed);
    content = (<span style={style} >{`${prefix}${number}${suffix}`}</span>);
    // content = (<span style={style} >{number}</span>);
  } else if (value === 0) {
    content = '-';
  }
  const result = (<div style={{ textAlign: 'right' }}>{content}</div>);
  return result;
}
function formatPercent(value, digitNumber = 1) {
  if (typeof value === 'undefined') {
    return '';
  }
  return `${(value * 100).toFixed(digitNumber)}%`;
}

function genArr(num, content) {
  if (num <= 0) {
    return;
  }
  const result = [];
  for (let i = 0; i < num; i++) {
    result.push(content);
  }
  return result;
}

const dataRender = {
  renderTime: (text, index, record) => {
    return formatDate(text, true);
  },
  renderDate: (text, index, record) => {
    return formatDate(text, false);
  },
  renderBool: (text, index, record) => {
    return text ? '是' : '否';
  },
  renderPercent: (text, index, record) => {
    return formatPercent(text, 2);
  },
  renderMoney: (prefix = '￥', suffix = '', colored = true, fixed = 2) => {
    return (text) => {
      return formatMoney(text, prefix, suffix, colored, fixed);
    };
  },
  renderNumber: (text) => {
    return getNumWithCommas(text);
  },
  renderFloat: (fixed) => {
    return (text) => {
      return formatFloat(text, true, fixed);
    };
  },
  // renderInt: (text) => {
  //   let result = text
  // },
  renderTitle: (text, index, record) => {
    return <span style={{ fontWeight: 'bold' }} >{text}</span>;
  },
  renderTag: (color = 'blue') => {
    return (text) => {
      return <Tag color={color} >{text}</Tag>;
    };
  },
  renderMoment: (format = 'YYYY-MM-DD HH:mm') => {
    return (text) => {
      if (text) {
        return moment(text).format(format);
      } else {
        return '';
      }
    };
  },
  renderPhone: (text) => {
    return `${text.substr(0, 3)}-${text.substr(3, 4)}-${text.substr(7, 4)}`;
  },
  renderId: (text) => {
    // 身份证号脱敏展示
    if (!text) {
      return;
    }
    const len = text.length;
    if (len < 15) {
      return text;
    } else {
      const head = text.substr(0, 4);
      const tail = text.substr(-4, 4);
      const middle = genArr(len - 8, '*');
      return `${head}${middle.join('')}${tail}`;
    }
  },
  renderSuccessFail: (text) => {
    let result = text;
    const keywords = {
      success: '成功 已',
      error: '失败 错误',
      warning: '未',
      processing: '正在 审核中',
    };
    const types = Object.keys(keywords);
    for (const type of types) {
      const words = keywords[type].split(/\s+/);
      const regStr = words.map(word => `(${word})`).join('|');
      const reg = new RegExp(regStr, 'g');
      if (reg.test(text)) {
        result = (<span><Badge status={type} />{text}</span>);
        return result;
      }
    }
    return result;
  },
  formatDate,
  formatFloat,
  formatPercent,
  formatMoney,
};

export default dataRender;
