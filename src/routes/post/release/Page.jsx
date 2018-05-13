import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Select, notification, Input, Form, Button, Radio, Icon, Spin } from 'antd';
import commonRules from '../../../utils/QueenAnt/utils/commonRules';
import enumerateConstant from '../.././../config/enumerateConstant';
import utils from '../../../utils/tools/utils';
import qiniuUploadUtils from "../../../utils/tools/qiniuUpload";
import { qiniu, debugMode } from '../../../config/config';
import "./Page.scss";
import * as qiniuJs from 'qiniu-js';

const { ak, SK, bucket } = qiniu;

const { postType } = enumerateConstant;
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

let postInitialValue = {
  title: '',
  goodsPlace: '',
  content: '',
};

if (debugMode) {
  postInitialValue = {
    title: '寻找一个皮夹子',
    goodsPlace: '图书馆',
    content: '已经放到门卫室了',
  }
}


class PostReleasePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: utils.getUserInfo(),
      uploadFilename: '',
      uploadImg: '',
      uploadImgUrl: '',
      curImgHeight: 200,
      loading: false,
    }

    this.defaultImgWidth = 200;
    this.defaultIntervalTime = 1000 * 60 * 60 * 12;

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

  getPostType = () => {
    let postTypeOption = [];
    for (let i in postType) {
      postTypeOption.push(
        <Option key={i} value={i}>{postType[i]}</Option>
      )
    }
    return postTypeOption;
  }


  componentWillReceiveProps(nextProps) { }

  // 上传图片
  qiniuJSUpload = () => {

    const P = new Promise((resolve, reject) => {
      const { uploadImg } = this.state;
      let token = qiniuUploadUtils.genUpToken(ak, SK, bucket, this.defaultIntervalTime);
      var observable = qiniuJs.upload(uploadImg, uploadImg.name, token);

      const observer = {
        next(res) {
          // console.log('next res ->', res);
        },
        error(err) {
          reject(err);
        },
        complete(res) {
          // console.log('complete res ->', res);
          resolve(res.key);
        }
      }
      observable.subscribe(observer.next, observer.error, observer.complete); // 上传开始
    })

    return P;

  }


  // 图片上传前
  beforeUpload = (file) => {
    const _this = this;
    const _defaultImgWidth = this.defaultImgWidth;
    return new Promise((resolve) => {
      const fr = new FileReader();
      fr.readAsDataURL(file);
      fr.onload = function () {
        const img = new Image();
        img.src = fr.result;
        img.onload = function () {
          const curImgHeight = img.height * _defaultImgWidth / img.width;
          _this.setState({
            uploadImg: file,
            uploadImgUrl: img.src,
            curImgHeight,
          })
        }
      };
    });
  }

  handleSubmit = (e) => {
    const { userInfo } = this.state;
    const { id: userId, nickname: userNickname, phone: userPhone } = userInfo;
    const { uploadImg } = this.state;

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.userId = userId;
        values.userNickname = userNickname;
        values.userPhone = userPhone;
        if (uploadImg) {
          this.setState({ loading: true })
          this.qiniuJSUpload().then((uploadFilename) => {
            values.uploadFilename = uploadFilename;
            this.props.release(values);
            this.setState({ loading: false })
          }, () => {
            this.setState({ loading: false })
          })
        } else {
          values.uploadFilename = '';
          this.props.release(values);
        }
      }
    });
  }


  handleInputChange = (event) => {
    // 获取当前选中的文件
    const file = event.target.files[0];

    const accessImgTypeArr = ['image/jpeg', 'image/jpg', 'image/png'];
    let accessFlag = accessImgTypeArr.some((v) => {
      return file.type === v;
    });

    if (accessFlag) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (isLt2M) {
        this.beforeUpload(file);
      } else {
        const message = '图片最大不能超过2M';
        notification.error({
          message
        });
      }

    } else {
      notification.error({
        message: 'Only support:*.jpeg,*.jpg,*.png',
      });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { userInfo } = this.state;
    const { nickname, phone } = userInfo;
    const postOption = this.getPostType();
    const { uploadImgUrl, curImgHeight, loading } = this.state;
    const { title, goodsPlace, content } = postInitialValue;


    return (
      <Spin
        className="post-release-spinging"
        size="large"
        spinning={loading}>
        <div className="post-release-page">
          <Card hoverable title="发布">
            <Form className="post-form" onSubmit={this.handleSubmit}>
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
                {getFieldDecorator('title', {
                  initialValue: title,
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
                {getFieldDecorator('goodsCategory', {
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
                    {postOption}
                  </Select>
                )}
              </FormItem>


              <FormItem
                {...this.formItemLayout}
                label="图片"
              >
                <div className="qiniu-upload">
                  <div className="default-img" style={{ height: curImgHeight }}>
                    {uploadImgUrl ? <img className="upload-bk-img" alt="upload-bk-img" src={uploadImgUrl} /> : <Icon type="upload" />}
                  </div>
                  <input type="file" className="input-upload" accept='image/*' onChange={this.handleInputChange} />
                </div>

              </FormItem>

              <FormItem
                {...this.formItemLayout}
                label='地点'
              >
                {getFieldDecorator('goodsPlace', {
                  initialValue: goodsPlace,
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
                {getFieldDecorator('content', {
                  initialValue: content,
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
        </div>
      </Spin>)
  }
}

PostReleasePage.PropTypes = {};
PostReleasePage.defaultProps = {
  release: () => { }
};
export default Form.create()(PostReleasePage);
