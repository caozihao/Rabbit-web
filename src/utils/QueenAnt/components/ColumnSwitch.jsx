import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Collapse } from 'antd';
import './ColumnSwitch.less';

const Panel = Collapse.Panel;
const CheckboxGroup = Checkbox.Group;

/**
 * 作用:用来显示和隐藏table列的组件
 *
 * @class ColumnSwitch
 * @extends {Component}
 */
class ColumnSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedList: this.props.defaultCheckedList,
      allValues: [],
      indeterminate: true,
      checkAll: false,
      options: [],
    };
  }


  componentWillMount() {
    this.update(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.update(nextProps);
  }

  update = (props) => {
    const options = [];
    const allValues = [];
    const { columns } = props;
    if (columns) {
      for (let i = 0; i < columns.length; i += 1) {
        options.push({
          label: columns[i].title,
          value: columns[i].dataIndex,
        });
        allValues.push(columns[i].dataIndex);
      }
      this.setState({ options, allValues });
    }
  }

  handleChange = (checkedList) => {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(checkedList);
    }
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < this.props.columns.length),
      checkAll: checkedList.length === this.props.columns.length,
    });
  };
  handleCheckAllChange = (e) => {
    const curCheckedList = e.target.checked ? this.state.allValues : [];
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(curCheckedList);
    }
    this.setState({
      checkedList: curCheckedList,
      indeterminate: false,
      checkAll: e.target.checked,
    });
  }
  render() {
    return (
      <div className="queen-ant-columnSwitch">
        <Collapse defaultActiveKey={['']} >
          <Panel header="显示和隐藏列" key="1">
            <Checkbox
              indeterminate={this.state.indeterminate}
              checked={this.state.checkAll}
              onChange={this.handleCheckAllChange}
              className="columnSwitchCheckAll"
            >全选</Checkbox>
            <CheckboxGroup
              className="columnSwitchCheckboxGroup"
              options={this.state.options}
              value={this.state.checkedList}
              onChange={this.handleChange}
            />
          </Panel>
        </Collapse>
      </div>
    );
  }
}

ColumnSwitch.PropTypes = {
  columns: PropTypes.array,

};
ColumnSwitch.defaultProps = {
  columns: [],
  defaultCheckedList: [],
  onChange: (checkedList) => {
  },
};
export default ColumnSwitch;
