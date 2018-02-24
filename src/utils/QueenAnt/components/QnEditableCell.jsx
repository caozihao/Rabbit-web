import React, { Component } from 'react';
import { Icon, Select, Input } from 'antd';
import PropTypes from 'prop-types';
// import './EditableCellInput.css';
import './QnEditableCell.less';
import QnSelect from './QnSelect';
// import log from '../log';

// const Option = Select.Option;
/**
 * 可编辑的单元格
 * 输入参数: props.value 数值
 * props:.isInitEditable 一开始是不是可编辑的
 * props:.onChange 单元格内容变化回调函数
 * props:.options
 * @class EditableCellInput
 * @extends {Component}
 */
class QnEditableCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      editable: this.props.isInitEditable,
    };
  }


  getSelectOptions = (data, nameKey = 'name', valueKey = 'id') => {
    const options = [];
    const Option = Select.Option;
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i += 1) {
        const name = data[i][nameKey];
        const value = data[i][valueKey];
        options.push(<Option key={`${value}`} value={`${value}`}>{name}</Option>);
      }
    }
    return options;
  }


  getLableFromValue = (value, options = [], nameKey = 'title', valueKey = 'value') => {
    if (typeof value === 'undefined' || options.length === 0) {
      return '请输入';
    }
    for (let i = 0; i < options.length; i += 1) {
      const option = options[i];
      if (option[valueKey] === `${value}`) {
        return option[nameKey];
      }
    }
    return value;
  }


  getContent = (type, editable) => {
    const iconCheck = (
      <Icon
        className="editable-cell-icon-check"
        type="check"
        onClick={this.check}
      />);
    const iconEdit = (
      <Icon
        type="edit"
        className="editable-cell-icon"
        onClick={this.edit}
      />);

    let content = null;
    if (editable) {
      if (type === 'select') {
        content = (
          <div className="editable-cell-input-wrapper">
            <QnSelect
              value={`${this.state.value}`}
              onChange={this.handleChange}
              options={this.props.options}
              nameKey={this.props.nameKey}
              valueKey={this.props.valueKey}
            />
            {iconCheck}
          </div>);
      } else if (type === 'input') {
        content = (
          <div className="editable-cell-input-wrapper">
            <Input
              value={this.state.value}
              onChange={(event) => {
                const value = event.target.value;
                this.handleChange(value);
              }}
            />
            {iconCheck}

          </div>);
      }
    } else if (type === 'select') {
      content = (
        <div className="editable-cell-text-wrapper">
          {this.getLableFromValue(this.state.value, this.props.options, this.props.nameKey, this.props.valueKey)}
          {iconEdit}
        </div>
      );
    } else if (type === 'input') {
      content = (
        <div className="editable-cell-text-wrapper">
          {this.state.value}
          {iconEdit}
        </div>
      );
    }
    return content;
  }

  edit = () => {
    this.setState({ editable: true });
  };

  check = () => {
    this.setState({ editable: false });
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.state.value);
    }
  };

  handleChange = (value) => {
    this.setState({ value });
  };

  render() {
    const content = this.getContent(this.props.type, this.state.editable);
    return (
      <div className="QnEditableCell">
        {content}
      </div>

    );
  }
}

QnEditableCell.PropTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  isInitEditable: PropTypes.bool,
  options: PropTypes.array,
  placeholder: PropTypes.string.isRequired,
};

QnEditableCell.defaultProps = {
  type: 'input', // 'select;
  isInitEditable: false,
  // value: '',
  nameKey: 'title',
  valueKey: 'value',
  options: null,
  placeholder: '请选择',
};

export default QnEditableCell;

