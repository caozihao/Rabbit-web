import { host } from '../config/config';

export default {
  // 添加
  create: `${host}/comment/create`,
  // 分页
  getListByOffset: `${host}/comment/getListByOffset`,
  batchUpdateStatusByIds: `${host}/comment/batchUpdateStatusByIds`,

};

