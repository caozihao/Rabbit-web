import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import MainPage from './MainPage.jsx';
import { pageSize as defaultPageSize } from '../../config/config';
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


      if (!values.pageNo) {
        values.pageNo = 1;
      }

      if (!values.pageSize) {
        values.pageSize = defaultPageSize;
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
    const { goods } = this.props;

    return (
      <MainLayout
        location={this.props.location}
        needLogin={false}
      // footer={<MainFooter />}
      >
        <MainPage {...goods} getListByOffset={this.getListByOffset} />
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
