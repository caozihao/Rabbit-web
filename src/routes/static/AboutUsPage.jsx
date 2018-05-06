import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'antd';
import './Static.scss';

class AboutUsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() { }


  render() {

    return (
      <Card className="AboutUsPage" title={<b>关于我们</b>}>
        <p className="title">关于我们</p>
        <Row className="content">
          <Col span={12}>
            <p><span className="paragraph-space" />校园失物招领平台是为上海第二工业大学师生服务的失物招领网络服务平台。</p>
            <p><span className="paragraph-space" />伴随社会科技的飞速发展，人们生活在快节奏的环境里，更离不开诸多的卡、证之类的物品，不慎遗失以后，不但补办麻烦，更会让你寸步难行。
              校园中经常发生丢东西不知找谁打听，捡东西不知该交给何人，为帮助广大师生在校园中寻找不慎丢失的物品，减少寻物的烦恼，特此成立失物招领平台。</p>
            <p><span className="paragraph-space" />本校园失物招领平台以免费发布信息、为校园师生提供方便、快捷的服务宗旨。
            与学校有关部门协调，在适当的机会举办“无人认领物品公开拍卖会”， 拍卖所得在通过学校捐赠给慈善机构，即减轻招领窗口的大量遗失物品积压难题，又让有需要帮助的人得到救助，充分体现社会的公平。</p>
          </Col >
        </Row >
      </Card >
    );
  }
}
AboutUsPage.PropTypes = {};
AboutUsPage.defaultProps = {};

export default AboutUsPage;
