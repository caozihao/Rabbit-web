import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Row, Col, Button, Popover, message } from 'antd';
import NavMenu from './NavMenu.jsx';
import utils from '../../utils/tools/utils';
import './UserNav.scss';

class UserNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: utils.getUserInfo() ? utils.getUserInfo() : ''
    };
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) { }

  logout = () => {

    const P = new Promise((resolve, reject) => {
      this.props.dispatch({
        type: "user/logout",
        payload: {
          resolve,
          reject,
          id: this.state.userInfo.id
        }
      })
    })

    P.then((data) => {
      utils.logOut();
      this.setState({ userInfo: null });
      message.success('登出成功！');
    })
  }

  setWallet = (data) => {
    const { data: { entity: { monetaryAssets } } } = data;
    const walletDom = monetaryAssets.map((v, i) => {
      return (
        <div key={v.coinInfo.coinId}>
          <p><b>可用{v.coinInfo.unit || 0}</b></p>
          <p>{v.availableBalance || 0}</p>
        </div>
      );
    });

    this.setState({ walletDom });
  }

  render() {
    let content = '';
    let data = [];
    const { userInfo } = this.state;

    const { location } = this.props;

    const pathname = location.pathname;
    if (userInfo) {
      const { nickname, phone } = userInfo;
      const popContent = (
        <div className="pop-nav">
          {/**  <p className="text"><Link to="/user/release">我发布的</Link></p> **/}
          <p className="text"><a onClick={this.logout}>登出</a></p>
        </div>);
      const username = nickname || phone;
      content = (<div>
        <Row>
          <Col span={12}>
            <Popover arrowPointAtCenter content={popContent} title="" trigger="hover" onVisibleChange={this.onPopover} >
              <span className="username">{username}</span>
            </Popover>
          </Col>
        </Row>
      </div>);
    } else {
      if (pathname === '/regist') {
        data.push({ title: '登录', path: '/login' });
      } else if (pathname === '/login') {
        data.push({ title: '注册', path: '/regist' });
      } else {
        data = [
          { title: '登录', path: '/login' },
          { title: '注册', path: '/regist' },
        ];
      }
      content = <NavMenu menuData={data} />;
    }
    return (<div className="UserNav">
      {content}
    </div>);
  }
}

UserNav.PropTypes = {
  location: PropTypes.string,
};
UserNav.defaultProps = {
  location: ""
};
export default connect()(UserNav);
