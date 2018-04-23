import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { message, Card } from 'antd';
import Page from './release/Page';
import MainLayout from '../../components/layout/MainLayout.jsx';
import { Link, routerRedux } from 'dva/router';
import utils from '../../utils/tools/utils';
// import  './MainContainer.scss';


class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state = {
      userInfo: utils.getUserInfo() ? utils.getUserInfo() : ''
    };
  }
  componentDidMount() { }

  componentWillReceiveProps(nextProps) { }

  release = (values) => {
    const P = new Promise((resolve, reject) => {
      this.props.dispatch({
        type: "goods/create",
        payload: {
          resolve,
          reject,
          ...values
        }
      })
    })

    P.then((json) => {
      message.success('发布成功');
      const type = values.type;
      this.props.dispatch(routerRedux.push(`/${type}`));
    })
  }


  render() {

    let contentDom = '';
    if (this.state.userInfo) {
      contentDom = (<Page release={this.release} />);
    } else {
      contentDom =
        (<Card className="login-regist-panel flex-center" style={{ height: 300 }}>
          您还未登录，请先
          <Link to='/login'> 登录 </Link> |
          <Link to='/regist'> 注册 </Link>
        </Card>)
    }

    return (
      <MainLayout
        location={this.props.location}
        needLogin={false}
      // footer={<MainFooter />}
      >
        <div className="com-margin-top">
          {contentDom}
        </div>

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
