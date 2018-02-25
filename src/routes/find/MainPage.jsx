import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

class MainPage extends Component {

  constructor(props) {
    super(props);
  }

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
