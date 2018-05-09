import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Table, Row, Col, Select, DatePicker, Input, Form, Button } from 'antd';
import dataRender from '../../../utils/QueenAnt/utils/dataRender';
import enumerateConstant from "../../../config/enumerateConstant";
import genData from '../../../utils/tools/genData';
import utils from '../../../utils/tools/utils';
import MessageBoard from './MessageBoard';
import SendMessageBoard from './SendMessageBoard';
import { Link } from 'dva/router';
import "./Page.scss";

const { goodsType } = enumerateConstant;
const FormItem = Form.Item;

class Page extends Component {
  constructor(props) {
    super(props);
    this.formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 10 },
        sm: { span: 10 },
      },
    };
    this.btnFormItemLayout = {
      wrapperCol: {
        xs: { span: 10 },
        sm: { span: 10, offset: 4 },
      },
    }
    this.state = {
      userInfo: utils.getUserInfo() ? utils.getUserInfo() : ''
    }
  }

  componentDidMount() {


  }

  componentWillReceiveProps(nextProps) { }

  handleChangeSelect = (e) => {

  }

  handleChangeRangePicker = (e) => {

  }

  dealWithParams = (detail) => {
    let copyDetail = Object.assign({}, detail);
    if (Object.keys(detail).length) {
      let value = '';
      for (let i in copyDetail) {
        value = copyDetail[i];
        switch (i) {
          case "type":
            if (value === 'search') {
              copyDetail[i] = '寻物'
            } else {
              copyDetail[i] = '招领'
            }
            break;
          case "status":
            if (value === 1) {
              copyDetail[i] = <span className="color-process">发布中</span>
            } else if (value === 2) {
              copyDetail[i] = <span className="color-end">已结束</span>
            }
            break;
          case "createdTime":
            copyDetail[i] = dataRender.renderTime(value);
            break;
          case "category":
            copyDetail[i] = goodsType[value];
            break;
          default: break;
        }
      }
    }
    return copyDetail;
  }


  render() {

    const { commentList, commentTotal, commrntCurPage, publish, getListByOffset, detail } = this.props;
    let { articleContent, articleTitle, type, category, createdTime, uploadFilename, place, status, userNickname, userPhone, articleReadNum, userId } = this.dealWithParams(detail);
    const { userInfo } = this.state;

    const messageBoardProps = {
      commentList,
      commentTotal,
      commrntCurPage,
      getListByOffset,
      publishUserId: userId
    }

    const sendMessageProps = {
      publish,
    }

    let userPhoneDom = '';
    if (userInfo) {
      userPhoneDom = userPhone;
    } else {
      userPhoneDom = (
        <p>
          请
          <Link to='/login' > 登录 </Link > |
          <Link to='/regist'> 注册 </Link> 后查看
        </p>
      )
    }

    return (
      <div className="goods-detail-page">
        <Card hoverable>
          <h1 className="title">{articleTitle}</h1>
          <ul className="title-brief clearfix">
            <li><b>发布时间 : </b> {createdTime} </li>
            <li><b>浏览量 : </b>{articleReadNum || 0}</li>
            <li><b>状态 : </b>{status}</li>
          </ul>
          <Form className="goods-form">

            <FormItem
              {...this.formItemLayout}
              label="类型"
            >
              {type}
            </FormItem>

            <FormItem
              {...this.formItemLayout}
              label="发布者"
            >
              {userNickname}
            </FormItem>

            <FormItem
              {...this.formItemLayout}
              label="联系人手机号"
            >
              {userPhoneDom}
            </FormItem>

            <FormItem
              {...this.formItemLayout}
              label="图片"
            >
              {genData.genImg(uploadFilename, 'detail')}
            </FormItem>
            <FormItem
              {...this.formItemLayout}
              label="物品种类"
            >
              {category}
            </FormItem>

            <FormItem
              {...this.formItemLayout}
              label='拾取地点'
            >
              {place}
            </FormItem>
            <FormItem
              {...this.formItemLayout}
              label='备注'
            >
              {articleContent}
            </FormItem>
          </Form>

        </Card>

        <MessageBoard {...messageBoardProps} />
        <SendMessageBoard {...sendMessageProps} />
      </div>)
  }
}

Page.PropTypes = {};
Page.defaultProps = {
  detail: {},
  getListByOffset: () => { },
  publish: () => { },
  commentList: [],
  commentTotal: 0,
  commrntCurPage: 0,
};
export default Page;
