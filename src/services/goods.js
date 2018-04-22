import { host } from '../config/config';

export default {
  // 添加
  create: `${host}/goods/create`,
  // 获取详情
  getById: `${host}/goods/getById`,
  // 分页
  getListByOffset: `${host}/goods/getListByOffset`,

};

