import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import NavMenu from './NavMenu.jsx';
import UserNav from './UserNav.jsx';
import { Link } from 'dva/router';
import './TopNav.scss';
import './UserNav.scss'
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

    const menuData = [
      { title: '寻物', path: '/search' },
      { title: '招领', path: '/receive' },
      { title: '发布 +', path: '/release', highLight: true },
    ]

    return (
      <Row className="TopNav" >
        <Col span={4} >
          <Link to="/" >
            <div className="logo" />
            <span className="title" >找找看</span>
          </Link>
        </Col>
        <Col span={16} >
          <div className="UserNav">
            <NavMenu menuData={menuData} selectedKey={pathname} />
          </div>
        </Col>
        <Col span={4}  >
          <UserNav location={this.props.location} />
        </Col>
      </Row>
    );
  }
}
TopNav.PropTypes = {};
TopNav.defaultProps = {
  location: null,
};
export default TopNav;
