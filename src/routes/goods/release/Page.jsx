import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Card, Table, Row, Col, Select, DatePicker, Input, Form, Button, Upload, message, Icon } from 'antd';
import { Link } from 'dva/router';
const { TextArea } = Input;
const FormItem = Form.Item;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const Option = Select.Option;
import "./Page.scss";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = { imageUrl: '' }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) { }

  handleChangeSelect = (e) => {

  }

  handleChangeRangePicker = (e) => {

  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }


  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );


    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 10 },
        sm: { span: 10 },
      },
    };

    let uploadProps = {
      name: "avatar",
      listType: "picture-card",
      className: "avatar-uploader",
      showUploadList: false,
      beforeUpload: this.beforeUpload,
      onChange: this.handleChange,
    }

    return (
      <div className="goods-detail-page">
        <Card hoverable>
          <Form className="goods-form">
            <FormItem
              {...formItemLayout}
              label={<b>发布者 </b>}
            >
              <Input />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<b>联系电话  </b>}
            >
              <Input />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<b>物品种类  </b>}
            >
              <Input />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<b>物品图片  </b>}
            >
              <Upload
                {...uploadProps}
              >
                {this.state.imageUrl ? <img src={this.state.imageUrl} alt="" /> : uploadButton}
              </Upload>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={<b>拾取地点  </b>}
            >
              <Input />
            </FormItem>
            <FormItem
              {...formItemLayout}

              label={<b>详细内容  </b>}
            >
              <TextArea autosize={{ minRows: 5 }} />
            </FormItem>
          </Form>

          <div className="form-bottom">
            <Button type="primary">发布</Button>
          </div>

        </Card>
      </div>)
  }
}

MainPage.PropTypes = {};
MainPage.defaultProps = {};
export default connect()(MainPage);
