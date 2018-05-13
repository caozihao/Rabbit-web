import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { message, Card } from 'antd';
import Page from './release/Page';
import MainLayout from '../../components/layout/MainLayout.jsx';
import { Link, routerRedux } from 'dva/router';
import NeedLogin from '../../components/common/NeedLogin.jsx';
import utils from '../../utils/tools/utils';


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

  getStatistics = () => {
    this.props.dispatch({
      type: "common/getStatistics",
      payload: {
      }
    })
  }

  release = (values) => {
    const P = new Promise((resolve, reject) => {
      this.props.dispatch({
        type: "post/create",
        payload: {
          resolve,
          reject,
          ...values
        }
      })
    })

    P.then((json) => {
      message.success('发布成功');
      this.getStatistics();
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
          <NeedLogin location={this.props.location} />
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
