import React, { Component } from 'react';
import { Card, Input, Form, Button, Icon } from 'antd';
import commonRules from '../../utils/QueenAnt/utils/commonRules';
import "./LoginPage.scss";

const FormItem = Form.Item;

class LoginPage extends Component {
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
        // this.props.Logine(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="LoginPage">
        <Card
          className="card"
          title="注册"
          hoverable={true}>
          <Form onSubmit={this.handleSubmit} >
            <FormItem>
              {getFieldDecorator('phone', {
                initialValue: '',
                rules: [
                  {
                    required: true, message: commonRules.requireMessage('require', '手机号'),
                  },
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
              {getFieldDecorator('password', {
                initialValue: '',
                rules: [
                  {
                    required: true, message: commonRules.requireMessage('require', '密码')
                  },
                  commonRules.validate('password'),
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password" placeholder="请输入密码" />
                )}
            </FormItem>

            <FormItem>
              <Button style={{ width: '100%' }} type="primary" htmlType="submit" className="login-form-button">
                登陆
              </Button>
            </FormItem>

          </Form>
        </Card>
      </div>)
  }
}

LoginPage.PropTypes = {};
LoginPage.defaultProps = {};
export default Form.create()(LoginPage);
