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
      userInfo: utils.getUserInfo(),
      username: utils.getUserInfo() ? (utils.getUserInfo().nickName ? utils.getUserInfo().nickName : utils.getUserInfo().mobile) : '',
      walletDom: [],
    };
  }
  componentDidMount() {
    if (this.state.userInfo) {

    }
  }
  componentWillReceiveProps(nextProps) { }

  logout = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonAction/action',
      method: 'POST',
      bury: {
        name: "logout",
      },
      api: 'user/logout',
      suc: {
        fun: () => {
          utils.logOut();
          this.setState({ userInfo: null });
          // 退出登录后跳到主页或者广告列表页
          this.props.dispatch(routerRedux.push('/'));
          message.success('登出成功！');
        },
      },
    });
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
    const pathname = this.props.location.pathname;
    if (!this.state.userInfo) {
      const popContent = (
        <div className="pop-nav">
          <p className="text"><Link to="/user/publish">我发布的</Link></p>
          <p className="text"><Link to="/user/receive">我领取的</Link></p>
          <p className="text"><Link to="/user/info">账户管理</Link></p>
          <p className="text"><a onClick={this.logout}>退出登录</a></p>
        </div>);
      // const username = this.state.username;
      const username = "张梦雪";
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
      if (pathname === '/signup') {
        data.push({ title: '登录', path: '/login' });
      } else if (pathname === '/login') {
        data.push({ title: '注册', path: '/signup' });
      } else {
        data = [
          { title: '登录', path: '/login' },
          { title: '注册', path: '/signup' },
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

};
export default connect()(UserNav);
