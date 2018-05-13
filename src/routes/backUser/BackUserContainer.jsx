import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { connect } from 'dva';
// import MainPage from './MainPage.jsx';
import { backPageSize as pageSize } from '../../config/config';
import BackMainLayout from '../../components/layout/BackMainLayout.jsx';
import BackUserPage from './BackUserPage';

class BackUserContainer extends Component {
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
      if (!values.pageNo) {
        values.pageNo = 1;
      }

      if (!values.pageSize) {
        values.pageSize = pageSize;
      }

      this.props.dispatch({
        type: "user/getListByOffset",
        payload: {
          ...values
        }
      })
    }
  }

  batchUpdateStatusByIds = (values) => {
    const P = new Promise((resolve, reject) => {
      this.props.dispatch({
        type: "user/batchUpdateStatusByIds",
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
    const { user } = this.props;
    const { list: dataList, total } = user;

    const BackUserPageProps = {
      getListByOffset: this.getListByOffset,
      batchUpdateStatusByIds: this.batchUpdateStatusByIds,
      dataList,
      total,
    }

    return (
      <BackMainLayout
        location={this.props.location}>
        <BackUserPage {...BackUserPageProps} />
      </BackMainLayout>
    );
  }
}

BackUserContainer.PropTypes = {};
BackUserContainer.defaultProps = {};
const mapStateToProps = (state) => {
  const user = state.user;
  return {
    user,
  };
};
export default connect(mapStateToProps)(BackUserContainer);
