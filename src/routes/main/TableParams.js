


import { Link } from 'dva/router';
import enumerateConstant from '../../config/enumerateConstant';
import dataRender from '../../utils/QueenAnt/utils/dataRender';

const { goodsType } = enumerateConstant;

export default [{
  title: '文章标题',
  dataIndex: 'articleTitle',
  key: 'articleTitle',
  render: (text, record) => {
    return (
      <Link to={`/detail/${record.id}`}>{text}</Link>)
  }
},
{
  title: '类型',
  dataIndex: 'category',
  key: 'category',
  render: (text, record) => {
    return (goodsType[text]);
  }
},
{
  title: '地点',
  dataIndex: 'place',
  key: 'place',
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
  title: '图片',
  dataIndex: 'imageUrl',
  key: 'imageUrl',
  render: (text, record) => {
    return text || '-';
  }
}];
