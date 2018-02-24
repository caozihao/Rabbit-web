import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import './QnModal.less';

class QnModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.trigger = this.getTrigger();
  }

  componentDidMount() { }
  componentWillReceiveProps(nextProps) { }

  getTrigger = () => {
    let trigger = null;
    const { triggerType, buttonProps, aProps } = this.props;
    const title = this.props.triggerTitle ? this.props.triggerTitle : this.props.title;

    if (triggerType === 'button') {
      const defaultButtonProps = {
        icon: 'plus',
        type: 'primary',
      };
      const settings = buttonProps || defaultButtonProps;
      trigger = (
        <Button
          onClick={this.handleTriggerClick}
          {...settings}
        >
          {title}
        </Button>);
    } else {
      const settings = aProps;
      trigger = (
        <a
          {...settings}
          onClick={this.handleTriggerClick}
        >
          {title}
        </a>
      );
    }
    return trigger;
  }
  handleTriggerClick = () => {
    if (typeof this.props.handleOpen === 'function') {
      this.props.handleOpen();
    }
    this.setState({ visible: true });
  }

  handleModalOk = () => {
    if (this.props.handleOk === 'function') {
      this.props.handleOk();
    }
    this.setState({ visible: false });
  }

  handleModalCancel = () => {
    this.setState({
      visible: false,
    });
  }


  render() {
    return (
      <div className="QnModal">
        {this.trigger}
        <Modal
          className="mainModal"
          title={this.props.title}
          visible={this.state.visible}
          onOk={this.handleModalOk}
          onCancel={this.handleModalCancel}
          closable
          {...this.props.otherProps}
        >
          {this.props.children}
        </Modal>

      </div >
    );
  }
}
QnModal.PropTypes = {};
QnModal.defaultProps = {
  // 这个title是modal的标题
  title: '打开modal',

  // 触发modal打开的, 可能是button或者a标签
  triggerType: 'button', // |a
  triggerTitle: (<span>打开modal</span>),
  buttonProps: null,
  aProps: null,

  otherProps: {},
  handleOk: () => { },
  // 当页面显示的时候, 触发的函数
  handleOpen: () => { },
  // creditorList: [],
};
export default QnModal;
