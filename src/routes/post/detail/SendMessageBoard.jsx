import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Button } from 'antd';
import commonRules from '../../../utils/QueenAnt/utils/commonRules';
import utils from '../../../utils/tools/utils';
import NeedLogin from '../../../components/common/NeedLogin.jsx'
import "./MessageBoard.scss";
const { TextArea } = Input;
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
    const { userInfo } = this.state;
    const { postId,postTitle,publishUserId,publishUserNickname } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.userId = userInfo.id;
        values.userNickname = userInfo.nickname;
        values.postId = postId;
        values.postTitle = postTitle;
        values.publishUserId = publishUserId;
        values.publishUserNickname = publishUserNickname;
        this.props.publish(values);
        this.props.form.resetFields();
      }
    });
  }


  render() {

    const { getFieldDecorator } = this.props.form;
    const { location } = this.props;

    let contentDom = "";

    if (this.state.userInfo) {
      contentDom = (<p className="button-area"><Button type="primary" style={{ width: 100 }} htmlType="submit">提交</Button></p>);
    } else {
      contentDom =
        (<Card className="login-regist-panel flex-center">
          <NeedLogin location={location} />
        </Card>)
    }

    return (
      <div className="post-detail-message-board">
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
  postId:'',
  postTitle:''
};
export default Form.create()(SendMessageBoard);
