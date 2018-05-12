// import { message } from 'antd';
import common from '../../utils/QueenAnt/utils/commonEffect';
import service from '../../services/user';

export default {
  namespace: 'user',
  state: {
    loading: false,
    userInfo: '',
    list: [],
    total: 0
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
        const { data: { entity } } = json;
        if (resolve && typeof resolve === 'function') {
          resolve(entity);
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
    *getListByOffset(action, { put, select }) {
      const { resolve, reject, ...queryParams } = action.payload;
      function success(json) {
        const { data: { entities, total } } = json;
        if (resolve && typeof resolve === 'function') {
          resolve(json);
        }
        return {
          type: 'save',
          payload: {
            list: entities,
            total,
          }
        };
      }
      yield put({
        type: 'common',
        payload: {
          method: 'GET',
          url: service.getListByOffset,
          queryParams,
          success,
        },
      });
    },

    *batchUpdateStatusByIds(action, { put }) {
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
          url: service.batchUpdateStatusByIds,
          queryParams,
          success,
        },
      });
    },

  },
  subscriptions: {},
};
