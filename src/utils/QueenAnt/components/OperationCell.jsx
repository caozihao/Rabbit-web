import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Popconfirm } from 'antd';
import './OperationCell.less';

class OperationCell extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) { }
  handleEdit = () => {
    const { text, index, record, onEdit } = this.props;
    if (typeof onEdit === 'function') {
      onEdit(text, record, index);
    }
  }
  handleDelete = () => {
    const { text, index, record, onDelete } = this.props;
    if (typeof onDelete === 'function') {
      onDelete(text, record, index);
    }
  }

  render() {
    const btnOptions = {
      className: 'operationCellBtn',
      type: 'dashed',
    };
    return (
      <div className="queen-ant-operationCell" >
        <Button {...btnOptions} onClick={this.handleEdit} ><Icon type="edit" /></Button>
        <Popconfirm
          title="操作不可恢复,确定要删除?"
          onConfirm={this.handleDelete}
        >
          <Button {...btnOptions} ><Icon type="delete" /></Button>
        </Popconfirm>
      </div>
    );
  }
}
OperationCell.PropTypes = {

};
OperationCell.defaultProps = {
  text: '',
  index: 0,
  record: {},
  onEdit: null, // 编辑按钮响应函数
  onDelete: null, // 删除按钮响应函数
};
export default OperationCell;
