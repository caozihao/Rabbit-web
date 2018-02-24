import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import NavMenu from './NavMenu.jsx';
import UserNav from './UserNav.jsx';
import { Link } from 'dva/router';
import './TopNav.scss';
// import { version } from '../../config/constants';

class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) { }

  render() {
    let pathname = '';
    if (this.props.location) {
      pathname = this.props.location.pathname || '/';
    }
    return (
      <Row className="TopNav" >
        {/* <div className="content"> */}
        <Col span={4} className="logo">
          <Link to="/" >
            <div className="navLogo" />
            <span className="title" >IOEx</span>
            {/* <span className="version">v{version}</span> */}
          </Link>
        </Col>
        <Col span={4} className="userBox">
          <UserNav location={this.props.location} />
        </Col>
        {/* </div> */}
      </Row>
    );
  }
}
TopNav.PropTypes = {};
TopNav.defaultProps = {
  location: null,
};
export default TopNav;
