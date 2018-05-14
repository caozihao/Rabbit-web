import React, { Component } from 'react';
import { Card, Input, Form, Button, Icon } from 'antd';
import commonRules from '../../utils/QueenAnt/utils/commonRules';
import {debugMode } from '../../config/config';
import './BackLoginPage.scss'

const FormItem = Form.Item;

class BackLoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { uploadFilename: '' }
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
        this.props.login(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="BackLoginPage">
        <Card
          className="card"
          title="CMS管理系统"
          hoverable={true}>
          <Form onSubmit={this.handleSubmit} >
            <FormItem>
              {getFieldDecorator('phone', {
                initialValue: '',
                rules: [
                  {
                    required: true, message: commonRules.requireMessage('require', '用户名'),
                  }
                ],
              })(
                <Input
                  prefix={<Icon type="phone"
                    style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入用户名（测试数据：admin）"
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
                  // commonRules.validate('password'),
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password" placeholder="请输入密码（测试数据：admin）" />
              )}
            </FormItem>

            <FormItem>
              <Button htmlType="submit" className="login-form-button">
                登录
              </Button>
            </FormItem>

          </Form>
        </Card>
      </div>)
  }
}

BackLoginPage.PropTypes = {};
BackLoginPage.defaultProps = {};
export default Form.create()(BackLoginPage);
