// version:1.0.0
// updated:2017-12-8 14:21:26


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Button, Input, InputNumber,
  DatePicker, Form, Tooltip, Icon,
} from 'antd';
import QnSelect from './QnSelect';
import QnListTagAdder from './QnListTagAdder.jsx';
// import './QnFormModal.less';
const log = console.log.bind(console);
const FormItem = Form.Item;
class QnFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) {
    // const isChanged = (name) => {
    //   return (this.props[name] !== nextProps[name]);
    // };
    // if (isChanged('formDict')) {

    // }
  }


  handleTriggerBtnClick = () => {
    const { handleTriggerClick, isShow } = this.props;

    if (typeof handleTriggerClick === 'function') {
      handleTriggerClick();
    }

    if (typeof isShow === 'function') {
      if (isShow()) {
        this.setState({ visible: true });
      } else {
        this.setState({ visible: false });
      }
    } else if (!isShow) {
      this.setState({ visible: true });
    }
  }

  handleModalOk = () => {
    this.props.form.validateFields((error, values) => {
      if (!error) {
        this.setState({ visible: false });
        if (typeof this.props.handleOk === 'function') {
          this.props.handleOk(values);
          if (this.props.resetAfterSuccess) {
            this.props.form.resetFields();
          }
        }
      }
    });
  }

  handleModalCancel = () => {
    this.setState({
      visible: false,
    });
  }
  genFormItem = (itemData, dataDict, initValueObj) => {
    const { getFieldDecorator } = this.props.form;
    const inputLayout = {
      style: { width: '100%' },
    };

    // log('itemData', itemData);
    const name = typeof itemData === 'string' ? itemData : itemData.name;
    // const { name } = itemData;

    const { tag, title } = dataDict[name];
    const rules = dataDict[name].rules || [];

    const otherPropsOfForm = (typeof itemData.otherProps === 'undefined') ? {} : itemData.otherProps;
    const otherPropsOfDict = (typeof dataDict[name].otherProps === 'undefined') ? {} : dataDict[name].otherProps;
    const itemProps = { ...inputLayout, ...otherPropsOfDict, ...otherPropsOfForm };
    // log('itemProps', { ...otherPropsOfDict, ...otherPropsOfForm });
    const formPartDict = {
      Input: (
        <Input
          {...itemProps}
        />),
      InputNumber: (
        <InputNumber
          {...itemProps}
        />),
      DatePicker: (
        <DatePicker
          {...itemProps}
        />),
      QnSelect: (
        <QnSelect
          {...itemProps}
          options={dataDict[name].options}
        />),
      Select: (
        <QnSelect
          {...itemProps}
          options={dataDict[name].options}
        />),
      QnListTagAdder:
        (<QnListTagAdder {...itemProps} />),
    };

    const formPart = formPartDict[tag];
    // const formPart = (<Input />);

    // 空对象在索引不存在的key值时, 会返回undefined ,但null和undefind若索引会报错并卡死
    const initValues = initValueObj || {};
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 14 },
    };
    return (
      <FormItem
        {...formItemLayout}
        label={title}
        key={name}
      >
        {
          getFieldDecorator(name, {
            // valuePropName: 'value',
            initialValue: (typeof initValues[name] === 'undefined') ? undefined : initValues[name],
            rules,
          })(formPart)
        }
      </FormItem>
    );
  }
  genFormItems = (itemDataArr, dataDict, initValueObj) => {
    if (Array.isArray(itemDataArr) && itemDataArr.length > 0) {
      const items = [];
      for (let i = 0; i < itemDataArr.length; i += 1) {
        items.push(this.genFormItem(itemDataArr[i], dataDict, initValueObj));
      }
      return items;
    }
  }

  getAllFormItemsFromDict = (dict) => {
    const items = [];
    for (const itemKey in dict) {
      if (Object.prototype.hasOwnProperty.call(dict, itemKey)) {
        items.push({ name: itemKey });
      }
    }
    // console.log('getAllFormItemsFromDict items------->', items);
    return items;
  }

  render() {
    let trigger = null;
    if (this.props.triggerType === 'button') {
      trigger = (
        <Button
          {...this.props.buttonProps}
          className="triggerBtn"
          onClick={this.handleTriggerBtnClick}
        >{this.props.buttonProps.title}</Button>);
    } else if (this.props.triggerType === 'a') {
      trigger = (
        <a
          onClick={this.handleTriggerBtnClick}
        >
          {this.props.triggerTitle}
        </a>);
    }

    const itemDataArr = this.props.formItems || this.getAllFormItemsFromDict(this.props.formDict);
    const formItems = this.genFormItems(itemDataArr, this.props.formDict, this.props.formInitValueObj);
    return (
      <span className="QnFormModal">
        {
          this.props.hasTooltip ?
            (<Tooltip title={this.props.title}>
              {trigger}
            </Tooltip>)
            : trigger
        }
        <Modal
          className="mainModal"
          title={this.props.title}
          visible={this.state.visible}
          onOk={this.handleModalOk}
          onCancel={this.handleModalCancel}
          closable
        >
          {formItems}
        </Modal>
      </span>
    );
  }
}
QnFormModal.PropTypes = {};
QnFormModal.defaultProps = {
  title: '打开modal',
  triggerType: 'button', // 触发器的样式 可以是button | a,
  triggerTitle: (<span><Icon type="edit" />打开modal</span>),
  buttonProps: {
    type: 'primary',
    icon: 'plus',
    title: <Icon type="rocket" />,
  },
  handleTriggerClick: null,
  isShow: null,
  handleOk: null,
  // formItems:格式 [
  //   { name: 'roleName' },
  //   { name: 'permissions' },
  //   { name: 'isAdmin' },
  // ],
  formItems: null,
  formDict: null,
  formInitValueObj: null,
  hasTooltip: false,
  // creditorList: [],
  resetAfterSuccess: true,
};

export default Form.create()(QnFormModal);
