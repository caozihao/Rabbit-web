import { Form, Input, InputNumber, DatePicker, Row, Col, TimePicker, Popconfirm, Button } from 'antd';
import { QnSelect, QnListTagAdder } from '../qnComponents';

class FormGen {
  constructor(dict, form, initValueObj, defaultLayout) {
    this.dict = dict;
    this.form = form;
    this.initValueObj = initValueObj;
    this.defaultLayout = defaultLayout || {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
    };
  }
  setDict(dict) {
    this.dict = dict;
  }
  setForm(form) {
    this.form = form;
  }
  setInitValueObj(obj) {
    this.initValueObj = obj;
  }
  // 根据tag生成不同的form体
  getFormPart(name, tag, inputTagProps) {
    const selectTag = (
      <QnSelect
        {...inputTagProps}
        options={this.dict[name].options}
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
    return formPartDict[tag];
  }

  getTagProps(setting) {
    const { name } = setting;
    // 汇总otherprops
    const otherPropsOfForm = setting.otherProps || {};
    const otherPropsOfDict = this.dict[name].otherProps || {};
    // 如果otherProps中出现相同的属性, 从setting设置的要高于dict中的设置
    const style = { width: '100%', maxWidth: '500px' };
    // const style = { width: '100%' };
    const result = { style, ...otherPropsOfDict, ...otherPropsOfForm };
    return result;
  }

  genItem(item) {
    // const dict = this.dict;

    // 将string类型的和obj类型的进行区分
    let setting;
    if (typeof item === 'string') {
      setting = { name: item };
    } else if (typeof item === 'object') {
      setting = item;
    }
    //  配置参数
    const name = setting.name;
    const { tag, title } = this.dict[name];
    const rules = this.dict[name].rules || [];

    let initialValue;
    if (this.initValueObj) {
      initialValue = this.initValueObj[name];
    }

    // formItemLayout,title,name,initialValue,rules,formPart
    const tagProps = this.getTagProps(setting);
    const formPart = this.getFormPart(name, tag, tagProps);
    const formItemLayout = setting.layout || this.defaultLayout;
    const { getFieldDecorator } = this.form;

    // 生成最终的formItem
    return (
      <Form.Item
        {...formItemLayout}
        label={title}
        key={name}
      >
        {getFieldDecorator(name, {
          initialValue,
          rules,
        })(formPart)}
      </Form.Item>
    );
  }

  genItems(formItems) {
    if (Array.isArray(formItems) && formItems.length > 0) {
      return formItems.map((item) => {
        if (typeof item === 'object' && item.name === 'GROUP') {
          return this.genGroup(item);
        } else {
          return this.genItem(item);
        }
      });
    }
  }

  genGroup(groupItem) {
    const children = groupItem.children;
    const len = children.length;
    // columns平均分段
    const span = Math.floor(24 / len);
    const columns = children.map((o) => {
      // o如果是obj,就取其name为key
      // o如果是string,就让o自己作为key

      const colKey = o.name || o;
      return (
        <Col
          key={colKey}
          span={span}
        >
          {this.genItem(o)}
        </Col>
      );
    });
    const rowKey = `GROUP${children[0].name || children[0]}`;
    return (
      <Row
        key={rowKey}
      >
        {columns}
      </Row>);
  }

  genSubmitPart(onSubmit = () => { }, needConfirm = false, submitBtnText = '提交') {
    if (needConfirm) {
      return (
        <Popconfirm
          title={`操作不可撤销, 确定${submitBtnText}?`}
          onConfirm={onSubmit}
        >
          <Button
            type="primary"
            style={{ marginRight: '1rem' }}
          >
            {submitBtnText || '提交'}
          </Button>
        </Popconfirm >
      );
    } else {
      return (<Button
        type="primary"
        onClick={onSubmit}
        size="default"
        style={{ marginRight: '1rem' }}
      >
        {submitBtnText || '提交'}
      </Button>);
    }
  }
}

export default FormGen;

// 格式说明
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
