import { notification } from 'antd';
import utils from './utils';
import { easyFetch } from './request';

const log = console.log.bind(console);

function* common(action, { call, put }) {
  let headers = {
    Timestamp: new Date().getTime(),
    Language: 'zh',
    Country: 'CN',
    'Client-Id': 503,
  };
  if (!action.payload.noUserHeaders) {
    if (utils.getUserInfo()) {
      const { accountCode, accessToken } = utils.getUserInfo();
      headers = {
        ...headers,
        'Access-Token': accessToken || '',
        'Account-Code': accountCode || '',
        // 'Account-Code': '402517619816529920',

      };
    }
  }

  const query = {
    method: action.payload.method || 'GET',
    url: action.payload.url,
    queryParams: { ...action.payload.queryParams },
    contentType: action.contentType,
    headers,
    // headers: { 'User-Id': userId, Ticket: token },
  };
  console.log('query------->', query);
  yield put({ type: 'setLoading' });
  const responseJson = yield call(() => easyFetch(query));
  yield put({ type: 'clearLoading' });
  if (responseJson) {
    const { code, message: msg } = responseJson;
    const { success, fail } = action.payload;
    if (code !== 0 && code !== '0') {
      if (typeof fail === 'function') {
        const nextAction = fail(responseJson);
        if (nextAction) {
          yield put(nextAction);
        }
      } else {
        notification.error({
          message: `${msg}`,
          description: `错误码${code}`,
        });
      }
    } else if (typeof success === 'function') {
      const nextAction = success(responseJson);
      if (nextAction) {
        yield put(nextAction);
      }
    }
  }
}

export default common;
