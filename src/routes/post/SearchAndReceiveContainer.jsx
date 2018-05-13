import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Page from './list/Page';
import { pageSize as pageSize } from '../../config/config';
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

       values.status = 1;

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
        type: "post/getListByOffset",
        payload: {
          ...values
        }
      })
    }
  }

  getStatistics = () => {
    this.props.dispatch({
      type: "common/getStatistics",
      payload: {}
    })
  }


  render() {
    const { pageType } = this.state;
    const { post } = this.props;
    const { receiveList, receiveTotal, searchList, searchTotal } = post;

    let list = [];
    let total = 0;
    if (pageType === 'search') {
      list = searchList;
      total = searchTotal;
    } else if (pageType === 'receive') {
      list = receiveList;
      total = receiveTotal;
    }

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
  const post = state.post;
  return {
    post,
  };
};

export default connect(mapStateToProps)(MainContainer);
