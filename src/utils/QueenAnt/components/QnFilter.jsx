// 版本号v1.1.0
// 更新日期 2017年11月17日

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Input, Select, DatePicker, InputNumber, Collapse, Tag, Form, Checkbox, Switch, Row, Col, Button, Icon } from 'antd';
import QnSelect from './QnSelect';
import './QnFilter.less';
// import { Group } from '../../../node_modules/_antd@2.13.7@antd/lib/radio';
// import log from '../log';

const FormItem = Form.Item;
const Panel = Collapse.Panel;
const log = console.log.bind(console);
// const log = () => { };
class QnFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tags: null,
    };
    this.ruleGroups = this.splitRules(this.props.rules, this.props.col);
    // tagDict = {a:{settings,tag}}
    this.tagDict = {};
  }

  // componentDidMount() { }

  componentWillReceiveProps(nextProps) {
    const isChanged = (name) => {
      return this.props[name] !== nextProps[name];
    };
    if (isChanged('rules') || isChanged('col')) {
      this.ruleGroups = this.splitRules(nextProps.rules, nextProps.col);
      // this.splitedForm = this.getSplitForm(nextProps.rules, nextProps.col);
    }
  }

  getSelectOptions = (data, nameKey = 'name', valueKey = 'id') => {
    const options = [];
    const Option = Select.Option;
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i += 1) {
        const name = data[i][nameKey];
        const value = data[i][valueKey];
        options.push(
          <Option
            key={`${value}`}
            value={`${value}`}
          >
            {name}</Option>,
        );
      }
    }
    return options;
  }

  /**
   * 作用:为select控件的值找到对应的名字, 以显示到筛选标签上
   */
  getLabelFromSelectOptions = (value, options, nameKey = 'label', valueKey = 'value', multiple = false) => {
    const findName = (itemValue) => {
      for (let i = 0; i < options.length; i += 1) {
        const option = options[i];
        if (option[valueKey] === itemValue) {
          return option[nameKey];
        }
      }
      return false;
    };

    if (typeof value !== 'undefined' && Array.isArray(options)) {
      if (!multiple) {
        return findName(value);
      } else if (Array.isArray(value) && value.length > 0) {
        const names = [];
        for (let j = 0; j < value.length; j += 1) {
          const name = findName(value[j]);
          if (name) {
            names.push(name);
          }
        }
        return names.join(' , ');
      } else {
        return false;
      }
    }
  }


  //----------------------------------------------------------------------
  // 用来生成表单的代码
  getInnerSelect = (rule) => {
    // select 和 QnSelect都用QnSelect来处理
    // 如果是select ,要检测额外的参数, 比如nameKey,valueKey,mode(mode=multiple多选)
    // 要对多选的标签显示进行特殊的处理
    const { nameKey, valueKey, mode } = rule;
    const otherProps = rule.otherProps || {};
    const selectProps = {
      nameKey: (typeof nameKey === 'undefined') ? 'label' : nameKey,
      valueKey: (typeof valueKey === 'undefined') ? 'value' : valueKey,
    };
    // let initValue;

    if (mode) {
      selectProps.mode = mode;
    }
    const result = (
      <QnSelect
        options={rule.options}
        width="100%"
        {...selectProps}
        {...otherProps}
        onChange={(value) => {
          this.handleItemChange(value, rule);
        }}
      />);
    return result;
  }
  getTag = (name, settings) => {
    let result;
    const { value, title, tag } = settings;
    if (typeof value !== 'undefined' && value !== '') {
      let tagValueToShow = value;

      // 如果是select ,根据select的值找到对应的label, 作为标签显示项
      if (tag === 'Select' || tag === 'QnSelect') {
        tagValueToShow = this.getSelectTagValue(settings);
        if (!tagValueToShow) {
          // 如果多选, 且值为空数组 []
          return;
        }
      }

      const timeStamp = (new Date()).getTime();
      const key = `${name}_${value}_${timeStamp}`;
      result = (
        <Tag
          key={key}
          className="filterTag"
          color="blue"
          closable
          onClose={() => {
            this.handleTagClose(settings);
          }}
        >
          {`${title}: ${tagValueToShow}`}
        </Tag>
      );
    }
    return result;
  }
  getSelectTagValue = (settings) => {
    const { mode, value } = settings;
    const nameKey = settings.nameKey || 'label';
    const valueKey = settings.valueKey || 'value';
    const multiple = (mode === 'multiple');

    const result = this.getLabelFromSelectOptions(
      value, settings.options, nameKey, valueKey, multiple);
    return result;
  }

  // 用来产生包在getFieldDecorator里面的表单tag
  getInnerTag = (rule) => {
    if (rule && rule.tag) {
      const otherProps = rule.otherProps || {};
      // otherProps.style = { width: '100%' };
      let innerSelect;
      if (rule.tag === 'Select' || rule.tag === 'QnSelect') {
        innerSelect = this.getInnerSelect(rule);
      }
      const dict = {
        Input: (
          <Input
            {...otherProps}
            style={{ width: '100%' }}
            onChange={(e) => {
              this.handleItemChange(e.target.value, rule);
            }}
          />),
        DatePicker: (
          <DatePicker
            style={{ width: '100%' }}
            {...otherProps}
            onChange={(dateMoment, dateStr) => {
              const value = rule.format ? dateMoment.format(rule.format) : dateStr;
              this.handleItemChange(value, rule);
            }}
          />),
        InputNumber: (
          <InputNumber
            style={{ width: '100%' }}
            {...otherProps}
            onChange={(value) => {
              this.handleItemChange(value, rule);
            }}
          />
        ),
        Select: innerSelect,
        QnSelect: innerSelect,
        Checkbox: (
          <Checkbox
            {...otherProps}
            onChange={
              (e) => {
                const value = e.target.checked;
                this.handleItemChange(value, rule);
              }
            }
          />
        ),
        Switch: (
          <Switch
            {...otherProps}
            onChange={
              (value) => {
                this.handleItemChange(value, rule);
              }
            }
          />),
      };

      const item = dict[rule.tag];
      return item;
    }
  }

  genFormItem = (rule) => {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 13 },
    };
    // const FormItem = Form.Item;
    if (rule && rule.tag) {
      const { name, title, initValue: initialValue } = rule;
      // console.log(`genFormItem name ${name}  initValue${initialValue}`);
      // 多数控件的值都是value, 而checkbox和 switch的是checked, 在这里根据tag设置valuePropName来完成适配
      let valuePropName = 'value';
      if (rule.tag === 'Switch' || rule.tag === 'Checkbox') {
        valuePropName = 'checked';
      }
      let item = null;
      const innerItem = this.getInnerTag(rule);
      item = (<FormItem {...formItemLayout} key={name} label={title}>
        {getFieldDecorator(name, { initialValue, valuePropName })(
          innerItem,
        )}
      </FormItem>);
      return item;
    }
  }
  genFormItems = (rules) => {
    const formItems = [];
    if (rules) {
      for (let i = 0; i < rules.length; i += 1) {
        formItems.push(this.genFormItem(rules[i]));
      }
    }
    return formItems;
    // log.log('rules', rules);
    // if (Array.isArray(rules) && rules.length > 0) {
    //   return rules.map(rule => this.genFormItem(rule));
    // }
  }
  //----------------------------------------------------------------------

  cleanFormValues = (dataObj) => {
    const cleanData = {};
    for (const itemKey in dataObj) {
      if (Object.prototype.hasOwnProperty.call(dataObj, itemKey)) {
        const itemValue = dataObj[itemKey];
        if (typeof itemValue !== 'undefined' && itemValue !== '' && itemValue !== null) {
          if (moment.isMoment(itemValue)) {
            cleanData[itemKey] = itemValue.format('YYYY-MM-DD');
          } else {
            cleanData[itemKey] = itemValue;
          }
        }
      }
    }
    return cleanData;
  }
  handleTagClose = (settings) => {
    const { name, tag, mode } = settings;
    let blankValue;
    switch (tag) {
      case 'QnSelect':
      case 'Select':
        if (mode === 'multiple') {
          blankValue = [];
        } else {
          blankValue = undefined;
        }
        break;
      default:
        break;
    }
    this.props.form.resetFields([name]);
    this.handleItemChange(blankValue, settings);
  }

  handleItemChange = (value, rule) => {
    const { name } = rule;
    const settings = { ...rule, value };
    this.tagDict[name] = {
      settings,
      tag: this.getTag(name, settings),
    };
    this.updateTags(this.tagDict);
    // 清洗数据,并通过回调函数输出
    if (this.props.triggerType !== 'click'
      && typeof this.props.handleChange === 'function') {
      // 此时获取的表单数据中, 没有当前改变的这一项, 所以要手动加进去
      const allValues = this.props.form.getFieldsValue();
      allValues[name] = value;
      this.props.handleChange(this.cleanFormValues(allValues));
    }
  }


  updateTags = (dict) => {
    const tags = [];
    const keys = Object.keys(dict);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const tag = dict[key].tag;
      if (tag) {
        tags.push(tag);
      }
    }
    this.setState({ tags });
  }
  genArray = (num, content) => {
    if (num > 0) {
      const arr = [];
      for (let i = 0; i < num; i += 1) {
        arr.push(content);
      }
      return arr;
    }
  }


  splitRules = (rules, col = 2) => {
    if (Array.isArray(rules) && rules.length > 0) {
      const result = [];
      for (let cnt = 0; cnt < col; cnt += 1) {
        result.push([]);
      }
      for (let i = 0; i < rules.length; i += 1) {
        const rule = rules[i];
        const groupIndex = i % col;
        // log(`i=${i} groupIndex = ${groupIndex}`);
        result[groupIndex].push(rule);
      }
      return result;
    } else {
      return this.genArray(col, undefined);
    }
  }
  clearFilter = () => {
    this.props.form.resetFields();
    this.setState({ tags: [] });
    this.tagDict = {};
    if (typeof this.props.handleChange === 'function') {
      this.props.handleChange({});
    }
  }
  // getSplitForm = (rules, col = 2) => {
  //   const ruleGroups = this.splitRules(rules, col);
  //   const span = Math.floor(24 / col);
  //   const cols = ruleGroups.map((group, index) => {
  //     return (<Col
  //       key={`fakeKey${index}`}
  //       span={span}
  //     >
  //       {this.genFormItems(group)}
  //     </Col>);
  //   });
  //   return (
  //     <Form>
  //       <Row>
  //         {cols}
  //       </Row>
  //     </Form>);
  // }
  genFoCNYyGroup = (ruleGroups) => {
    if (Array.isArray(ruleGroups) && ruleGroups.length > 0) {
      const col = ruleGroups.length;
      const span = Math.floor(24 / col);
      const cols = ruleGroups.map((group, index) => {
        return (<Col
          key={`fakeKey${index}`}
          span={span}
        >
          {this.genFormItems(group)}
        </Col>);
      });
      return (
        <Form>
          <Row>
            {cols}
          </Row>
        </Form>);
    }
  }
  getBtns = (triggerType) => {
    const clearBtn = (
      <Button
        className="clearBtn"
        icon="close"
        onClick={this.clearFilter}
      >清空</Button>);
    const searchBtn = triggerType === 'click' ?
      (<Button
        icon="search"
        type="primary"
        onClick={this.handleSearch}
      >查询</Button>)
      :
      null;
    return (
      <div>
        {clearBtn}
        {searchBtn}
      </div>);
  }
  handleSearch = () => {
    const query = {};
    const keys = Object.keys(this.tagDict);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = this.tagDict[key].settings.value;
      if (value) {
        query[key] = value;
      }
    }
    // log('query', query);
    const { handleChange, triggerType } = this.props;
    if (triggerType === 'click' && typeof handleChange === 'function') {
      handleChange(query);
    }
  }
  render() {
    return (
      <div className="QnFilter" >
        <Collapse defaultActiveKey={[]} >
          <Panel key="filter" header={<span><Icon type="filter" /> 筛选/查询</span>}>
            {
              this.genFoCNYyGroup(this.ruleGroups)
            }
            {this.getBtns(this.props.triggerType)}
            <div className="filterTagWrapper">

              <div className="tagsWrapper">
                {this.state.tags}
              </div>
            </div>
          </Panel>
        </Collapse>
      </div>
    );
  }
}

