import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, LocaleProvider,Row,Col } from 'antd';
import { utils } from '../../utils/QueenAnt/qnUtils';
import TopNav from '../../components/layout/TopNav.jsx';
import CommonFooter from './CommonFooter.jsx';
import HeadCarousel from './HeadCarousel.jsx';
import SimpleBref from './SimpleBref.jsx';
import './MainLayout.scss';


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

    const { needHeadCarousel } = this.props;

    return (
      <Layout className="MainLayout">

        <Header >
          <TopNav location={this.props.location} />
        </Header>
        <div className="main-content">
        {
          needHeadCarousel ?  <Row>
            <Col span={18}>  <HeadCarousel /> </Col>
            <Col span={6}>  <SimpleBref /></Col>
          </Row>:''
        }
         <Content>{this.state.children}</Content>
        </div>
        {this.props.footer || <CommonFooter />}
      </Layout>
    );
  }
}
MainLayout.PropTypes = {};
MainLayout.defaultProps = {
  needHeadCarousel: true
};
export default MainLayout;
