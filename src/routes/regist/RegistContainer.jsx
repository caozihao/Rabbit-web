import React, { Component } from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import RegistPage from './RegistPage';
import MainLayout from '../../components/layout/MainLayout.jsx';
import utils from '../../utils/QueenAnt/utils/utils';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) { }

  regist = (values) => {
    const P = new Promise((resolve, reject) => {
      this.props.dispatch({
        type: "user/regist",
        payload: {
          resolve,
          reject,
          ...values
        }
      })
    })

    P.then((json) => {
      message.success('注册成功');
      utils.saveUserInfo();
      this.props.dispatch(routerRedux.push('/login'));
    })
  }

  render() {
    return (
      <MainLayout
        location={this.props.location}
        needHeadCarousel={false}
        needLogin={false}
      >
        <RegistPage
          regist={this.regist}
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
