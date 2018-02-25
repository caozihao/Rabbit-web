import { message, notification } from 'antd';
import pathToRegexp from 'path-to-regexp';
import constants from '../../config/constant';
import md5 from 'md5';

const setItem = (key, value) => {
  window.localStorage.setItem(key, value);
};

const getItem = (key) => {
  return window.localStorage.getItem(key);
};

const logOut = () => {
  window.localStorage.removeItem(constants.storage.userInfo);
  window.localStorage.removeItem(constants.storage.coinTypes);
};

const clearItem = (key) => {
  window.localStorage.removeItem(key);
};

const getUserInfo = () => {
  const USR_INFO = constants.storage.userInfo;
  let userInfo = null;
  if (getItem(USR_INFO)) {
    try {
      userInfo = JSON.parse(getItem(USR_INFO));
    } catch (e) {
      // console.log('读取用户信息错误');
    }
  }
  return userInfo;
};

const getCoinType = () => {
  const COIN_TYPE = constants.storage.coinTypes;
  let coinType = null;
  if (getItem(COIN_TYPE)) {
    try {
      coinType = JSON.parse(getItem(COIN_TYPE));
    } catch (e) {
      // console.log('读取用户信息错误');
    }
  }
  return coinType;
};


const saveUserInfo = (userInfo) => {
  const USR_INFO = constants.storage.userInfo;
  setItem(USR_INFO, JSON.stringify(userInfo));
};
const isLogin = () => {
  return !!getUserInfo();
};

// 是否设置了交易密码
// const hasTradePassword = () => {
//   const { hasTradePassword: result } = getUserInfo();
//   return result;
// };

const hasCoinTypes = () => {
  return !!getCoinType();
};

const goToUrl = (url) => {
  window.location = url;
};

const checkResultData = (data, { suc, fail }) => {
  const { code } = data;
  if (code === '0' || code === 0) {
    suc.fun && suc.fun(data);
    suc.mes && message.success(suc.mes, 3);
    return true;
  } /* else if (!code && code !== 0) {
    fail.fun && fail.fun(data);
    fail.mes && notification.error({
      message: `${fail.mes}`,
      description: `错误码${code}`,
    });
    return false;
  } */
};

const getWindowWidth = () => {
  let winWidth = '';
  if (window.innerWidth) {
    winWidth = window.innerWidth;
  } else if ((document.body) && (document.body.clientWidth)) {
    winWidth = document.body.clientWidth;
  }
  return winWidth;
};


const getIdFromLocation = (location, pattern) => {
  const { pathname } = location;
  const match = pathToRegexp(pattern).exec(pathname);
  const id = match ? match[1] : false;
  return id;
};

const setPassword = (password, type) => {
  const salt = constants[type];
  return md5(`${password}${salt}`);
};

const dealConstant = (value, type) => {
  let str = '';
  constants[type].some((v, i) => {
    if (value === parseInt(v.value)) {
      str = v.name;
      return true;
    }
  });
  return str;
};

export default {
  getUserInfo,
  saveUserInfo,
  clearItem,
  setItem,
  getItem,
  goToUrl,
  setPassword,
  checkResultData,
  getWindowWidth,
  dealConstant,
  getIdFromLocation,
  isLogin,
  logOut,
  // hasTradePassword,
  hasCoinTypes,
  getCoinType,
};
