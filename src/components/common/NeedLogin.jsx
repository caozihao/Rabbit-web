import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import './NeedLogin.scss';

class NeedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) {

  }

  render() {
    const { location } = this.props;
    const { pathname } = location;
    let loginUrl = `/login?to=${pathname}`;
    let registUrl = `/regist?to=${pathname}`;
    return (
      <p className="NeedLogin">
        请先
          <Link to={loginUrl} > 登录 </Link > |
          <Link to={registUrl}> 注册 </Link>
      </p>
    );
  }
}
NeedLogin.PropTypes = {};
NeedLogin.defaultProps = {
  location: {}
};
export default NeedLogin;
