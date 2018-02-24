import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
// import './QnSelect.less';
// const Option = Select.Option;
const log = console.log.bind(console);

class QnSelect extends Component {
  constructor(props) {
    super(props);
    if (typeof this.props.value !== 'undefined') {
      this.state = { value: this.props.value };
    } else if (this.props.mode && this.props.mode === 'multiple') {
      this.state = { value: [] };
    } else {
      this.state = { value: '' };
    }
  }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }
  onChange = (value) => {
    this.setState({ value }, () => {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(value);
      }
    });
  };
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

  filterOption = (input, option) => {
    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  }

  // 单个数值转换
  valueToStr = (value) => {
    // if (typeof value === 'string') {
    //   return value;
    // } else if (typeof value === 'number') {
    //   return `${value}`;
    // } else if (!value) {
    //   return undefined;
    // } else {
    //   console.log('select的value出错了,typeof value = ', typeof value);
    // }
    // if (typeof value === 'string' || typeof value === 'number') {
    //   return `${value}`;
    // } else if (!value) {
    //   return undefined;
    // } else {
    //   console.log('select的value出错了,typeof value = ', typeof value);
    // }

    // 简化版
    if (typeof value === 'string' || typeof value === 'number') {
      return `${value}`;
    } else if (value) {
      log('select传入的值有错误');
      log('typeof value', typeof value);
      log('value', value);
    }
    //  else {
    //   return undefined;
    // }
  }
  // 全部数值转换
  formatSelectValue = (value) => {
    if (Array.isArray(value)) {
      return value.map(item => this.valueToStr(item));
    } else {
      return this.valueToStr(value);
    }
  }

  render() {
    const filterProps = {
      showSearch: true,
      optionFilterProp: 'children',
      filterOption: this.filterOption,
    };
    let modeProps = {};
    if (this.props.mode) {
      if (this.props.mode === 'multiple') {
        modeProps = {
          mode: this.props.mode,
          // multiple: true,
        };
      } else {
        modeProps = {
          mode: this.props.mode,
        };
      }
    }

    const { onChange, options, nameKey, valueKey, disabled } = this.props;
    return (
      <Select
        className="QnSelect"
        {...filterProps}
        {...modeProps}
        {...this.props.otherProps}
        style={{ width: this.props.width, ...this.props.style }}
        allowClear={this.props.allowClear}
        value={this.formatSelectValue(this.state.value)}
        /* value={this.state.value} */
        onChange={this.onChange}
        disabled={disabled}
      >
        {this.getSelectOptions(options, nameKey, valueKey)}
      </Select>
    );
  }
}
QnSelect.PropTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
  nameKey: PropTypes.string,
  // nameKey: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.array,
  // ]),
  valueKey: PropTypes.string,
  disabled: PropTypes.bool,
  mode: PropTypes.string,
};

QnSelect.defaultProps = {
  onChange: () => { },
  options: [],
  nameKey: 'name', // TODO 使得他可以是一个数组, 会将数组中的数据组合后用来显示
  valueKey: 'value',
  disabled: false,
  width: '100%',
  style: {},
  allowClear: true,
  // mode 可以设置多选
  // 其他属性,原封不动的传入antd原生select组件
  otherProps: {
    placeholder: '请选择(支持输入搜索)',
  },
};
export default QnSelect;
