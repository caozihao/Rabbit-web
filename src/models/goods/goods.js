// import { message } from 'antd';
import common from '../../utils/QueenAnt/utils/commonEffect';
import service from '../../services/goods';

export default {
  namespace: 'goods',
  state: {
    loading: false,
    list: [],
    total: 0,
    detail: '',
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
    *create(action, { put }) {
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
          url: service.create,
          queryParams,
          success,
        },
      });
    },
    *getById(action, { put }) {
      const { resolve, reject, ...queryParams } = action.payload;

      function success(json) {
        const { data: { entity: detail } } = json;
        if (resolve && typeof resolve === 'function') {
          resolve(detail);
        }

        return {
          type: 'save',
          payload: {
            detail
          },
        };
      }
      yield put({
        type: 'common',
        payload: {
          method: 'GET',
          url: service.getById,
          queryParams,
          success,
        },
      });
    },
    *getListByOffset(action, { put }) {
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
            total
          },
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

  },
  subscriptions: {},
};
