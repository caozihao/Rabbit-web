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
    let data1 = <p><b>张梦雪</b>于<b>2018-03-04 22:15</b>认领了<b>丢失皮夹子</b></p>
    let data2 = <p><b>张梦雪</b>于<b>2018-03-04 22:15</b>发布了<b>丢了一个皮夹子</b></p>


    const dataSource = [{
      key: '1',
      title: '丢失了一个皮夹子',
      time: "2018-03-07 22:47",
    }, {
      key: '2',
      title: '捡到了一个皮夹子',
      time: "2018-03-07 22:47",
    }];

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
      <div className="MainPage">
        <Card  title="最新动态">
          <List
            dataSource={data}
            renderItem={item => (<List.Item>{item}</List.Item>)}
          />
        </Card>
        <Row className="main-content">
          <Col span={12}  >
            <Card title="失物招领" extra={<a href="#">查看更多</a>}>
              <Table
              dataSource={dataSource}
              columns={columns}
              pagination = {false}/>
            </Card>
          </Col>

          <Col span={12}  >
            <Card title="寻物启事" extra={<a href="#">查看更多</a>}>
              <Table
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
