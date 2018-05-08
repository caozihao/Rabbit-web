import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
// import MainPage from './MainPage.jsx';
import { pageSize as defaultPageSize } from '../../config/config';
import BackMainLayout from '../../components/layout/BackMainLayout.jsx';

class BackUserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) { }

  render() {

    return (
      <BackMainLayout>
        User
      </BackMainLayout>
    );
  }
}

BackUserContainer.PropTypes = {};
BackUserContainer.defaultProps = {};
const mapStateToProps = (state) => {
  const goods = state.goods;
  return {
    goods,
  };
};
export default connect(mapStateToProps)(BackUserContainer);
