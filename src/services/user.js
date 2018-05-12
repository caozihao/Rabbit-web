import { host } from '../config/config';

export default {
  // 注册
  regist: `${host}/user/regist`,
  // 登录
  login: `${host}/user/login`,
  // 登出
  logout: `${host}/user/logout`,

  batchUpdateStatusByIds: `${host}/user/batchUpdateStatusByIds`,

  getListByOffset: `${host}/user/getListByOffset`,
};

