import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
// import MainPage from './MainPage.jsx';
import { pageSize as defaultPageSize } from '../../config/config';
import BackMainLayout from '../../components/layout/BackMainLayout.jsx';
import BackGoodsPage from './BackGoodsPage';

class BackGoodsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) { }

  render() {

    return (
      <BackMainLayout location={this.props.location}>
        <BackGoodsPage />
      </BackMainLayout>
    );
  }
}

BackGoodsContainer.PropTypes = {};
BackGoodsContainer.defaultProps = {};
const mapStateToProps = (state) => {
  const goods = state.goods;
  return {
    goods,
  };
};
export default connect(mapStateToProps)(BackGoodsContainer);
