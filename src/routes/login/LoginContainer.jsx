import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { message } from 'antd';
import LoginPage from './LoginPage';
import { routerRedux } from 'dva/router';
import MainLayout from '../../components/layout/MainLayout.jsx';
import utils from '../../utils/QueenAnt/utils/utils';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() { }

  componentWillReceiveProps(nextProps) { }

  login = (values) => {
    const P = new Promise((resolve, reject) => {
      this.props.dispatch({
        type: "user/login",
        payload: {
          resolve,
          reject,
          ...values
        }
      })
    })

    P.then((data) => {
      message.success('登录成功');
      utils.saveUserInfo(data);
      utils.jumpUrlAfterLoginOrRegist();
    })
  }

  render() {
    return (
      <MainLayout
        location={this.props.location}
        needHeadCarousel={false}
        needLogin={false}
      >
        <LoginPage
          login={this.login}
        />
      </MainLayout>
    );
  }
}
MainContainer.PropTypes = {};
MainContainer.defaultProps = {};
const mapStateToProps = (state) => {
  return {
    // loading:state.loading.models.xxx
  };
};
export default connect(mapStateToProps)(MainContainer);
