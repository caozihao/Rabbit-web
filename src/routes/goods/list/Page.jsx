import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Card, Table, Row, Col, Select, DatePicker, Input, Button, Pagination } from 'antd';
import { Link } from 'dva/router';
import enumerateConstant from '../.././../config/enumerateConstant';
import { pageSize } from '../../../config/config';
import TableParams from './TableParams';
import "./Page.scss";

const { goodsType } = enumerateConstant;
const { RangePicker } = DatePicker;
const Option = Select.Option;

class GoodsListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsTypeOption: [],
      category: '',
      startTime: '',
      endTime: '',
      place: ''
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) { }

  handleChangeSelect = (category) => {
    this.setState({
      category
    })
  }

  handleChangeRangePicker = (dates, dateStrings) => {
    this.setState({
      startTime: dateStrings[0],
      endTime: dateStrings[1]
    })
  }

  handleChangeInput = (e) => {
    this.setState({
      place: e.target.value,
    })
  }

  getGoodsType = () => {
    let goodsTypeOption = [];
    for (let i in goodsType) {
      goodsTypeOption.push(
        <Option key={i} value={i}>{goodsType[i]}</Option>
      )
    }
    goodsTypeOption.unshift(<Option key={-1} value={"-1"}>全部</Option>)
    return goodsTypeOption;
  }



  getListByOffset = () => {
    const params = this.getParams();
    this.props.getListByOffset(params);
  }

  getParams = () => {
    const { category, startTime, endTime, place } = this.state;
    return {
      category,
      startTime,
      endTime,
      place,
      pageNo: 1
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

    const goodsOption = this.getGoodsType();
    const pageSetting = {
      defaultCurrent: 1,
      total,
      pageSize,
      onChange: this.handleTableChange,
    }

    return (
      <div className="goods-list-page com-margin-top">
        <Card hoverable title="筛选条件">
          <Row>
            <Col span={6}>失物类别：
               <Select defaultValue="-1"
                style={{ width: 200 }}
                showSearch={true}
                optionFilterProp={"children"}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                onChange={this.handleChangeSelect}>
                {goodsOption}
              </Select>
            </Col>
            <Col span={9}>丢失时间：
            <RangePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder={["请输入起始日期", "请输出截止日期"]} onChange={this.handleChangeRangePicker} />
            </Col>
            <Col span={6}>丢失位置：
            <Input onChange={this.handleChangeInput} style={{ width: 200 }} />
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
            columns={TableParams}
            pagination={pageSetting} />
        </Card>
      </div>)
  }
}

GoodsListPage.PropTypes = {};
GoodsListPage.defaultProps = {
  getListByOffset: () => { },
  pageType: '',
  dataList: [],
  total: 0
};


export default GoodsListPage;
