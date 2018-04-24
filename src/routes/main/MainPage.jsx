import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Card, List, Row, Col, Table } from 'antd';
import TableParams from './TableParams';
import { pageSize } from '../../config/config';
import enumerateConstant from "../../config/enumerateConstant";
import dataRender from '../../utils/QueenAnt/utils/dataRender';
import './MainPage.scss';

const { goodsType } = enumerateConstant;

class MainPage extends Component {

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) { }

  handleTableChange = (type, page) => {
    const params = {
      type,
      pageNo: page
    }
    this.props.getListByOffset(params);
  }


  dealWithItem = (item) => {
    const { place, type, category, createdTime, userPhone } = item;
    let typeStr = '';
    let categoryStr = <span className="deepen-word">{goodsType[category]}</span>;
    let time = <span className="deepen-word">{dataRender.renderTime(createdTime)}</span>;
    let placeStr = <span className="deepen-word">{place}</span>
    let phoneStr = userPhone.toString();
    let frontWord = phoneStr.substring(0, 3);
    let endWord = phoneStr.substring(phoneStr.length - 3, phoneStr.length);
    let newPhone = <span className="deepen-word"> {`${frontWord} *** ${endWord}`}  </span>

    if (type === 'search') {
      typeStr = <span className="deepen-word">寻找</span>
    } else {
      typeStr = <span className="deepen-word">发现</span>
    }

    return <p>手机用户  {newPhone} 在 {time} {placeStr} {typeStr} 1件 {categoryStr}</p>

  }

  render() {
    const { receiveList, searchList, receiveTotal, searchTotal, allList } = this.props;

    const searchPageSetting = {
      defaultCurrent: 1,
      total: searchTotal,
      pageSize,
      onChange: this.handleTableChange.bind(this, 'search'),
    }

    const receivePageSetting = {
      defaultCurrent: 1,
      total: receiveTotal,
      pageSize,
      onChange: this.handleTableChange.bind(this, 'receive'),
    }


    return (
      <div className="MainPage com-margin-top">

        <Card className="latest-news" hoverable title={<b>最新动态</b>}>
          <List
            dataSource={allList}
            renderItem={item => (<List.Item> {this.dealWithItem(item)}</List.Item>)}
          />
        </Card>

        <Row className="content com-margin-top">
          <Col span={12}>
            <Card className="card-table" hoverable title={<b>失物招领</b>} extra={<a href="/#/receive">查看更多</a>}>
              <Table
                rowKey={item => item.id}
                dataSource={receiveList}
                columns={TableParams}
                pagination={receivePageSetting} />
            </Card>
          </Col>

          <Col span={12}>
            <Card className="card-table" hoverable title={<b>寻物启事</b>} extra={<a href="/#/search">查看更多</a>}>
              <Table
                rowKey={item => item.id}
                dataSource={searchList}
                columns={TableParams}
                pagination={searchPageSetting} />
            </Card>
          </Col>

        </Row>
      </div>
    )

  }
}
MainPage.PropTypes = {};
MainPage.defaultProps = {
  receiveList: [],
  searchList: [],
  receiveTotal: 0,
  searchTotal: 0,
  getListByOffset: () => { }
};
export default MainPage;
