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
    this.state = {
      children: this.getChildren(this.props),
    };
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
    const { pathname } = location;
    return (
      <Layout className="BackMainLayout">

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
  location: {},
};

export default connect()(BackMainLayout);
