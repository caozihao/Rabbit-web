import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { message } from 'antd';
import { backPageSize as pageSize  } from '../../config/config';
import BackMainLayout from '../../components/layout/BackMainLayout.jsx';
import BackPostPage from './BackPostPage';

class BackPostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.getListByOffset({});
  }


  componentWillReceiveProps(nextProps) { }


  getListByOffset = (values) => {
    if (values) {

      values.way = 'back';

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

  batchUpdateStatusByIds = (values) => {
    const P = new Promise((resolve, reject) => {
      this.props.dispatch({
        type: "post/batchUpdateStatusByIds",
        payload: {
          resolve,
          reject,
          ...values
        }
      })
    })

    P.then((data) => {
      message.success('修改成功');
      this.getListByOffset({});
    })
  }

  render() {

    const { post } = this.props;
    const { allList, allTotal } = post

    const BackPostPageProps = {
      batchUpdateStatusByIds: this.batchUpdateStatusByIds,
      getListByOffset: this.getListByOffset,
      allList,
      allTotal
    }

    return (
      <BackMainLayout location={this.props.location}>
        <BackPostPage {...BackPostPageProps} />
      </BackMainLayout>
    );
  }
}

BackPostContainer.PropTypes = {};
BackPostContainer.defaultProps = {};
const mapStateToProps = (state) => {
  const post = state.post;
  return {
    post,
  };
};
export default connect(mapStateToProps)(BackPostContainer);
