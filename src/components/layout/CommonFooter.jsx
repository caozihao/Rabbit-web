import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import { Layout, Icon, Row, Col } from 'antd';
import  './CommonFooter.scss';

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
          <Row>
            <Col span={4} >
              <Link to="/about_us">关于我们</Link>
              <Link to="/help">帮助中心</Link>
            </Col>
          </Row>
        </div>
      </Footer>
    );
  }
}
CommonFooter.PropTypes = {};
CommonFooter.defaultProps = {};
export default CommonFooter;
