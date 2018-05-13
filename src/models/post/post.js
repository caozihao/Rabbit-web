// import { message } from 'antd';
import common from '../../utils/QueenAnt/utils/commonEffect';
import service from '../../services/post';

export default {
  namespace: 'post',
  state: {
    loading: false,
    receiveList: [],
    searchList: [],
    allList: [],
    allTotal: 0,
    receiveTotal: 0,
    searchTotal: 0,
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
    *updateReadNumById(action, { put }) {
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
          url: service.updateReadNumById,
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
      const { type, way } = queryParams;

      function success(json) {
        const { data: { entities, total } } = json;
        if (resolve && typeof resolve === 'function') {
          resolve(json);
        }

        let payload = {};

        // 没有传此参数或者way=back
        if (!type || way === 'back') {
          payload = {
            allList: entities,
            allTotal: total
          }
        } else {
          payload = {
            [`${type}List`]: entities,
            [`${type}Total`]: total
          }
        }

        return {
          type: 'save',
          payload,
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
