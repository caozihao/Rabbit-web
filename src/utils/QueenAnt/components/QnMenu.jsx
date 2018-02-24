import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

import './QnMenu.less';

const SubMenu = Menu.SubMenu;

class QnMenu extends Component {
  constructor(props) {
    super(props);
    const { menuItems, menuProps, defaultIcon } = this.props;
    this.state = {
      menu: this.genMenu(menuItems, menuProps, defaultIcon),
    };
  }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) {
    const isChanged = name => this.props[name] !== nextProps[name];
    if (isChanged('menuItems') || isChanged('menuProps') || isChanged('defaultIcon')) {
      const { menuItems, menuProps, defaultIcon } = nextProps;
      this.setState({
        menu: this.genMenu(menuItems, menuProps, defaultIcon),
      });
    }
  }

  genMenuItem = (item, defaultIcon = 'star') => {
    if (item) {
      const iconType = item.icon || defaultIcon;
      return (<Menu.Item key={item.path} >
        <Link className="link" to={item.path}>
          <Icon type={iconType} />{item.title}
        </Link>
      </Menu.Item>);
    }
  }

  genMenuItems = (items, defaultIcon = 'star') => {
    if (items && Array.isArray(items) && items.length > 0) {
      return items.map((item) => {
        return this.genMenuItem(item, defaultIcon);
      });
    }
  }

  genMenu = (items, menuProps, defaultIcon = 'star') => {
    if (items && Array.isArray(items) && items.length > 0) {
      const menuItems = items.map((item) => {
        // 有子菜单
        if (item.children) {
          const childItems = this.genMenuItems(item.children);
          const iconType = item.icon || defaultIcon;
          const title = (<span>
            <Icon type={iconType} />
            <span>{item.title}</span>
          </span>);
          return (
            <SubMenu key={item.title} title={title}>
              {childItems}
            </SubMenu>
          );
        } else {
          return this.genMenuItem(item, defaultIcon);
        }
      });
      return (<Menu
        className="QnMenu"
        style={{
          lineHeight: '64px',
        }}
        {...menuProps}
      >
        {menuItems}
      </Menu >);
    }
  };
  render() {
    return this.state.menu;
  }
}


QnMenu.PropTypes = {};
QnMenu.defaultProps = {
  menuItems: [],
  defaultIcon: 'star',
  menuProps: {
    theme: 'dark',
    mode: 'horizontal',
    defaultSelectedKeys: [],
    defaultOpenKeys: [],
  },
};
export default QnMenu;
