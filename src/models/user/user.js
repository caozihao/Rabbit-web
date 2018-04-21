// import { message } from 'antd';
import common from '../../utils/QueenAnt/utils/commonEffect';
import service from '../../services/user';

export default {
  namespace: 'user',
  state: {
    loading: false,
    userInfo: ''
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    setLoading(state) {
      return { ...state, loading: true };
    },
    clearLoading(state) {
      return { ...state, loading: false };
    },
  },
  effects: {
    common,
    //---------------------------------------
    *regist(action, { put }) {
      const { resolve, reject, ...queryParams } = action.payload;

      console.log('queryParams ->', queryParams);

      function success(json) {
        if (resolve && typeof resolve === 'function') {
          resolve(json);
        }
        return {
          type: 'save',
          payload: {},
        };
      }
      yield put({
        type: 'common',
        payload: {
          method: 'POST',
          url: service.regist,
          queryParams,
          success,
        },
      });
    },
    *login(action, { put }) {
      const { resolve, reject, ...queryParams } = action.payload;

      function success(json) {
        if (resolve && typeof resolve === 'function') {
          resolve(json);
        }

        return {
          type: 'save',
          payload: {},
        };
      }
      yield put({
        type: 'common',
        payload: {
          method: 'POST',
          url: service.login,
          queryParams,
          success,
        },
      });
    },
    *logout(action, { put }) {
      const { resolve, reject, ...queryParams } = action.payload;

      function success(json) {
        if (resolve && typeof resolve === 'function') {
          resolve(json);
        }

        return {
          type: 'save',
          payload: {},
        };
      }
      yield put({
        type: 'common',
        payload: {
          method: 'POST',
          url: service.logout,
          queryParams,
          success,
        },
      });
    },

  },
  subscriptions: {},
};
