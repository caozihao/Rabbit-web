


import { Link } from 'dva/router';
import enumerateConstant from '../../config/enumerateConstant';
import dataRender from '../../utils/QueenAnt/utils/dataRender';
import genData from '../../utils/tools/genData';

const { postType, cardStatus } = enumerateConstant;

export default [
  {
    title: '图片',
    dataIndex: 'uploadFilename',
    key: 'uploadFilename',
    render: (text, record) => {
      return genData.genImg(text);
    }
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    render: (text, record) => {
      let result = '';
      switch (text) {
        case 'search':
          result = <span><b>寻物</b></span>
          break;
        case 'receive':
          result = <span><b>招领</b></span>
          break;
        default:
          break;
      }
      return (result);
    }
  }, {
    title: '文章标题',
    dataIndex: 'title',
    key: 'title',
    render: (text, record) => {
      return (
        <Link to={`/detail/${record.id}`}>{text}</Link>)
    }
  },
  {
    title: '类型',
    dataIndex: 'goodsCategory',
    key: 'goodsCategory',
    render: (text, record) => {
      return (postType[text]);
    }
  },
  {
    title: '地点',
    dataIndex: 'goodsPlace',
    key: 'goodsPlace',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => {
      let result = '';
      switch (text) {
        case 1:
          result = <span className="col-green">{cardStatus[text]}</span>
          break;
        case 2:
          result = <span className="col-grey">{cardStatus[text]}</span>
          break;
        case 3:
          result = <span className="col-red">{cardStatus[text]}</span>
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
];
