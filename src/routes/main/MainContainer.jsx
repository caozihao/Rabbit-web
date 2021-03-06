import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import MainPage from './MainPage.jsx';
import { pageSize as pageSize } from '../../config/config';
import MainLayout from '../../components/layout/MainLayout.jsx';
// import  './MainContainer.scss';


class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.getListByOffset({ pageSize: 5 });
    this.getListByOffset({ type: 'search' });
    this.getListByOffset({ type: 'receive' });
  }
  componentWillReceiveProps(nextProps) { }

  getListByOffset = (values) => {
    if (values) {
      
      values.status = 1;

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


  render() {
    const { post } = this.props;

    return (
      <MainLayout

        location={this.props.location}
        needLogin={false}
      // footer={<MainFooter />}
      >
        <MainPage {...post} getListByOffset={this.getListByOffset} />
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
