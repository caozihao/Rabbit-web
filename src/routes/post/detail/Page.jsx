import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Table, Row, Col, Select, DatePicker, Input, Form, Button } from 'antd';
import dataRender from '../../../utils/QueenAnt/utils/dataRender';
import enumerateConstant from "../../../config/enumerateConstant";
import genData from '../../../utils/tools/genData';
import utils from '../../../utils/tools/utils';
import MessageBoard from './MessageBoard';
import SendMessageBoard from './SendMessageBoard';
import NeedLogin from '../../../components/common/NeedLogin.jsx';
import "./Page.scss";

const { postType } = enumerateConstant;
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
          case "goodsCategory":
            copyDetail[i] = postType[value];
            break;
          default: break;
        }
      }
    }
    return copyDetail;
  }


  render() {

    const { commentList, commentTotal, commrntCurPage, publish, getListByOffset, detail, location } = this.props;
    let { id,content, title, type, goodsCategory, createdTime, uploadFilename, goodsPlace, status, userNickname, userPhone, readNum, userId } = this.dealWithParams(detail);
    const { userInfo } = this.state;

    const messageBoardProps = {
      location,
      commentList,
      commentTotal,
      commrntCurPage,
      getListByOffset,
      publishUserId: userId
    }

    const sendMessageProps = {
      postId:id,
      postTitle:title,
      publish,
      location
    }

    let userPhoneDom = '';
    if (userInfo) {
      userPhoneDom = userPhone;
    } else {
      userPhoneDom = (
        <NeedLogin location={location} />
      )
    }

    return (
      <div className="post-detail-page">
        <Card hoverable>
          <h1 className="title">{title}</h1>
          <ul className="title-brief clearfix">
            <li><b>发布时间 : </b> {createdTime} </li>
            <li><b>浏览量 : </b>{readNum || 0}</li>
            <li><b>状态 : </b>{status}</li>
          </ul>
          <Form className="post-form">

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
              {goodsCategory}
            </FormItem>

            <FormItem
              {...this.formItemLayout}
              label='地点'
            >
              {goodsPlace}
            </FormItem>
            <FormItem
              {...this.formItemLayout}
              label='备注'
            >
              {content}
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
