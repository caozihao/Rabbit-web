import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Radio, Button, Checkbox, Select, InputNumber, Input, Row, Col } from 'antd';
// import dict from './params';
const dict = {};

const Option = Select.Option;
const FormItem = Form.Item;
// const RadioButton = Radio.Button;
// const RadioGroup = Radio.Group;
// const CheckboxGroup = Checkbox.Group;
// import styles from './Adder.less';

class Adder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) { }

  getSelectOptions = (data) => {

  }
  handleBtnClick = () => {
    this.setState({ visible: true });
  }
  cleanData = (data) => {
    if (data) {
      const { interestRate, serviceFeeRate, depositRate } = data;
      const cleanData = {
        ...data,
        interestRate: interestRate / 100,
        serviceFeeRate: serviceFeeRate / 100,
        depositRate: depositRate / 100,
      };
      return cleanData;
    }
  }
  handleOk = () => {
    this.props.form.validateFields((error, values) => {
      if (!error) {
        if (typeof this.props.handleOk === 'function' && typeof values !== 'undefined') {
          const cleanValues = this.cleanData(values);
          this.props.handleOk(cleanValues);
        }
        this.setState({
          visible: false,
        });
      }
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  /**
   * 作用:根据数据生成下下拉框的选项
   * 参数:data,数组,格式为[{id:1,name:'钱爸爸'}]
   * 参数:nameKey,显示名称的key的名字,
   * 参数:valueKey,数值的key的名字,
   * @memberof Adder
   */
  getSelectOptions = (data, nameKey = 'name', valueKey = 'id') => {
    const options = [];
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i += 1) {
        const name = data[i][nameKey];
        const value = data[i][valueKey];
        options.push(<Option key={value}>{name}</Option>);
      }
    }
    return options;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemOptions = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },

    };
    const rateItemOptions = {
      labelCol: { span: 12 },
      wrapperCol: { span: 12 },
    };
    const selectWithSearchOptions = {
      showSearch: true,
      optionFilterProp: 'children',
      filterOption: (input, option) => {
        return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
    };
    const inputNumberOptions = {

    };

    return (
      <div className="queen-ant-adder">
        <Button
          type="primary"
          icon="plus"
          onClick={this.handleBtnClick}
        >新增结算条件</Button>
        <Modal
          width="600px"
          title={this.props.title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          closable
        >
          <Form>
            <Row>
              <FormItem label={dict.creditorId.title} {...formItemOptions}>
                {
                  getFieldDecorator('creditorId', {
                    // initialValue: dict.creditorId.default,

                    rules: [{ required: true }],
                  })(<Select {...selectWithSearchOptions} placeholder="请选择资方,支持搜索 ">
                    {this.getSelectOptions(this.props.creditorList)}
                  </Select>,
                  )
                }
              </FormItem>
              <FormItem label={dict.fundType.title} {...formItemOptions}>
                {
                  getFieldDecorator('fundType', {
                    initialValue: dict.fundType.default,
                    rules: [{ required: true }],
                  })(<Select {...selectWithSearchOptions}>
                    <Option key="0" >直投</Option>
                    <Option key="1" >债转</Option>
                    <Option key="2" >放标</Option>
                  </Select>,
                  )
                }
              </FormItem>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem label={`${dict.interestRate.title}%`} {...rateItemOptions}>
                  {
                    getFieldDecorator('interestRate', {
                      initialValue: dict.interestRate.default,
                      rules: [{ required: true }],
                    })(<InputNumber min={0} max={999} step={0.01} />)
                  }
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label={dict.interestYearPeriod.title} {...rateItemOptions}>
                  {
                    getFieldDecorator('interestYearPeriod', {
                      initialValue: dict.interestYearPeriod.default,
                      rules: [{ required: true }],
                    })(<Select {...selectWithSearchOptions}>
                      <Option key="360" >360</Option>
                      <Option key="365" >365</Option>
                      <Option key="366" >366</Option>
                    </Select>,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem label={`${dict.serviceFeeRate.title}%`} {...rateItemOptions}>
                  {
                    getFieldDecorator('serviceFeeRate', {
                      initialValue: dict.serviceFeeRate.default,
                      rules: [{ required: true }],
                    })(<InputNumber min={0} max={999} step={0.01} />)
                  }
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label={dict.serviceYearPeriod.title} {...rateItemOptions}>
                  {
                    getFieldDecorator('serviceYearPeriod', {
                      initialValue: dict.serviceYearPeriod.default,
                      rules: [{ required: true }],
                    })(<Select {...selectWithSearchOptions}>
                      <Option key="360" >360</Option>
                      <Option key="365" >365</Option>
                      <Option key="366" >366</Option>
                    </Select>,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            <FormItem label={`${dict.depositRate.title}%`} {...formItemOptions}>
              {
                getFieldDecorator('depositRate', {
                  initialValue: dict.depositRate.default,
                  rules: [{ required: true }],
                })(<InputNumber min={0} max={999} step={0.01} />,
                )
              }
            </FormItem>


            <FormItem label={dict.lendPeriod.title} {...formItemOptions}>
              {
                getFieldDecorator('lendPeriod', {
                  initialValue: dict.lendPeriod.default,
                  rules: [{ required: true }],
                })(<InputNumber min={1} max={999} step={1} />)
              }
            </FormItem>

            <FormItem label={dict.settlementWay.title} {...formItemOptions}>
              {
                getFieldDecorator('settlementWay', {
                  initialValue: dict.settlementWay.default,
                  rules: [{ required: true }],
                })(<Select {...selectWithSearchOptions} >
                  <Option key="0" >按包(整笔借款计)</Option>
                  <Option key="1" >按每笔订单结算(保留2位小数)</Option>
                  <Option key="2" >按每笔订单结算(保留多位小数)</Option>
                </Select>)
              }
            </FormItem>
            <FormItem label={dict.ignoreHoliday.title} {...formItemOptions}>
              {
                getFieldDecorator('ignoreHoliday', {
                  initialValue: dict.ignoreHoliday.default,
                  rules: [{ required: true }],
                })(<Select {...selectWithSearchOptions}>
                  <Option key="0" >节假日照常计息</Option>
                  <Option key="1" >节假日免息</Option>
                </Select>,
                )
              }
            </FormItem>


            <FormItem label={dict.settlementRetentionWay.title} {...formItemOptions}>
              {
                getFieldDecorator('settlementRetentionWay', {
                  initialValue: dict.settlementRetentionWay.default,
                  rules: [{ required: true }],
                })(<Select {...selectWithSearchOptions}>
                  <Option key="0" >四舍五入</Option>
                  <Option key="1" >向上取整</Option>
                  <Option key="2" >向下取整</Option>
                </Select>,
                )
              }
            </FormItem>
            <Row>
              <FormItem label={dict.settlementPeriod.title} {...formItemOptions}>
                {
                  getFieldDecorator('settlementPeriod', {
                    initialValue: dict.settlementPeriod.default,
                    rules: [{ required: false }],
                  })(
                    <InputNumber min={0} max={999} step={1} />,
                  )
                }
              </FormItem>
              <FormItem label={dict.settlementMethod.title} {...formItemOptions}>
                {
                  getFieldDecorator('settlementMethod', {
                    initialValue: dict.settlementMethod.default,
                    rules: [{ required: false }],
                  })(<Input type="textarea" />,
                  )
                }
              </FormItem>


              <FormItem label={dict.remark.title} {...formItemOptions}>
                {
                  getFieldDecorator('remark', {
                    initialValue: dict.remark.default,
                    rules: [{ required: false }],
                  })(<Input type="textarea" />)
                }
              </FormItem>
            </Row>


          </Form>
        </Modal>

      </div >
    );
  }
}
Adder.PropTypes = {};
Adder.defaultProps = {
  title: '新增结算条件',
  handleOk: null,
  creditorList: [],
};
export default Form.create()(Adder);
