// version:1.0.0
// updated:2017-12-6 14:17:30

import { message, notification } from 'antd';
import fetch from 'dva/fetch';
import utils from './utils';
import giftService from '../../../services/gift';
// import whi from '../../utils/whi';
// import log from '../log';

function jumpToLogin() {
  utils.goToUrl('#/login');
}

function handleHttpError(code, msg, url) {
  let result = {};
  switch (code) {
    // 登陆失效
    case 401:
      notification.warning({
        message: '提示',
        description: '登陆失效，请重新登录',
      });
      utils.logOut();
      jumpToLogin();
      result = false;
      break;
    // 签名错误
    // 新人有礼页面做特殊处理，不报错且返回值
    case 403:
      if (url === giftService.getCompletedInfo) {
        result = {
          code: 0,
          message: "用户还没登录",
          data: {}
        }
      } else {
        notification.error({
          message: `${code}: ${url}`,
          description: msg,
        });
        result = false;
      }
      break;
    // 其他错误
    default:
      notification.error({
        message: `${code}: ${url}`,
        description: msg,
      });
      result = false;
  }
  return result;
}

const genQueryString = (dataObj) => {
  if (dataObj) {
    const queryArr = [];
    for (const itemKey in dataObj) {
      if (Object.prototype.hasOwnProperty.call(dataObj, itemKey)) {
        // 去掉字符串里的所有空格
        let itemValue = "";
        if (typeof dataObj[itemKey] === 'string') {
          itemValue = dataObj[itemKey].replace(/(^\s*)|(\s*$)/g, "");
        } else {
          itemValue = dataObj[itemKey];
        }

        if (typeof itemValue === 'object') {
          itemValue = JSON.stringify(itemValue);
        }
        itemValue = encodeURIComponent(itemValue);
        queryArr.push(`${itemKey}=${itemValue}`);
      }
    }
    return queryArr.join('&');
  } else {
    return '';
  }
};

/**
 * @作用:发送ajax请求
 * @参数:options = {url,method,[queryParams],[contentType = json],[headers]}
 * @url:没有请求参数的baseUrl
 * @method:GET | POST 发送其他类型的请求会被拒绝并提示
 * @queryParams:请求参数, 对象,可以不传
 * @contentType: 目前支持三种
 * application/json,application/x-www-form-urlencoded,multipart/form-data,检测到这三种会自动转换body中数据的格式
 * @headers: 除contentType之外, 要在头中加入的额外内容
 * @param {any} options
 * @returns
 */
async function easyFetch(options) {
  // fetch(url,options)
  // options = {method,headers,body,跨域参数, cache参数等}
  // 方法为get时, 请求参数需要自己拼成queryString加到url上
  // 方法为post时,请求参数放到body里面,header中要加入Content-Type

  // 刷新登陆信息 ,防止登陆过期
  // whi.setInterfaceOverdueTime();

  const { url: baseUrl, method, queryParams, contentType, headers } = options;
  // console.log('easy fetch options', options);
  let url = baseUrl;
  const queryOptions = {
    // 允许跨域
    mode: 'cors',
    cache: 'default',
    method,
  };

  if (method === 'GET') {
    const qs = genQueryString(queryParams);
    if (qs) {
      url = `${baseUrl}?${qs}`;
    }
    if (headers) {
      queryOptions.headers = headers;
    }

    // console.log('queryOptions------->', queryOptions);
  } else if (method === 'POST') {
    console.log('contentType ->', contentType);
    // 设定默认的post content-type
    // const postContentType = contentType || 'application/x-www-form-urlencoded; charset=UTF-8';
    // const postContentType = contentType || 'multipart/form-data';
    const postContentType = contentType || 'application/json; charset=UTF-8';
    // headers header中的额外字段
    if (headers) {
      queryOptions.headers = {
        'Content-Type': postContentType,
        ...headers,

      };
    } else {
      queryOptions.headers = { 'Content-Type': postContentType };
    }
    // console.log('queryOptions.headers------->', queryOptions.headers);

    // post请求数据直接发到body中去
    if (queryParams) {
      // 根据不同的contentType来用不同的方式处理数据并发出
      if (postContentType.includes('json')) {
        queryOptions.body = JSON.stringify(queryParams);
      } else if (postContentType.includes('x-www-form-urlencoded')) {
        queryOptions.body = genQueryString(queryParams);
      } else if (postContentType.includes('form-data')) {
        // 传入FormData对象的实例,就会自动加content-type和boundry
        // queryOptions.headers['Content-Type'] = undefined;
        const formData = new FormData();
        const keys = Object.keys(queryParams);
        for (let i = 0; i < keys.length; i += 1) {
          const itemKey = keys[i];
          const itemValue = queryParams[itemKey];
          formData.append(itemKey, itemValue);
        }
        queryOptions.body = formData;
      }
    }
  } else {
    message.error('请求方法不是POST 或者 GET');
  }

  console.log('queryOptions ->', queryOptions);

  const res = await fetch(url, queryOptions);
  // 这里的ok是指状态码为200~299
  if (res.ok) {
    const json = await res.json();
    // jumpToLoginIfTimeout(json);
    return json;
  } else {
    // message.error(`网络请求错误 http Error: ${res.status} ${res.statusText}`, 5);
    return handleHttpError(res.status, res.statusText, url);
    // notification.error({
    //   message: `${res.status}: ${res.url}`,
    //   description: res.statusText,
    // });
    // return false;
  }
}
// 根据返回数据中的code来判断是否是登陆失效,如果失效,跳转到登录页
// const jumpToLoginIfTimeout = (json) => {
//   let { code } = json;
//   code = code.toString();
//   // 错误码说明
//   // 11020019: ticket过期，需要重新登录
//   // 11020021: 登录失效
//   if (code === '11020019' || code === '11020021') {
//     // alert('登陆失效');
//     console.log('登陆失效,准备跳转到登录页');
//     utils.goHref('/#/login');
//   }
// };


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  notification.error({
    message: `${response.status}: ${response.url}`,
    description: response.statusText,
  });
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => response.json())
    .catch((error) => {
      if (error.code) {
        notification.error({
          message: error.name,
          description: error.message,
        });
      }
      if ('stack' in error && 'message' in error) {
        notification.error({
          message: `请求错误: ${url}`,
          description: error.message,
        });
      }
      return error;
    });
}


export default { easyFetch, genQueryString, request };
