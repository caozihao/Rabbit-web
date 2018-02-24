import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MainFooter.scss';
import { Layout } from 'antd';

const { Footer } = Layout;
class MainFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) { }
  render() {
    return (
      <Footer type="dark" className="MainFooter" >
        MainFooter
      </Footer>
    );
  }
}
MainFooter.PropTypes = {};
MainFooter.defaultProps = {};
export default MainFooter;
