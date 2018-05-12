


import enumerateConstant from '../../config/enumerateConstant';
import dataRender from '../../utils/QueenAnt/utils/dataRender';

const { userStatus } = enumerateConstant;

export default [
  {
    title: '昵称',
    dataIndex: 'nickname',
    key: 'nickname',
  }, {
    title: '电话',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '类型',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => {
      let result = '';
      switch (text) {
        case 1:
          result = <span className="col-green">{userStatus[text]}</span>
          break;
        case 2:
          result = <span className="col-red">{userStatus[text]}</span>
          break;
        default:
          break;
      }
      return (result);
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    key: 'createdTime',
    render: (text, record) => {
      return dataRender.renderTime(text);
    }
  },
  {
    title: '创建时间',
    dataIndex: 'updatedTime',
    key: 'updatedTime',
    render: (text, record) => {
      return dataRender.renderTime(text);
    }
  },
  {
    title: '最后登录时间',
    dataIndex: 'lastLoginTime',
    key: 'lastLoginTime',
    render: (text, record) => {
      return dataRender.renderTime(text);
    }
  },
];