QnFilter.PropTypes = {
  handleChange: PropTypes.func,
  rules: PropTypes.array,
};

QnFilter.defaultProps = {
  handleChange: () => { },
  // triggerType: 'click', // change| click
  triggerType: 'change', // change| click
  col: 3, // 要能被24整除
  // rules: [
  //   {
  //     tag: 'Input',
  //     name: 'userMobile',
  //     title: '用户手机号',
  //     // initValue: undefined,
  //   }, {
  //     tag: 'InputNumber',
  //     name: 'orderCode',
  //     title: '订单编号',
  //     initValue: undefined,
  //   },
  //   {
  //     tag: 'Select',
  //     name: 'loanChannel',
  //     title: '放款渠道',
  //     initValue: [],
  //     // otherProps: {mode: 'multiple' },
  //     mode: 'multiple',
  //     options: [
  //       { label: '500元', value: '500' },
  //       { label: '1000元', value: '1000' },
  //       { label: '1500元', value: '1500' }],
  //   },
  //   {
  //     tag: 'Select',
  //     name: 'amount',
  //     title: '订单金额',
  //     // initValue: ['500', '1000', '1500'],
  //     initValue: undefined,
  //     // mode: 'multiple',
  //     options: [
  //       { label: '500元', value: '500' },
  //       { label: '1000元', value: '1000' },
  //       { label: '1500元', value: '1500' },
  //     ],
  //   },
  //   {
  //     tag: 'DatePicker',
  //     name: 'remitTimeStart',
  //     title: '放款开始:含当天',
  //     initValue: undefined,
  //   },
  //   {
  //     tag: 'Checkbox',
  //     name: 'checkMe',
  //     title: 'checkMe',
  //     initValue: undefined,
  //   },
  //   {
  //     tag: 'Switch',
  //     name: 'Switch',
  //     title: 'Switch',
  //     initValue: undefined,
  //   },
  // ],
  filteredRules: [],
};
export default Form.create({})(QnFilter);
