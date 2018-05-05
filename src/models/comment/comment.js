// import { comment } from 'antd';
import common from '../../utils/QueenAnt/utils/commonEffect';
import service from '../../services/comment';

export default {
  namespace: 'comment',
  state: {
    loading: false,
    list: [],
    curPage: 1,
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
    *create(action, { put }) {
      const { resolve, reject, ...queryParams } = action.payload;

      function success(json) {
        if (resolve && typeof resolve === 'function') {
          resolve(json);
        }
        return {
          type: 'save',
          payload: {
            curPage: 1
          },
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
    *getListByOffset(action, { put, select }) {
      const { resolve, reject, ...queryParams } = action.payload;

      const { pageNo } = queryParams;

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
            curPage: pageNo,
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

  },
  subscriptions: {},
};
