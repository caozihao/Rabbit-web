


import { Link } from 'dva/router';
import enumerateConstant from '../../config/enumerateConstant';
import dataRender from '../../utils/QueenAnt/utils/dataRender';
const { commentStatus } = enumerateConstant;

export default [
  {
    title: '帖子标题',
    dataIndex: 'postTitle',
    key: 'postTitle',
  },
  {
    title: '发布人',
    dataIndex: 'publishUserNickname',
    key: 'publishUserNickname',
  }, 
    {
    title: '评论人',
    dataIndex: 'userNickname',
    key: 'userNickname',
     render: (text, record) => {
       const { userId,publishUserId} = record;
       let result = text;
       if( userId === publishUserId){
          result = (<span>{text}<span className="col-green"> ( 发布者本人 ) </span></span>)
       }

       return result;
     }
  }, 
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => {
      let result = '';
      switch (text) {
        case 1:
          result = <span className="col-green">{commentStatus[text]}</span>
          break;
        case 2:
          result = <span className="col-grey">{commentStatus[text]}</span>
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
