import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, LocaleProvider } from 'antd';
import { utils } from '../../utils/QueenAnt/qnUtils';
import TopNav from '../../components/layout/TopNav.jsx';
import CommonFooter from './CommonFooter.jsx';


const { Header, Content, Footer, Sider } = Layout;

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: this.getChildren(this.props),
    };
  }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        children: this.getChildren(nextProps),
      });
    }
  }
  getChildren = (props) => {
    return props.children;
  }
  render() {
    return (
      <LocaleProvider >
        <Layout className="MainLayout" >
          <Header className="header" >
            <TopNav location={this.props.location} />
          </Header>
          <Content>{this.state.children}</Content>
          {this.props.footer || <CommonFooter />}
        </Layout>
      </LocaleProvider>
    );
  }
}
MainLayout.PropTypes = {};
MainLayout.defaultProps = {

};
export default MainLayout;
