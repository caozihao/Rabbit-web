
import utils from '../../../utils/QueenAnt/utils/utils';
import React, { Component } from 'react';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import { connect } from 'dva';
import constant from '../../../config/constants';
import PropTypes from 'prop-types';
import './ValidateCodeForm.scss';

const FormItem = Form.Item;
class ValidateCodeForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      codeText: '获取短信验证码',
      defaultCodeText: '获取短信验证码',
      defaultTime: constant.validateCodeTime,
      loading: false,
      isGraphCode: false,
      graphSrc: '',
    }
    this.loadingTimer = {};
    this.mobile = "";
  }

  // 该组件

  componentWillMount = () => {

  }

  // render

  componentDidMount = () => {
    window.clearTimeout(this.loadingTimer);
  }


  ////////////////////////////////////////////////////////////////////////////////////

  // 父组件

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.isReset) {
      this.props.form.resetFields();
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return true;
  }

  componentWillUpdate = (nextProps, nextState) => {
  }

  // render

  componentDidUpdate = () => {

  }

  componentWillUnmount = () => {

  }

  sendMessageCode = (queryParams) => {
    const { dispatch, self, apiName } = this.props;
    const { setTimer, sendGraphCode } = this;
    let { mobile, graphCode } = queryParams;
    this.mobile = `0086${mobile}`;
    self.setState({ spinningLoading: true });

    let payload = {
      mobile: this.mobile
    }
    if (graphCode) {
      payload.graphCode = graphCode;
    }

    dispatch({
      type: 'commonAction/action',
      api: apiName,
      method: 'POST',
      payload,
      suc: {
        fun: () => {
          self.setState({ spinningLoading: false });
          setTimer();
          if (graphCode) {
            sendGraphCode();
          }
        },
        mes: '短信验证码已发送',
      },
      fail: {
        fun: (data) => {
          if (!graphCode && data.code === 11090012) {
            sendGraphCode();
          } else {
            self.setState({ spinningLoading: false });
          }
        }
      }
    })
  }

  sendGraphCode = () => {
    const { dispatch, self } = this.props;
    const _this = this;
    self.setState({ spinningLoading: true });

    const api = (() => {
      if (utils.getUserInfo()) {
        return 'user/sendGraphCode';
      } else {
        return 'auth/sendGraphCode';
      }
    })();

    dispatch({
      type: 'commonAction/action',
      api,
      method: 'POST',
      payload: {
        mobile: this.mobile
      },
      suc: {
        fun: (data) => {
          const graphSrc = `data:image/png;base64,${data.data.graphCode || data.data.base64}`;
          _this.setState({ isGraphCode: true, graphSrc })
          self.setState({ spinningLoading: false });
        },
      },
      fail: {
        fun: () => {
          self.setState({ spinningLoading: false })
        }
      }
    });
  }


  getCode = () => {
    const { self } = this.props;
    if (this.state.isGraphCode) {
      this.props.form.validateFields(['graphCode'], (err, values) => {
        if (!err) {
          this.validatePropsForm(values);
        }
      });
    } else {
      this.validatePropsForm();
    }
  }

  setValue = (e) => {
    const { self } = this.props;
    console.log('value ->', e.target.value);
    self.setState({
      code: e.target.value
    })
  }

  validatePropsForm = (formValues) => {
    const { self } = this.props;
    self.props.form.validateFields(['mobile'], (err, values) => {
      let validateCode = {};
      if (!err) {
        values = { ...values, ...formValues }
        this.sendMessageCode(values);
      }
    });
  }



  render() {
    const { loading, codeText } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { colLayout, formItemLayout } = this.props;
    const { left: { span: leftSpan, offset: leftOffset }, right: { span: rightSpan, offset: rightOffset } } = colLayout;
    const { left: leftFormItemLayout, right: rightFormItemLayout } = formItemLayout;
    return (
      <div className="ValidateCodeForm">
        <Row>
          <Col span={leftSpan} offset={leftOffset}>
            <FormItem {...leftFormItemLayout}>
              {getFieldDecorator('code', {
                rules: [{ required: true, message: '请输入短信验证码！' }],
              })(
                <Input onChange={this.setValue} prefix={<Icon type="exclamation-circle-o" />} placeholder="短信验证码" />)}
            </FormItem>
          </Col>

          <Col span={rightSpan} offset={rightOffset}>
            <FormItem {...rightFormItemLayout}>
              <Button className="code-text" onClick={this.getCode} loading={loading}>{codeText}</Button>
            </FormItem>
          </Col>

        </Row>

        {
          this.state.isGraphCode ? <Row>
            <Col span={leftSpan} offset={leftOffset}>
              <FormItem {...leftFormItemLayout}>
                {getFieldDecorator('graphCode', {
                  rules: [{ required: true, message: '请输入图形验证码！' }],
                })(
                  <Input prefix={<Icon type="exclamation-circle-o" />} placeholder="图形验证码" />,
                )}
              </FormItem>
            </Col>
            <Col span={rightSpan} offset={rightOffset}>
              <FormItem {...rightFormItemLayout}>
                <img className="verification-code-img" onClick={this.sendGraphCode} src={this.state.graphSrc} />
              </FormItem>
            </Col>
          </Row> : ''
        }
      </div>
    )
  }

  setTimer = () => {
    let { defaultCodeText, codeText, defaultTime: time, loading } = this.state;

    const init = () => {
      this.setState({
        codeText: defaultCodeText,
        loading: false,
      })
    }

    // 还没开始
    this.setState({
      codeText: time,
      loading: true
    }, () => {
      this.loadingTimer = setInterval(() => {
        // 当时间为0的时候，清除该定时器
        if (!time) {
          init();
          window.clearTimeout(this.loadingTimer);
        } else {
          time -= 1;
          this.setState({
            codeText: time,
          })
        }
      }, 1000);
    })

  };
}

ValidateCodeForm.ProTypes = {
  self: PropTypes.object,
  col: PropTypes.object,
  formItemLayout: PropTypes.object,
  apiName: PropTypes.string,
  isReset: PropTypes.bool
};

ValidateCodeForm.defaultProps = {
  self: {},
  colLayout: {
    left: {
      span: 12,
      offset: 0
    },
    right: {
      span: 10,
      offset: 2
    }
  },
  formItemLayout: {
    left: {},
    right: {}
  },
  apiName: '',
  isReset: false
}


export default connect()(Form.create()(ValidateCodeForm));
