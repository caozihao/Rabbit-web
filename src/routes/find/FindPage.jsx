import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

class MainPage extends Component {

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) { }

  render() {
    return (
      <div>
        寻物
    </div>)
  }
}
MainPage.PropTypes = {};
MainPage.defaultProps = {};
export default connect()(MainPage);
