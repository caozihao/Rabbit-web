import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Button } from 'antd';
import commonRules from '../../../utils/QueenAnt/utils/commonRules';
import enumerateConstant from "../../../config/enumerateConstant";
import utils from '../../../utils/tools/utils';

import { Link } from 'dva/router';
import "./MessageBoard.scss";

const { TextArea } = Input;
const { goodsType } = enumerateConstant;
const FormItem = Form.Item;

class SendMessageBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: utils.getUserInfo(),
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) { }

  handleChangeSelect = (e) => {

  }

  handleChangeRangePicker = (e) => {

  }


  handleSubmit = (e) => {
    e.preventDefault();
    const { userInfo } = this.state;

    this.props.form.validateFields((err, values) => {
      values.userId = userInfo.id;
      values.userNickname = userInfo.nickname;
      this.props.publish(values);
      this.props.form.resetFields();
    });
  }


  render() {

    const { getFieldDecorator } = this.props.form;

    let contentDom = "";

    if (this.state.userInfo) {
      contentDom = (<p className="button-area"><Button type="primary" style={{ width: 100 }} htmlType="submit">提交</Button></p>);
    } else {
      contentDom =
        (<Card className="login-regist-panel flex-center" style={{ height: 300 }}>
          您还未登录，请先
          <Link to='/login'> 登录 </Link> |
          <Link to='/regist'> 注册 </Link>
        </Card>)
    }

    return (
      <div className="goods-detail-message-board">
        <Card hoverable title={<b>我要留言</b>}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...this.formItemLayout}>
              {getFieldDecorator('content', {
                initialValue: '',
                rules: [
                  {
                    required: true, message: commonRules.requireMessage('require', '内容'),
                  },
                ],
              })(
                <TextArea autosize={{ minRows: 5 }} />
              )}
            </FormItem>
            <FormItem className="submit-panel text-center">
              {contentDom}
            </FormItem>
          </Form>
        </Card>
      </div>)
  }
}

SendMessageBoard.PropTypes = {};
SendMessageBoard.defaultProps = {
  publish: () => { },
};
export default Form.create()(SendMessageBoard);
