import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import { Layout, Icon, Row, Col } from 'antd';

const { Footer } = Layout;

class CommonFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) { }
  render() {
    return (
      <Footer type="dark" className="CommonFooter" >
        <div className="content">
          底部
        </div>
      </Footer>
    );
  }
}
CommonFooter.PropTypes = {};
CommonFooter.defaultProps = {};
export default CommonFooter;
