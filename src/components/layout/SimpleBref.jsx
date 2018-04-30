import React, { Component } from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import './SimpleBref.scss';
 

class SimpleBref extends Component {
  constructor(props) {
    super(props);
  }

  getCarouselImgData = () => {
  
  }

  componentDidMount() {

  }

  render() {
    return (
      <Card className="SimpleBref" title={<b>简要信息</b>}>
        <p>一共发布了条<b>120</b>条失物信息</p>
        <p><b>150</b>条招领信息</p>
        <p><b>100</b>条被认领</p>
      </Card>
    );
  }
}

SimpleBref.PropTypes = {
  location: PropTypes.string,
};

SimpleBref.defaultProps = {

};

export default SimpleBref;
