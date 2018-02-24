import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Row, Col, Button, Popover, message } from 'antd';


class UserNav extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) { }

  render() {
    return (<div className="UserNav">
      UserNav
    </div>);
  }
}

UserNav.PropTypes = {
  location: PropTypes.string,
};
UserNav.defaultProps = {

};
export default connect()(UserNav);
