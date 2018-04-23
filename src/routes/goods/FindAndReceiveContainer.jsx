import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Layout } from 'antd';
import Page from './list/Page';
import { pageSize } from '../../config/config';
import MainLayout from '../../components/layout/MainLayout.jsx';
// import  './MainContainer.scss';


class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageType: this.props.location.pathname.split('/')[1]
    };
  }
  componentDidMount() {
    this.getListByOffset({});
  }
  componentWillReceiveProps(nextProps) { }

  getListByOffset = (values) => {
    if (values) {

      if (!values.type) {
        values.type = this.state.pageType;
      }

      if (!values.pageNo) {
        values.pageNo = 1;
      }

      if (!values.pageSize) {
        values.pageSize = pageSize;
      }

      this.props.dispatch({
        type: "goods/getListByOffset",
        payload: {
          ...values
        }
      })

    }

  }


  render() {
    const { pageType } = this.state;
    const { goods } = this.props;
    const { list, total } = goods;

    const pageProps = {
      pageType,
      getListByOffset: this.getListByOffset,
      dataList: list,
      total
    }

    return (
      <MainLayout
        location={this.props.location}
        needLogin={false}
      // footer={<MainFooter />}
      >
        <Page {...pageProps} />
      </MainLayout>
    );
  }
}
MainContainer.PropTypes = {};
MainContainer.defaultProps = {};
const mapStateToProps = (state) => {
  const goods = state.goods;
  return {
    goods,
  };
};

export default connect(mapStateToProps)(MainContainer);
