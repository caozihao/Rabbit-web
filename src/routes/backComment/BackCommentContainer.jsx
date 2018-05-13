import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { message } from 'antd';
import { backPageSize as pageSize } from '../../config/config';
import BackMainLayout from '../../components/layout/BackMainLayout.jsx';
import BackCommentPage from './BackCommentPage';
import utils from '../../utils/QueenAnt/utils/utils';

class BackCommentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.postId = utils.getIdFromLocation(this.props.location, '/back/comment/:postId');
  }
  componentDidMount() {
    this.getListByOffset({});
  }

  componentWillReceiveProps(nextProps) { }


  getListByOffset = (values) => {
    if (values) {

      if(this.postId){
        values.postId = this.postId;
      }
      values.way = 'back';

      if (!values.pageNo) {
        values.pageNo = 1;
      }

      if (!values.pageSize) {
        values.pageSize = pageSize;
      }

      this.props.dispatch({
        type: "comment/getListByOffset",
        payload: {
          ...values
        }
      })
    }
  }

  batchUpdateStatusByIds = (values) => {
    const P = new Promise((resolve, reject) => {
      this.props.dispatch({
        type: "comment/batchUpdateStatusByIds",
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

    const { comment } = this.props;
    const { list, total } = comment

    const BackCommentPageProps = {
      batchUpdateStatusByIds: this.batchUpdateStatusByIds,
      getListByOffset: this.getListByOffset,
      list,
      total
    }

    return (
      <BackMainLayout location={this.props.location}>
        <BackCommentPage {...BackCommentPageProps} />
      </BackMainLayout>
    );
  }
}

BackCommentContainer.PropTypes = {};
BackCommentContainer.defaultProps = {};
const mapStateToProps = (state) => {
  const comment = state.comment;
  return {
    comment,
  };
};
export default connect(mapStateToProps)(BackCommentContainer);
