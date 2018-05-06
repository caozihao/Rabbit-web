import React, { Component } from 'react';
import { connect } from 'dva';
import MainLayout from '../../components/layout/MainLayout.jsx';
import AboutUsPage from './AboutUsPage';
import HelpPage from './HelpPage';


class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) { }

  distributeLocation = (pathname) => {
    let content = '';
    switch (pathname) {
      case "/about_us":
        content = <AboutUsPage />
        break;
      case "/help":
        content = <HelpPage />
        break;
      default:
        break;
    }
    return content;
  }

  render() {

    const content = this.distributeLocation(this.props.location.pathname);

    return (
      <MainLayout
        location={this.props.location}
        needHeadCarousel={false}
        needLogin={false}
      >
        {content}
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
