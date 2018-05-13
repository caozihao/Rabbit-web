import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, DatePicker, Row, Col, Button, TimePicker, Popconfirm, Radio } from 'antd';
// import QnSelect from '../../utils/QueenAnt/QnSelect';
// import QnListTagAdder from '../../utils/QueenAnt/QnListTagAdder';
import { QnSelect, QnListTagAdder } from '../qnComponents';
// import './QnForm.less';
// import log from '../log';

const FormItem = Form.Item;

class QnForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.genItems(this.props.formItems, this.props.formDict, this.props.formValues),
    };
  }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) {
    const items = this.genItems(nextProps.formItems, nextProps.formDict, nextProps.formValues);
    this.setState({ items });
  }
  onSubmit = () => {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        if (typeof this.props.onSubmit === 'function') {
          this.props.onSubmit(values);
        }
      }
    });
  }
  onPreview = () => {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        if (typeof this.props.onPreview === 'function') {
          this.props.onPreview(values);
        }
      }
    });
  }

  getSubmitPart = () => {
    if (this.props.needConfirm) {
      return (
        <Popconfirm
          title={`操作不可撤销, 确定${this.props.submitBtn}?`}
          onConfirm={this.onSubmit}
        >
          <Button
            type="primary"
            style={{ marginRight: '1rem' }}
          >
            {this.props.submitBtn || '提交'}
          </Button>
        </Popconfirm >
      );
    } else {
      return (<Button
        type="primary"
        onClick={this.onSubmit}
        size="default"

        style={{ marginRight: '1rem' }}
      >
        {this.props.submitBtn || '提交'}
      </Button>);
    }
  }
  getPreviewPart = () => {
    if (this.props.hasPreview) {
      return (
        <Button
          onClick={this.onPreview}
          style={{ marginRight: '1rem' }}
          size="default"
          type="primary"
        >
          {this.props.previewBtn || '预览'}
        </Button>
      );
    } else {
      return false;
    }
  }
  genGroup = (groupItem, dict, allValues) => {
    const children = groupItem.children;
    const len = children.length;
    // columns平均分段
    const span = Math.floor(24 / len);
    const columns = children.map((o) => {
      // 如果没有layout更改默认的layout
      const layout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 },
      };

      // o如果是obj,就取其name为key
      // o如果是string,就让o自己作为key
      return (
        <Col key={o.name || o} span={span}>
          {this.genItem(o, dict, allValues, layout)}
        </Col>
      );
    });
    return (<Row key={`GROUP${children[0].name || children[0]}`} >{columns}</Row>);
  }

  genItems = (formItems, dict, allValues) => {
    if (Array.isArray(formItems) && formItems.length > 0) {
      return formItems.map((item) => {
        if (typeof item === 'object' && item.name === 'GROUP') {
          return this.genGroup(item, dict, allValues);
        } else {
          return this.genItem(item, dict, allValues);
        }
      });
    }
  }

  genItem = (item, dict, allValues, layout = this.props.layout) => {
    const { getFieldDecorator } = this.props.form;

    // 将string类型的和obj类型的进行区分
    let setting;
    if (typeof item === 'string') {
      setting = { name: item };
    } else if (typeof item === 'object') {
      setting = item;
    }
    //  配置参数
    const name = setting.name;
    const { tag, title } = dict[name];
    const rules = dict[name].rules || [];
    // 汇总otherprops
    const otherPropsOfForm = (typeof setting.otherProps === 'undefined') ? {} : setting.otherProps;
    const otherPropsOfDict = (typeof dict[name].otherProps === 'undefined') ? {} : dict[name].otherProps;

    const formItemLayout = setting.layout || layout;
    // 如果otherProps中出现相同的属性, 从setting设置的要高于dict中的设置
    const tagStyle = { style: { width: '100%' } };
    const inputTagProps = { ...tagStyle, ...otherPropsOfDict, ...otherPropsOfForm };
    let initialValue;
    if (allValues) {
      initialValue = allValues[name];
    }
    // 根据tag生成不同的form体
    const selectTag = (
      <QnSelect
        {...inputTagProps}
        options={dict[name].options}
      />);
    const formPartDict = {
      Input: (<Input {...inputTagProps} />),
      InputNumber: (<InputNumber {...inputTagProps} />),
      DatePicker: (<DatePicker {...inputTagProps} />),
      TimePicker: (<TimePicker {...inputTagProps} />),
      QnListTagAdder: (<QnListTagAdder {...inputTagProps} />),
      Select: selectTag,
      QnSelect: selectTag,
    };
    const formPart = formPartDict[tag];

    // 生成最终的formItem
    return (
      <FormItem
        // style={{ border: '1px solid #ccc' }}
        {...formItemLayout}
        label={title}
        key={name}
      >
        {getFieldDecorator(name, {
          initialValue,
          rules,
        })(formPart)}
      </FormItem>
    );
  }


  render() {
    // log.log('qnFrom this.props', this.props);
    // log.log('layout', formItemLayout);
    const formItemLayout = this.props.layout;
    const submitPart = this.getSubmitPart();
    const previewPart = this.getPreviewPart();
    return (
      <div className="QnForm" >
        <Form >
          {this.state.items}

          <FormItem
            label="操作"
            {...formItemLayout}
          >
            {submitPart}
            {previewPart}

            <Button onClick={this.props.onCancel} size="default">
              {this.props.cancelBtn || '返回'}
            </Button>
          </FormItem>

        </Form>
      </div>
    );
  }
}
QnForm.PropTypes = {};
QnForm.defaultProps = {
  // formItems 格式
  // formItems =  [item1,item2,item3...]
  // item = string | obj
  // obj = {name,otherProps,layout}
  // otherProps = obj || {}
  // layout = {labelCol: { span: 5 }, wrapperCol: { span: 8 },}
  // name = str || GROUP
  // if name == GROUP  obj = {name:"GROUP",children:[item1,item2,item3...]}
  formItems: [],
  // formItems: [
  //   'goodsCategoryId',
  //   'description',
  //   {
  //     name: 'icon',
  //     otherProps: {},
  //     layout: {
  //       labelCol: { span: 5 },
  //       wrapperCol: { span: 8 },
  //     },
  //   },
  //   {
  //     name: 'GROUP',
  //     children: [
  //       {
  //         name: 'frozenPeriod',
  //         otherProps: {},
  //         layout: {
  //           labelCol: { span: 10 },
  //           wrapperCol: { span: 14 },
  //         },
  //       },
  //       {
  //         name: 'goodsCategoryId2',
  //         otherProps: {},
  //       },
  //       'raisePeriod',
  //     ],
  //   },
  //   {
  //     name: 'GROUP',
  //     children: [
  //       'stage', 'minInvestment', 'serviceFeeRate', 'transferable',
  //     ],
  //   },
  // ],
  formDict: null,
  formValues: null,

  // 按钮文字
  submitBtn: '提交',
  onSubmit: () => { },
  needConfirm: false,

  cancelBtn: '返回',
  onCancel: () => { },


  // 是否有预览按钮
  hasPreview: false,
  previewBtn: '预览',
  onPreview: () => { },

  layout: {
    labelCol: { span: 5 },
    wrapperCol: { span: 7 },
  },
  // confirmText: '操作不可撤回, 确定提交?',
};
export default Form.create()(QnForm);
