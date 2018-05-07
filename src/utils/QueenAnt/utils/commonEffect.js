import { notification } from 'antd';
import utils from './utils';
import request from './request.js';

const { easyFetch } = request;

function* common(action, { call, put }) {
  let headers = {
    Timestamp: new Date().getTime(),
    Language: 'en',
    // Country: 'CN',
    'Client-Id': 401,
  };
  if (!action.payload.noUserHeaders) {
    if (utils.getUserInfo()) {
      headers = {
        ...headers,
        // 'Account-Code': utils.getUserInfo(),
        'Access-Token': utils.getUserInfo().accesstoken,
      };
    }
  }

  const query = {
    method: action.payload.method || 'GET',
    url: action.payload.url,
    queryParams: { ...action.payload.queryParams },
    // 默认post请求时为'application/json; charset=UTF-8'， 参数queryParams以json字符串形式传给后台
    contentType: action.payload.contentType,
    headers,
    // headers: { 'User-Id': userId, Ticket: token },
  };
  // console.log('query------->', query);
  if (!action.payload.cancelLoading) yield put({ type: 'setLoading' });
  const responseJson = yield call(() => easyFetch(query));
  if (!action.payload.cancelLoading) yield put({ type: 'clearLoading' });

  if (responseJson) {
    const { code, message: msg } = responseJson;
    const { success, fail } = action.payload;
    if (code !== undefined && code !== 0 && code !== '0') {
      if (typeof fail === 'function') {
        const nextAction = fail(responseJson);
        if (nextAction) {
          yield put(nextAction);
        }
      }
      notification.warning({
        message: `${msg}`,
        // description: `Error code : ${code}`,
      });

      dealWithCode(responseJson);
    } else if (typeof success === 'function') {
      const nextAction = success(responseJson);
      if (nextAction) {
        yield put(nextAction);
      }
    }
  }
}

function dealWithCode(originData) {
  const { code, data } = originData;

  switch (code) {

    case 11143029:
      let url = '';
      if (data) {
        const { userCode } = data;
        if (userCode) {
          url = `/#/invalid_token?usercode=${userCode}`;
        } else {
          url = '/#/register';
        }
        utils.jumpToRegister(url);
      }
      break;

    default: break;
  }
}

export default common;
