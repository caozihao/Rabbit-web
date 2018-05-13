import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Table, Row, Col, Select, DatePicker, Input, Button } from 'antd';
import enumerateConstant from '../../config/enumerateConstant';
import { backPageSize as pageSize } from '../../config/config';
import { Link } from 'dva/router';
import TableParams from './TableParams';
import utils from '../../utils/QueenAnt/utils/utils';
import "./BackPostPage.scss";

const { postType } = enumerateConstant;
const { RangePicker } = DatePicker;
const Option = Select.Option;

class BackPostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postTypeOption: [],
      goodsCategory: '',
      startTime: '',
      endTime: '',
      goodsPlace: '',
      type: '',
      status: ''
    }
  }

  componentDidMount() {

  }

  componentWillMount() {
    if (!utils.ifColmnsHasSameKey(TableParams, 'control')) {
      TableParams.push({
        title: '操作',
        dataIndex: 'control',
        key: 'control',
        render: (text, record) => {
          const { status,id } = record;
          let endDom = <a href="javascript:void(0)" className="col-grey" onClick={this.changeStatus.bind(this, record.id, 2)}> 结束 </a>;
          let sealDom = <a href="javascript:void(0)" className="col-red" onClick={this.changeStatus.bind(this, record.id, 3)}> 封禁 </a>;
          let unsealDom = <a href="javascript:void(0)" className="col-green" onClick={this.changeStatus.bind(this, record.id, 1)}> 解封 </a>;
          let openDom = <a href="javascript:void(0)" className="col-green" onClick={this.changeStatus.bind(this, record.id, 1)}> 打开 </a>;
          let seeCommentDom =  <Link to={`/back/comment/${id}`}>查看评论</Link>
          let result = '';
          if (status === 1) {
            result = <p>{sealDom} {endDom} {seeCommentDom}</p>;
          } else if (status === 2) {
            result = openDom;
          } else if (status === 3) {
            result = unsealDom;
          }
          return result;
        }
      });

      this.TableParams = TableParams;
    }
  }


  changeStatus = (id, status) => {
    const param = {
      ids: [id],
      status
    }
    this.props.batchUpdateStatusByIds(param);
  }



  componentWillReceiveProps(nextProps) { }

  handleChangeSelect = (type, value) => {
    let obj = {
      [type]: value,
    }
    this.setState(obj);
  }

  handleChangeRangePicker = (dates, dateStrings) => {
    this.setState({
      startTime: dateStrings[0],
      endTime: dateStrings[1]
    })
  }

  handleChangeInput = (e) => {
    this.setState({
      goodsPlace: e.target.value,
    })
  }

  getPostType = () => {
    let postTypeOption = [];
    for (let i in postType) {
      postTypeOption.push(
        <Option key={i} value={i}>{postType[i]}</Option>
      )
    }
    postTypeOption.unshift(<Option key={-1} value={""}>全部</Option>)
    return postTypeOption;
  }


  getListByOffset = () => {
    const params = this.getParams();
    this.props.getListByOffset(params);
  }

  getParams = () => {
    const { goodsCategory, startTime, endTime, goodsPlace, type, status } = this.state;
    return {
      goodsCategory,
      startTime,
      endTime,
      goodsPlace,
      type,
      status,
      pageNo: 1
    }
  }

  handleTableChange = (page) => {
    const params = this.getParams();
    params.pageNo = page;
    this.props.getListByOffset(params);
  }

  render() {
    const { allList, allTotal } = this.props;
    let dataSource = allList;

    const postOption = this.getPostType();

    const pageSetting = {
      defaultCurrent: 1,
      allTotal,
      pageSize,
      onChange: this.handleTableChange,
    }

    return (
      <div className="BackPostPage com-margin-top">
        <Card hoverable title="筛选条件">
          <Row>
            <Col span={3}>类型：
               <Select defaultValue=""
                style={{ width: 100 }}
                showSearch={true}
                optionFilterProp={"children"}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                onChange={this.handleChangeSelect.bind(this, 'type')}>
                <Option value="">全部</Option>
                <Option value="search">寻物</Option>
                <Option value="receive">招领</Option>
              </Select>
            </Col>
            <Col span={4}>物品类别：
               <Select defaultValue=""
                style={{ width: 120 }}
                showSearch={true}
                optionFilterProp={"children"}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                onChange={this.handleChangeSelect.bind(this, 'goodsCategory')}>
                {postOption}
              </Select>
            </Col>
            <Col span={3}>状态：
               <Select defaultValue=""
                style={{ width: 100 }}
                showSearch={true}
                optionFilterProp={"children"}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                onChange={this.handleChangeSelect.bind(this, 'status')}>
                <Option value="">全部</Option>
                <Option value="1">发布中</Option>
                <Option value="2">已结束</Option>
                <Option value="3">已下架</Option>
              </Select>
            </Col>
            <Col span={8}>丢失时间：
            <RangePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder={["请输入起始日期", "请输出截止日期"]} onChange={this.handleChangeRangePicker} />
            </Col>
            <Col span={3}>位置：
            <Input onChange={this.handleChangeInput} style={{ width: 120 }} />
            </Col>
            <Col span={2}>
              <Button type="primary" onClick={this.getListByOffset}>搜索</Button>
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

BackPostPage.PropTypes = {};
BackPostPage.defaultProps = {
  getListByOffset: () => { },
  batchUpdateStatusByIds: () => { },
  pageType: '',
  dataList: [],
  total: 0
};


export default BackPostPage;
