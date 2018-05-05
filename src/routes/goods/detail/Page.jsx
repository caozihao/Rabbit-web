import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Table, Row, Col, Select, DatePicker, Input, Form, Button } from 'antd';
import dataRender from '../../../utils/QueenAnt/utils/dataRender';
import enumerateConstant from "../../../config/enumerateConstant";
import genData from '../../../utils/tools/genData';
import MessageBoard from './MessageBoard';
import SendMessageBoard from './SendMessageBoard';
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
  }

  componentDidMount() {


  }

  componentWillReceiveProps(nextProps) { }

  handleChangeSelect = (e) => {

  }

  handleChangeRangePicker = (e) => {

  }

  dealWithParams = () => {
    const { detail } = this.props;
    let value = '';
    for (let i in detail) {
      value = detail[i];
      switch (i) {
        case "type":
          if (value === 'search') {
            detail[i] = '寻物'
          } else {
            detail[i] = '招领'
          }
          break;
        case "status":
          if (value === 0) {
            detail[i] = <span className="color-process">发布中</span>
          } else if (value === 1) {
            detail[i] = <span className="color-end">已结束</span>
          }
          break;
        case "createdTime":
          detail[i] = dataRender.renderTime(value);
          break;
        case "category":
          detail[i] = goodsType[value];
          break;
        default: break;
      }
    }

    return detail;
  }


  render() {
    let { articleContent, articleTitle, type, category, createdTime, uploadFilename, place, status, userNickname, userPhone, articleReadNum, userId } = this.dealWithParams();
    const { commentList, commentTotal, commrntCurPage, publish, getListByOffset } = this.props;

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
              {userPhone}

            </FormItem>

            <FormItem
              {...this.formItemLayout}
              label="图片"
            >
              {genData.genImg(uploadFilename)}
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
