import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'dva';
import './BackMainLayout.scss';

const { Header, Sider, Content } = Layout;

class BackMainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: this.getChildren(this.props),
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

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
    return (
      <Layout className="BackMainLayout">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['user']}>
            <Menu.Item key="user">
              <Icon type="user" />
              <span>user</span>
            </Menu.Item>
            <Menu.Item key="goods">
              <Icon type="gift" />
              <span>goods</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="smile-o" />
              <span>comment</span>
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
          </Header>
          <Content>{this.state.children}</Content>
        </Layout>
      </Layout >
    );
  }
}
BackMainLayout.PropTypes = {};
BackMainLayout.defaultProps = {
  needHeadCarousel: true
};

const mapStateToProps = (state) => {
  const common = state.common;
  return {
    common,
  };
};


export default connect(mapStateToProps)(BackMainLayout);
