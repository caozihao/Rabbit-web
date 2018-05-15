import React, { Component } from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import './Statistics.scss';


class SimpleBref extends Component {
  constructor(props) {
    super(props);
  }

  getCarouselImgData = () => {

  }

  componentDidMount() {

  }

  render() {
    const { searchTotal, receiveTotal, commentTotal, userTotal } = this.props;

    return (
      <Card className="Statistics" title={<b>简要信息</b>}>
        <p>一共有<span className="important"> {userTotal} </span>位注册用户</p>
        <p>一共发布了<span className="important"> {searchTotal} </span>条寻物启事，<span className="important"> {receiveTotal} </span>条失物招领</p>
        <p>一共发表了<span className="important"> {commentTotal} </span>条留言</p>
      </Card>
    );
  }
}

SimpleBref.PropTypes = {
  location: PropTypes.string,
};

SimpleBref.defaultProps = {
  searchTotal: 0,
  receiveTotal: 0,
  commentTotal: 0,
  userTotal: 0,
};

export default SimpleBref;
