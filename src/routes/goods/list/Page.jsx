import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Card, Table, Row, Col, Select, DatePicker, Input } from 'antd';
import "./Page.scss";

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const Option = Select.Option;

class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) { }

  handleChangeSelect = (e) => {

  }

  handleChangeRangePicker = (e) => {

  }

  render() {

    let dataSource = [];
    for (let i = 0; i < 10; i++) {
      dataSource.push({
        key: i,
        title: '丢失了一个皮夹子',
        category: "钱包",
        lost_palce: "图书馆",
        image_url: " - ",
        time: "2018-03-07 22:47",
      })
    }

    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '钱包',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '丢失地点',
      dataIndex: 'lost_palce',
      key: 'lost_palce',
    },
    {
      title: '图片',
      dataIndex: 'image_url',
      key: 'image_url',
    }];

    return (
      <div className="goods-list-page">
        <Card hoverable title="筛选条件">
          <Row>
            <Col span={12}>失物类别：
               <Select defaultValue="1"
                style={{ width: 200 }}
                showSearch={true}
                optionFilterProp={"children"}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                onChange={this.handleChangeSelect}>

                <Option value="1">钱包</Option>
                <Option value="2">手机</Option>
                <Option value="3">钥匙</Option>
                <Option value="4">宠物</Option>
                <Option value="5">卡类/证照</Option>
                <Option value="6">数码产品</Option>
                <Option value="7">手袋/挎包</Option>
                <Option value="8">衣服/鞋帽</Option>
                <Option value="9">首饰/挂饰</Option>
                <Option value="10">行李/包裹</Option>
                <Option value="11">书籍/文件</Option>
                <Option value="12">行其他</Option>
              </Select>
            </Col>
            <Col span={12}>丢失时间：<RangePicker placeholder={["请输入起始日期", "请输出截止日期"]} onChange={this.handleChangeRangePicker} />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={12}>丢失位置：
            <Input style={{ width: 200 }} />
            </Col>
          </Row>
        </Card>
        <Card className="table-list">
          <Table
          dataSource={dataSource}
          columns={columns} />
        < /Card>)
    </div>)
    }}

MainPage.PropTypes = {};
MainPage.defaultProps = {};
export default connect()(MainPage);
