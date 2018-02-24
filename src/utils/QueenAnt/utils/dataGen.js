// 版本V1.0.0
// 更新日期 2017年11月15日15:59:18
import {
  Select,
} from 'antd';

// const log = console.log.bind(console);
const log = () => { };
// dict对象格式
// dict:{
//   one:{
//     title:'Foo',
//     default:'0'
//     render:(text)=>{},

//   },
//   Two:{
//     title:'Bar',
//     default:'1'
//     render:(text)=>{},
//   }
// }

const hasKey = (obj, key) => {
  if (obj && key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  } else {
    return false;
  }
};

const genSelectOptions = (dataObj) => {
  const Option = Select.Option;
  const options = [];
  for (const key in dataObj) {
    if (hasKey(dataObj, key)) {
      options.push(
        <Option
          key={dataObj[key].value}
        >
          {dataObj[key].label}
        </Option>);
    }
  }
  return options;
};
const genRadioOptions = () => { };
// 如果keys参数被省略,则把全部的输出

function getWith(typicalMax) {
  const defaultWidth = 150;
  if (typicalMax) {
    // 一个汉字/全角字符的宽度大概等于两个半半角字符 ,所以用xx.来代替
    // const str = typicalMax.replace(/[^\x00-\xff]/g, 'xx.');
    const str = typicalMax.replace(/[^\x00-\xff]/g, 'xx-');
    // log(str);
    return Math.round(str.length * 185 / 25, 0);
  } else {
    return defaultWidth;
  }
}
const genTableColumns = (dict, keys) => {
  // log('dict', dict);
  if (dict) {
    const keyArr = keys || Object.keys(dict);
    // log('keyArr', keyArr);
    const columns = keyArr.map((key) => {
      // log('key', key);
      const { title, render, typicalMax, className } = dict[key];
      const width = typicalMax ? getWith(typicalMax) : dict[key].width;
      log(key, width);
      return {
        title,
        width,
        render,
        key,
        dataIndex: key,
        className,
      };
    });
    log(columns);
    return columns;
  }
};
const genAllKeys = (obj) => {
  if (obj) {
    return Object.keys(obj);
  }
};


export default {
  hasKey,
  genSelectOptions,
  genRadioOptions,
  genTableColumns,
  genAllKeys,

};
