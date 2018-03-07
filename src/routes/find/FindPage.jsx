import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Card, Table } from 'antd';

class MainPage extends Component {

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) { }

  render() {

    const dataSource = [{
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号'
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }];

    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    }];

    return (
      <div>
        <Card className="MainPage">
          <Table dataSource={dataSource} columns={columns} />
        </Card>)
    </div>)
  }
}
MainPage.PropTypes = {};
MainPage.defaultProps = {};
export default connect()(MainPage);
