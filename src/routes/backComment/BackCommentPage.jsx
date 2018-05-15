import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Table, Row, Col, Select, DatePicker, Input, Button } from 'antd';
import enumerateConstant from '../../config/enumerateConstant';
import { backPageSize as pageSize  } from '../../config/config';
import TableParams from './TableParams';
import utils from '../../utils/QueenAnt/utils/utils';
import "./BackCommentPage.scss";

const Option = Select.Option;

class BackCommentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: '',
      postTitle: '',
      status: '',
      userNickname:'',
      publishUserNickname:''
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
          const { status } = record;
          let result = '';
          if (status === 1) {
            result = <a href="javascript:void(0)" className="col-red" onClick={this.changeStatus.bind(this, record.id, 2)}>屏蔽</a>
          } else if (status === 2) {
            result = <a href="javascript:void(0)" className="col-green" onClick={this.changeStatus.bind(this, record.id, 1)}>解除</a>
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

  handleChangeInput = (type,e) => {
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

    const { postId, postTitle, status,userNickname,publishUserNickname } = this.state;
    return {
      postId,
      postTitle,
      status,
      userNickname,
      publishUserNickname,
      pageNo: 1
    }
  }

  handleTableChange = (page) => {
    const params = this.getParams();
    params.pageNo = page;
    this.props.getListByOffset(params);
  }

  render() {
    const { list, total } = this.props;
    let dataSource = list;

    const pageSetting = {
      defaultCurrent: 1,
      total,
      pageSize,
      onChange: this.handleTableChange,
    }

    return (
      <div className="BackCommentPage com-margin-top">
        <Card hoverable title="筛选条件">
          <Row>
            <Col span={4}>状态：
               <Select defaultValue=""
                style={{ width: 100 }}
                showSearch={true}
                optionFilterProp={"children"}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                onChange={this.handleChangeSelect.bind(this, 'status')}>
                <Option value="">全部</Option>
                <Option value="1">正常</Option>
                <Option value="2">已屏蔽</Option>
              </Select>
            </Col>
            <Col span={5}>发布人：
            <Input onChange={this.handleChangeInput.bind(this,'publishUserNickname')} style={{ width: 150 }} />
            </Col>
            <Col span={5}>评论人：
            <Input onChange={this.handleChangeInput.bind(this,'userNickname')} style={{ width: 150 }} />
            </Col>
            <Col span={7}>帖子标题：
            <Input onChange={this.handleChangeInput.bind(this,'postTitle')} style={{ width: 200 }} />
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

BackCommentPage.PropTypes = {};
BackCommentPage.defaultProps = {
  getListByOffset: () => { },
  batchUpdateStatusByIds: () => { },
  pageType: '',
  dataList: [],
  total: 0
};


export default BackCommentPage;
