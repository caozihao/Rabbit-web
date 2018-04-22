import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Card, Table, Row, Col, Select, DatePicker, Input } from 'antd';
import { Link } from 'dva/router';
import enumerateConstant from '../.././../config/enumerateConstant';
import "./Page.scss";

const { goodsType } = enumerateConstant;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const Option = Select.Option;

class GoodsListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsTypeOption: []
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) { }

  handleChangeSelect = (e) => {

  }

  handleChangeRangePicker = (e) => {

  }

  getGoodsType = () => {
    let goodsTypeOption = [];
    for (let i in goodsType) {
      goodsTypeOption.push(
        <Option key={i} value={i}>{goodsType[i]}</Option>
      )
    }
    return goodsTypeOption;
  }


  render() {

    let dataSource = [];
    for (let i = 1; i <= 100; i++) {
      dataSource.push({
        id: i,
        key: i,
        title: `丢失了一个皮夹子_${i}`,
        category: `钱包_${i}`,
        lost_palce: `图书馆_${i}`,
        image_url: " - ",
        time: "2018-03-07 22:47",
      })
    }

    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => {
        return (
          <Link to={`/detail/${record.id}`}>{text}</Link>)
      }
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

    const goodsOption = this.getGoodsType();

    return (
      <div className="goods-list-page com-margin-top">
        <Card hoverable title="筛选条件">
          <Row>
            <Col span={12}>失物类别：
               <Select defaultValue="1"
                style={{ width: 200 }}
                showSearch={true}
                optionFilterProp={"children"}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                onChange={this.handleChangeSelect}>
                {goodsOption}
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
        <Card className="table-list com-margin-top">
          <Table
            dataSource={dataSource}
            columns={columns} />
        </Card>
      </div>)
  }
}

GoodsListPage.PropTypes = {};
GoodsListPage.defaultProps = {};
export default connect()(GoodsListPage);
