import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { message } from 'antd';
import Page from './detail/Page';
import { pageSize as defaultPageSize } from '../../config/config';
import utils from '../../utils/QueenAnt/utils/utils';
import MainLayout from '../../components/layout/MainLayout.jsx';
import { routerRedux } from 'dva/router';
// import  './MainContainer.scss';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.id = utils.getIdFromLocation(this.props.location, '/detail/:id');
    this.state = {
      commonList: [],
    }
  }
  componentDidMount() {
    this.getById(this.id);
    this.updateReadNumById(this.id);
    this.getListByOffset({});
  }


  getById = (id) => {
    this.props.dispatch({
      type: "post/getById",
      payload: {
        id
      }
    })
  }

  updateReadNumById = (id) => {
    this.props.dispatch({
      type: "post/updateReadNumById",
      payload: {
        id
      }
    })
  }

  getStatistics = () => {
    this.props.dispatch({
      type: "common/getStatistics",
      payload: {
      }
    })
  }

  publish = (values) => {
    const P = new Promise((resolve, reject) => {
      this.props.dispatch({
        type: "comment/create",
        payload: {
          resolve,
          reject,
          ...values
        }
      })
    })

    P.then((json) => {
      message.success('提交成功');
      this.getStatistics();
      this.getListByOffset({});
    })
  }

  getListByOffset = (values) => {
    if (values) {

      values.postId = this.id;
      if (!values.pageNo) {
        values.pageNo = 1;
      }

      if (!values.pageSize) {
        values.pageSize = defaultPageSize;
      }

      this.props.dispatch({
        type: "comment/getListByOffset",
        payload: {
          ...values
        }
      })
    }

  }

  render() {
    const { post, comment, location } = this.props;
    const { detail } = post;
    const { list, total, curPage } = comment;

    const pageProps = {
      publish: this.publish,
      getListByOffset: this.getListByOffset,
      location,
      detail,
      commrntCurPage: curPage,
      commentList: list,
      commentTotal: total
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
  const comment = state.comment;
  return {
    post,
    comment
  };
};
export default connect(mapStateToProps)(MainContainer);
