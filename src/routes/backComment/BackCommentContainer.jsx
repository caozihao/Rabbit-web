import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
// import MainPage from './MainPage.jsx';
import { pageSize as defaultPageSize } from '../../config/config';
import BackMainLayout from '../../components/layout/BackMainLayout.jsx';

class BackCommentContainer extends Component {
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
        Comment
      </BackMainLayout>
    );
  }
}

BackCommentContainer.PropTypes = {};
BackCommentContainer.defaultProps = {};
const mapStateToProps = (state) => {
  const post = state.post;
  return {
    post,
  };
};
export default connect(mapStateToProps)(BackCommentContainer);
