import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Table, Row, Col, Select, DatePicker, Input, Form, Button, Upload, message, Icon, Radio } from 'antd';
import { Link } from 'dva/router';
import "./Page.scss";
import commonRules from '../../../utils/QueenAnt/utils/commonRules';
import enumerateConstant from '../.././../config/enumerateConstant';
import utils from '../../../utils/tools/utils';

const { goodsType } = enumerateConstant;
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;


class GoodsReleasePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      userInfo: utils.getUserInfo()
    }
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

  getGoodsType = () => {
    let goodsTypeOption = [];
    for (let i in goodsType) {
      goodsTypeOption.push(
        <Option key={i} value={i}>{goodsType[i]}</Option>
      )
    }
    return goodsTypeOption;
  }


  componentWillReceiveProps(nextProps) { }


  handleSubmit = (e) => {
    const { userInfo } = this.state;
    const { id: userId, nickname: userNickname, phone: userPhone } = userInfo;

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.status = 0;
        values.userId = userId;
        values.userNickname = userNickname;
        values.userPhone = userPhone;
        this.props.release(values);
      }
    });
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { userInfo } = this.state;
    const { nickname, phone } = userInfo;

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );


    let uploadProps = {
      name: "avatar",
      listType: "picture-card",
      className: "avatar-uploader",
      showUploadList: false,
      beforeUpload: this.beforeUpload,
      onChange: this.handleChange,
    }


    const goodsOption = this.getGoodsType();

    return (
      <div className="goods-release-page">
        <Card hoverable title="发布">
          <Form className="goods-form" onSubmit={this.handleSubmit}>

            <FormItem
              {...this.formItemLayout}
              label="类型"
            >
              {getFieldDecorator('type', {
                initialValue: 'search',
                rules: [
                  {
                    required: true
                  },
                ],
              })(
                <RadioGroup>
                  <Radio value="search">寻物</Radio>
                  <Radio value="receive">招领</Radio>
                </RadioGroup>
                )}
            </FormItem>

            <FormItem
              {...this.formItemLayout}
              label='标题'
            >
              {getFieldDecorator('articleTitle', {
                initialValue: '寻找一个皮夹子',
                rules: [
                  {
                    required: true, message: commonRules.requireMessage('require', '文章标题'),
                  },
                ],
              })(
                <Input
                  placeholder="请输入文章标题"
                />
                )}
            </FormItem>

            <FormItem
              {...this.formItemLayout}
              label='用户'
            >
              <span>{nickname}</span>
            </FormItem>

            <FormItem
              {...this.formItemLayout}
              label='联系人手机号'
            >
              <span>{phone}</span>
            </FormItem>

            <FormItem
              {...this.formItemLayout}
              label="物品种类"
              hasFeedback
            >
              {getFieldDecorator('category', {
                initialValue: '1',
                rules: [
                  {
                    required: true, message: commonRules.requireMessage('require', '物品种类'),
                  },
                ],
              })(
                <Select
                  style={{ width: 200 }}
                  showSearch={true}
                  optionFilterProp={"children"}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  onChange={this.handleChangeSelect}>
                  {goodsOption}
                </Select>
                )}
            </FormItem>


            <FormItem
              {...this.formItemLayout}
              label="图片"
            >
              {getFieldDecorator('imageUrl', {
                initialValue: '',
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload
                  {...uploadProps}
                >
                  {this.state.imageUrl ? <img src={this.state.imageUrl} alt="" /> : uploadButton}
                </Upload>
                )}
            </FormItem>

            <FormItem
              {...this.formItemLayout}
              label='拾取地点'
            >
              {getFieldDecorator('place', {
                initialValue: '图书馆',
                rules: [
                  {
                    required: true, message: commonRules.requireMessage('require', '拾取地点'),
                  },
                ],
              })(
                <Input />
                )}

            </FormItem>
            <FormItem
              {...this.formItemLayout}

              label='备注'
            >
              {getFieldDecorator('articleContent', {
                initialValue: '已经放到门卫室了',
                rules: [
                  {
                    required: true, message: commonRules.requireMessage('require', 'content'),
                  },
                ],
              })(
                <TextArea autosize={{ minRows: 5 }} />
                )}

            </FormItem>

            <FormItem className="submit-panel text-center">
              <Button style={{ width: 200 }} type="primary" htmlType="submit">
                发布
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>)
  }
}

GoodsReleasePage.PropTypes = {};
GoodsReleasePage.defaultProps = {
  release: () => { }
};
export default Form.create()(GoodsReleasePage);
