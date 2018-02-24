import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
// import './QnTimingButton.less';

const defaultTime = 3;
class QnTimingButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.loading,
      countDown: this.props.time,
      showCountDown: false,
    };
    this.timer = null;
    this.countDown = this.props.time > 0 ? this.props.time : defaultTime;
  }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) { }
  handleCountDown = () => {
    // const step = 1;
    // let { countDown } = this.state;
    // countDown -= 1;
    // if (countDown <= 0) {
    //   clearInterval(this.timer);
    // }
    // this.setState({ countDown });

    this.setState((prevState, props) => {
      if (prevState.countDown - props.step <= 0) {
        clearInterval(this.timer);
        return {
          loading: false,
          showCountDown: false,
          countDown: props.time,
        };
      }
      return {
        countDown: prevState.countDown - props.step,
        loading: prevState.loading,
      };
    });
  }

  handleClick = () => {
    const { onClick } = this.props;
    if (typeof onClick === 'function') {
      onClick();
    }
    this.setState({
      showCountDown: true,
      loading: true,
    }, () => {
      this.timer = setInterval(this.handleCountDown, 1000);
    });
  }
  render() {
    const btnProps = {
      ...this.props,
      loading: this.state.loading,
      onClick: this.handleClick,
    };
    return (
      <Button
        {...btnProps}
      >
        {
          this.props.children
        }
        {this.state.showCountDown ? ` (${this.state.countDown})` : null}
      </Button>
    );
  }
}
QnTimingButton.PropTypes = {};
QnTimingButton.defaultProps = {
  children: '按钮文字',
  loading: false,
  time: defaultTime,
  onClick: () => {

  },
  step: 1,
};
export default QnTimingButton;
