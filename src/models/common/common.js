// import { comment } from 'antd';
import common from '../../utils/QueenAnt/utils/commonEffect';
import service from '../../services/common';

export default {
  namespace: 'common',
  state: {
    loading: false,
    searchTotal: 0,
    receiveTotal: 0,
    commentTotal: 0,
    userTotal: 0,

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
    *getStatistics(action, { put, select }) {
      const { resolve, reject, ...queryParams } = action.payload;

      function success(json) {
        const { data: { entity } } = json;
        if (resolve && typeof resolve === 'function') {
          resolve(json);
        }

        console.log('entity->', entity);

        return {
          type: 'save',
          payload: {
            ...entity
          }
        };
      }
      yield put({
        type: 'common',
        payload: {
          method: 'GET',
          url: service.getStatistics,
          queryParams,
          success,
        },
      });
    },

  },
  subscriptions: {},
};
