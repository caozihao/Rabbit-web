import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Layout } from 'antd';
import Page from './list/Page';
import MainLayout from '../../components/layout/MainLayout.jsx';
// import  './MainContainer.scss';


class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) { }
  render() {
    return (
      <MainLayout
        location={this.props.location}
        needLogin={false}
      // footer={<MainFooter />}
      >
        <Page />
      </MainLayout>
    );
  }
}
MainContainer.PropTypes = {};
MainContainer.defaultProps = {};
const mapStateToProps = (state) => {
  return {
    // loading:state.loading.models.xxx
  };
};
export default connect(mapStateToProps)(MainContainer);
