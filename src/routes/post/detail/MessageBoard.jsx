import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, List, Button } from 'antd';
import dataRender from '../../../utils/QueenAnt/utils/dataRender';
import utils from '../../../utils/tools/utils';
import { Pagination } from 'antd';
import { pageSize as defaultPageSize } from '../../../config/config';
import "./MessageBoard.scss";


class MessageBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) { }

  handleChangeSelect = (e) => {

  }

  handleChangeRangePicker = (e) => {

  }

  getNickname = (item) => {
    let result = '';
    if (item.userId === this.props.publishUserId) {
      result = (<b className="self-nickname">发布者 : </b>);
    } else {
      result = (<b>{item.userNickname} : </b>);
    }
    return result;
  }



  onChange = (pageNo) => {
      this.props.getListByOffset({ pageNo })
  }

  setMoreButton = (commentList, commentTotal) => {

    let result = '';
    if (commentTotal > defaultPageSize) {
      result = (<Pagination style={{ textAlign: 'right' }} current={this.props.commrntCurPage} pageSize={defaultPageSize} total={commentTotal} onChange={this.onChange} />);
    } else {
      result = '';
    }
    return result;
  }

  render() {

    const { commentList, commentTotal } = this.props;

    const moreButton = this.setMoreButton(commentList, commentTotal);

    return (
      <div className="post-detail-message-board">
        <Card hoverable title={<b>留言板</b>}>
          <List
            className="data-list"
            itemLayout="horizontal"
            dataSource={commentList}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={<p className="title">{this.getNickname(item)}</p>}
                  description={
                    <div className="description">
                      <p className="content">{item.content}</p>
                      <p className="time">{dataRender.renderTime(item.updatedTime)}</p>
                    </div>}
                />
              </List.Item>
            )}
          />
          {moreButton}
        </Card>
      </div>)
  }
}

MessageBoard.PropTypes = {};
MessageBoard.defaultProps = {
  getListByOffset: () => { },
  commentList: [],
  commentTotal: 0,
  commrntCurPage:0,
  publishUserId: 0
};
export default MessageBoard;
