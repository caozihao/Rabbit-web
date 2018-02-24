import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popconfirm, Menu, Icon, Dropdown, message } from 'antd';
// import log from '../log';
import './QnOperationCell.less';

class QnOperationCell extends Component {

  genField = (settings) => {
    const { title, render, needConfirm, onClick, icon } = settings;
    let titleBtn = title;
    if (icon) {
      titleBtn = (<span><Icon type={icon} />{title} </span>);
    }
    if (render) {
      return render(this.props.record);
    } else if (needConfirm) {
      return (
        <Popconfirm
          key={title}
          title={`操作不可撤销, 确定${title}?`}
          onConfirm={() => { onClick(this.props.record); }}
        >
          <a key={title} href="javascirpt:;">{titleBtn}</a>
        </Popconfirm >
      );
    } else {
      return (<a key={title} onClick={() => { onClick(this.props.record); }} >{titleBtn}</a>);
    }
  }


  genMainFields = (arr) => {
    const fields = arr.map(item => this.genField(item));
    // const sep = (<span className={styles.separater}>|</span>);
    const results = [];
    for (let i = 0; i < fields.length; i += 1) {
      results.push(fields[i]);
      results.push(<span key={`seprater${i}`} className="separater">|</span>);
    }
    // 将最后一个分隔符删掉
    results.pop();
    return results;
  }
  genFoldedFields = (arr) => {
    if (Array.isArray(arr) && arr.length > 0) {
      const fields = arr.map(item => this.genField(item));
      const menuItems = fields.map(item => (<Menu.Item>{item}</Menu.Item>));
      return (<Menu>{menuItems}</Menu>);
    }
  }

  genAllFields = (config) => {
    const mainFields = this.genMainFields(config.main);
    const sep = (<span key="foldedMenuSeparater" className="separater">|</span>);
    const foldedFields = this.genFoldedFields(config.folded);
    let dropdownMenu = null;
    if (foldedFields) {
      // 如果有折叠菜单
      const menu = (<Menu>{foldedFields}</Menu>);
      dropdownMenu = (<Dropdown overlay={menu}>
        <a key="more" className="ant-dropdown-link" href="javascirpt:;" >
          更多 <Icon type="down" />
        </a>
      </Dropdown >);
    }
    return (<div>
      {mainFields}
      {
        dropdownMenu ? sep : false
      }
      {dropdownMenu}
    </div>);
  }

  render() {
    const jsx = this.genAllFields(this.props.config);
    return (
      <div className="QnOperationCell">
        {jsx}
      </div>
    );
  }
}
QnOperationCell.PropTypes = {
  handleRemove: PropTypes.func,
};
QnOperationCell.defaultProps = {
  // config: {
  //   // 主要的, 不折叠的
  //   main: [{
  //     title: '详情',
  //     // 自定义的render函数,用于渲染菜单内容
  //     render: (record) => {
  //       return <a>我是详情id={record.id}</a>;
  //     },
  //   }, {
  //     title: '删除',
  //     // 如果不写render函数, 就会生成一个<a>标签
  //     needConfirm: true,
  //     onClick: (record) => {
  //       message.info(`id为${record.id}的项目被删除了`);
  //     },
  //   },
  //   ],
  //   // 次要的, 折叠在`更多`中
  //   folded: [
  //     {
  //       title: '次要1',
  //       needConfirm: true,
  //       onClick: (record) => { },
  //     },
  //     {
  //       title: '次要2',
  //       needConfirm: false,
  //       onClick: (record) => { },
  //     },
  //   ],
  // },
  config: null,
  record: null,
};
export default QnOperationCell;
