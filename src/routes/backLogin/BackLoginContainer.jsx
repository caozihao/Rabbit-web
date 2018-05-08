import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import BackLoginPage from './BackLoginPage';
import { routerRedux } from 'dva/router';

class BackLoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) { }

  login = (values) => {
    this.props.dispatch(routerRedux.push('/back/user'));
    // const P = new Promise((resolve, reject) => {
    //   this.props.dispatch({
    //     type: "user/login",
    //     payload: {
    //       resolve,
    //       reject,
    //       ...values
    //     }
    //   })
    // })

    // P.then((data) => {
    //   message.success('登录成功');
    //   utils.saveUserInfo(data);
    //   this.props.dispatch(routerRedux.push('/'));
    // })
  }


  render() {
    return (
      <div className="BackLoginContainer flex-center " style={{ height: "100vh" }}>
        <BackLoginPage
          login={this.login}
        />
      </div>
    );
  }
}
BackLoginContainer.PropTypes = {};
BackLoginContainer.defaultProps = {};
const mapStateToProps = (state) => {
  return {
    // loading:state.loading.models.xxx
  };
};
export default connect(mapStateToProps)(BackLoginContainer);
