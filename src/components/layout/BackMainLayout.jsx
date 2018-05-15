import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import './BackMainLayout.scss';

const { Header, Sider, Content } = Layout;

class BackMainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
  }

  jumpToPage = (pathname) => {
    // return () => {
    console.log('pathname ->', pathname)
    this.props.dispatch(routerRedux.push(`/back/${pathname}`));
    // }
  }

  getChildren = (props) => {
    return props.children;
  }


  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const { location } = this.props;
    let { pathname } = location;
    if(pathname.indexOf('/back/comment') !== -1){
      pathname = '/back/comment';
    }

    console.log('pathname ->',pathname);
    return (
      <Layout className="BackMainLayout">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[pathname]}>
            <Menu.Item key="/back/user" >
              <Link to='/back/user'><Icon type="user" />用户管理</Link>
            </Menu.Item>
            <Menu.Item key="/back/post">
              <Link to='/back/post'><Icon type="gift" />帖子管理</Link>
            </Menu.Item>
            <Menu.Item key="/back/comment" >
              <Link to='/back/comment'> <Icon type="smile-o" />留言管理</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
             <Link to="/back" className="logout-link">退出</Link>
          </Header>
          <Content>{this.props.children}</Content>
        </Layout>
      </Layout >
    );
  }
}
BackMainLayout.PropTypes = {};
BackMainLayout.defaultProps = {
  location: {},
};


export default connect()(BackMainLayout);
