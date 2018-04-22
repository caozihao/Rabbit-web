import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Card, List, Row, Col, Table } from 'antd';
import './MainPage.scss';

class MainPage extends Component {

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) { }

  render() {

    let data = [
      "张梦雪于2018-03-04 22:15认领了丢失皮夹子",
      "张梦雪于2018-03-04 22:15认领了丢失皮夹子",
    ]

    let dataSource = [];
    for (let i = 0; i < 10; i++) {
      dataSource.push({
        key: i,
        title: '丢失了一个皮夹子',
        time: "2018-03-07 22:47",
      })
    }

    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    }];


    return (
      <div className="MainPage com-margin-top">

        <Card hoverable title="最新动态">
          <List
            dataSource={data}
            renderItem={item => (<List.Item>{item}</List.Item>)}
          />
        </Card>

        <Row className="content com-margin-top">
          <Col span={12}  >
            <Card hoverable title="失物招领" extra={<a href="#">查看更多</a>}>
              <Table
                rowKey={"key"}
                dataSource={dataSource}
                columns={columns}
                pagination={false} />
            </Card>
          </Col>

          <Col span={12}  >
            <Card hoverable title="寻物启事" extra={<a href="#">查看更多</a>}>
              <Table
                rowKey={"key"}
                dataSource={dataSource}
                columns={columns}
                pagination={false} />
            </Card>
          </Col>

        </Row>
      </div>
    )

  }
}
MainPage.PropTypes = {};
MainPage.defaultProps = {};
export default connect()(MainPage);
