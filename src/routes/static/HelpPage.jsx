import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'antd';
import './Static.scss';

class HelpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() { }


  render() {

    return (
      <Card className="HelpPage" title={<b>帮助中心</b>}>
        <p className="title">帮助中心</p>
        <Row className="content">
          <Col span={12}>
            <p><span className="paragraph-space" />本失物招领平台主要有用户的注册登录、网站查询搜索、失物报失、失物招领、留言板的模块。</p>
            <p><span className="paragraph-space" />用户登录注册模块：以手机号注册登录平台。</p>
            <p><span className="paragraph-space" />首页模块：此模块主要实现搜索查询和信息公布展示的功能。</p>
            <p><span className="paragraph-space" />寻物启事模块：此模块实现对寻物物品的展示列表功能和查看详细情况功能。</p>
            <p><span className="paragraph-space" />失物招领模块：此模块实现对招领物品的展示列表功能和查看详细情况功能。</p>
            <p><span className="paragraph-space" />发布模块：此模块可以实现发布招领和报失物品的功能。</p>
            <p><span className="paragraph-space" />留言模块：捡拾到物品的师生可以在物品详情页里给失主留言物品的详细情况比如放置在哪里等等。</p>

          </Col >
        </Row >
      </Card >
    );
  }
}
HelpPage.PropTypes = {};
HelpPage.defaultProps = {};

export default HelpPage;
