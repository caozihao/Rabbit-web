import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Table, Row, Col, Input, Button } from 'antd';
import enumerateConstant from '../../config/enumerateConstant';
import { pageSize } from '../../config/config';
import TableParams from './TableParams';
import "./BackUserPage.scss";

class BackUserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      nickname: ''
    }
    this.TableParams = (() => {
      TableParams.push({
        title: '操作',
        dataIndex: 'control',
        key: 'control',
        render: (text, record) => {
          const { status } = record;
          let result = '';
          if (status === 1) {
            result = <a href="javascript:void(0)" className="col-red" onClick={this.changeStatus.bind(this, record.id, 2)}>冻结</a>
          } else if (status === 2) {
            result = <a href="javascript:void(0)" className="col-green" onClick={this.changeStatus.bind(this, record.id, 1)}>解冻</a>
          }
          return result;
        }
      })
      return TableParams;
    })()
  }

  changeStatus = (id, status) => {
    const param = {
      ids: [id],
      status
    }
    this.props.batchUpdateStatusByIds(param);

  }

  componentDidMount() { }

  componentWillReceiveProps(nextProps) { }

  handleChangeInput = (type, e) => {
    let obj = {
      [type]: e.target.value,
    }
    this.setState(obj);
  }

  getListByOffset = () => {
    const params = this.getParams();
    this.props.getListByOffset(params);
  }

  getParams = () => {
    const { phone, nickname } = this.state;
    return {
      phone,
      nickname,
    }
  }

  handleTableChange = (page) => {
    const params = this.getParams();
    params.pageNo = page;
    this.props.getListByOffset(params);
  }

  render() {
    const { dataList, total } = this.props;
    let dataSource = dataList;

    const pageSetting = {
      defaultCurrent: 1,
      total,
      pageSize,
      onChange: this.handleTableChange,
    }

    return (
      <div className="BackUserPage com-margin-top">
        <Card hoverable title="筛选条件">
          <Row>
            <Col span={6}> 手机号：
            <Input onChange={this.handleChangeInput.bind(this, 'phone')} style={{ width: 200 }} />
            </Col>
            <Col span={6}> 昵称：
            <Input onChange={this.handleChangeInput.bind(this, 'nickname')} style={{ width: 200 }} />
            </Col>
            <Col span={3}>
              <Button type="primary" style={{ width: 100 }} onClick={this.getListByOffset}>搜索</Button>
            </Col>
          </Row>
        </Card>
        <Card className="table-list com-margin-top">
          <Table
            rowKey={item => item.id}
            dataSource={dataSource}
            columns={this.TableParams}
            pagination={pageSetting} />
        </Card>
      </div>)
  }
}

BackUserPage.PropTypes = {};
BackUserPage.defaultProps = {
  getListByOffset: () => { },
  batchUpdateStatusByIds: () => { },
  dataList: [],
  total: 0
};

export default BackUserPage;
