import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import { Link } from 'dva/router';

import './NavMenu.scss';

class NavMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: this.genMenuItems(this.props.menuData),
    };
  }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) {
    if (this.props.menuData !== nextProps.menuData) {
      this.setState({
        menuItems: this.genMenuItems(nextProps.menuData),
      });
    }
  }

  genMenuItems(data) {
    let menus = [];
    if (Array.isArray(data) && data.length > 0) {
      menus = data.map((m) => {
        return (
          <Menu.Item key={m.path} className={m.highLight ? 'default-active' : ''} >
            <Link to={m.path}> {m.title} </Link>
          </Menu.Item >);

      });
    }
    return menus;
  }

  render() {
    return (<Menu
      style={{ background: "#00add2" }}
      mode="horizontal"
      defaultSelectedKeys={[this.props.selectedKey]}
      className="NavMenu"
    >
      {this.state.menuItems}
    </Menu>);
  }
}
NavMenu.PropTypes = {};
NavMenu.defaultProps = {
  menuData: [],
  selectedKey: null,
};
export default NavMenu;
