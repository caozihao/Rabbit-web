import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

const SubMenu = Menu.SubMenu;

const genMenuItem = (item, defaultIcon = 'star') => {
  if (item) {
    const iconType = item.icon || defaultIcon;
    return (<Menu.Item key={item.path} >
      <Link className={styles.link} to={item.path}>
        <Icon type={iconType} />{item.title}
      </Link>
    </Menu.Item>);
  }
};
const genMenuItems = (items, defaultIcon = 'star') => {
  if (items && Array.isArray(items) && items.length > 0) {
    return items.map((item) => {
      return this.genMenuItem(item, defaultIcon);
    });
  }
};
const genNavMenu = (items, defaultIcon = 'star') => {
  const defaultKey = this.getCurrentPath();
  if (items && Array.isArray(items) && items.length > 0) {
    const menuItems = items.map((item) => {
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
      className={styles.menu}
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[defaultKey]}
    >
      {menuItems}
    </Menu>);
  }
};

export { genMenuItem, genMenuItems, genNavMenu };
