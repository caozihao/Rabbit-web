import React, { Component } from 'react';
import { Card, Input, Form, Button, Icon } from 'antd';
import commonRules from '../../utils/QueenAnt/utils/commonRules';
import "./RegistPage.scss";

const FormItem = Form.Item;

class RegistPage extends Component {
  constructor(props) {
    super(props);
    this.state = { imageUrl: '' }
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

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) { }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('values ->', values);
        this.props.regist(values);
      }
    });
  }



  checkPassword = (rule, value, callback) => {
    if (value && value.length < 8) {
      callback(commonRules.otherMessage('password', 'min', 8));
    } else if (value && value.length > 20) {
      callback(commonRules.otherMessage('password', 'max', 20));
    } else {
      callback();
    };
  }

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback(commonRules.otherMessage('password', 'same'));
    } else {
      callback();
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="RegistPage">
        <Card
          className="card"
          title="注册"
          hoverable={true}>
          <Form onSubmit={this.handleSubmit} >
            <FormItem>
              {getFieldDecorator('phone', {
                initialValue: '13564410428',
                rules: [
                  {
                    required: true, message: commonRules.requireMessage('require', '手机号'),
                  },
                  commonRules.validate('phone'),
                ],
              })(
                <Input
                  prefix={<Icon type="phone"
                    style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入手机号"
                />
                )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('nickname', {
                initialValue: '猫猫盖子',
                rules: [
                  {
                    required: true, message: commonRules.requireMessage('require', '昵称'),
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="user"
                    style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入昵称"
                />
                )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                initialValue: 'root1234',
                rules: [
                  {
                    required: true, message: commonRules.requireMessage('require', '密码')
                  }, {
                    validator: this.checkPassword,
                  },
                  commonRules.validate('password'),
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password" placeholder="请输入密码（8~20），必须含有一个数字和字母" />
                )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('rePassword', {
                initialValue: 'root1234',
                rules: [{ required: true, message: commonRules.requireMessage('require', '确认密码') }, {
                  validator: this.checkConfirm,
                }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password" placeholder="请输入确认密码" />,
              )}
            </FormItem>

            <FormItem>
              <Button style={{ width: '100%' }} type="primary" htmlType="submit" className="login-form-button">
                注册
              </Button>
            </FormItem>

          </Form>
        </Card>
      </div>)
  }
}

RegistPage.PropTypes = {
  regist: () => { }
};
RegistPage.defaultProps = {};
export default Form.create()(RegistPage);
