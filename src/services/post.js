import { host } from '../config/config';

export default {
  // 添加
  create: `${host}/post/create`,
  // 获取详情
  getById: `${host}/post/getById`,
  // 分页
  getListByOffset: `${host}/post/getListByOffset`,
  // 更新阅读量
  updateReadNumById: `${host}/post/updateReadNumById`,

  batchUpdateStatusByIds: `${host}/post/batchUpdateStatusByIds`,

};

