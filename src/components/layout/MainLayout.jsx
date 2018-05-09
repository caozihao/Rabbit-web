import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, LocaleProvider, Row, Col } from 'antd';
import { utils } from '../../utils/QueenAnt/qnUtils';
import TopNav from '../../components/layout/TopNav.jsx';
import { connect } from 'dva';
import CommonFooter from './CommonFooter.jsx';
import HeadCarousel from './HeadCarousel.jsx';
import Statistics from './Statistics.jsx';
import constant from '../../config/constant';
import './MainLayout.scss';

const { Header, Content } = Layout;
class MainLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      children: this.getChildren(this.props),
    };
  }

  componentDidMount() {
    console.log(`Current version: ${constant.version}`);
    this.getStatistics();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        children: this.getChildren(nextProps),
      });
    }
  }

  getStatistics = () => {
    this.props.dispatch({
      type: "common/getStatistics",
      payload: {
      }
    })
  }

  getChildren = (props) => {
    return props.children;
  }

  render() {
    const { needHeadCarousel, common } = this.props;

    const statisticsProps = {
      ...common
    }

    return (
      <Layout className="MainLayout">

        <Header >
          <TopNav location={this.props.location} />
        </Header>
        <div className="main-content">
          {
            needHeadCarousel ? <Row>
              <Col span={18}>  <HeadCarousel /> </Col>
              <Col span={6}>  <Statistics {...statisticsProps} /></Col>
            </Row> : ''
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

const mapStateToProps = (state) => {
  const common = state.common;
  return {
    common,
  };
};

export default connect(mapStateToProps)(MainLayout);
