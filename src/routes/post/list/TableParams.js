


import { Link } from 'dva/router';
import enumerateConstant from '../../../config/enumerateConstant';
import dataRender from '../../../utils/QueenAnt/utils/dataRender';
import genData from '../../../utils/tools/genData';

const { postType } = enumerateConstant;

export default [
  {
    title: '图片',
    dataIndex: 'uploadFilename',
    key: 'uploadFilename',
    render: (text, record) => {
      return genData.genImg(text);
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
    title: '创建时间',
    dataIndex: 'createdTime',
    key: 'createdTime',
    render: (text, record) => {
      return dataRender.renderTime(text);
    }
  },
];
