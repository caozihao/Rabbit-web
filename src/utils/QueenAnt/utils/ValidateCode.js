
import utils from '../../../utils/QueenAnt/utils/utils';
import constant from '../../../config/constants';
import $ from 'jquery'
class ValidateCode {

  constructor(dispatch, queryParams, api, self) {
    this.dispatch = dispatch;
    this.mobile = `0086${queryParams.mobile}`;
    this.graphCode = queryParams.graphCode;
    this.api = api;
    this.self = self;
    this.time = constant.validateCodeTime;
    this.sendGraphCodeApi = (() => {
      if (utils.getUserInfo()) {
        return 'user/sendGraphCode';
      } else {
        return 'auth/sendGraphCode';
      }
    })()
  }

  sendMessageCode = () => {
    const { dispatch, mobile, api, self, time, jQsetTimer, sendGraphCode, graphCode } = this;
    self.setState({ spinningLoading: true })
    let payload = {
      mobile,
    }
    if (graphCode) {
      payload.graphCode = graphCode;
    }
    dispatch({
      type: 'commonAction/action',
      api,
      method: 'POST',
      payload,
      suc: {
        fun: () => {
          jQsetTimer();
          self.setState({ spinningLoading: false });
        },
        mes: '短信验证码已发送',
      },
      fail: {
        fun: (data) => {
          if (!graphCode) {
            sendGraphCode();
          } else {
            self.setState({ spinningLoading: false });
          }
        }
      }
    })
  }

  sendGraphCode = () => {
    const { dispatch, mobile, sendGraphCodeApi, self } = this;
    self.setState({ spinningLoading: true })
    dispatch({
      type: 'commonAction/action',
      api: sendGraphCodeApi,
      method: 'POST',
      payload: {
        mobile,
      },
      suc: {
        fun: (data) => {
          const graphSrc = `data:image/png;base64,${data.data.graphCode || data.data.base64}`;
          self.setState({ spinningLoading: false, isGraphCode: true, graphSrc });
        },
      },
      fail: {
        fun: () => {
          self.setState({ spinningLoading: false })
        }
      }
    });
  }


  jQsetTimer = () => {
    $('#get-code').addClass('hide');
    $('#cutdown').removeClass('hide');
    const param = {
      clickBtn: 'cutdown',   // 点击按钮
      clickBtnText: `${this.time}`,   // 按钮文本
      showText: '获取验证码',  // 展示文本（默认倒计时）
      selectTimeValue: this.time, // 时间选择期,
      downBack: () => {
        $('#cutdown').addClass('hide');
        $('#get-code').removeClass('hide');
      },
    };
    this.setTimer(param);
  };

  setTimer = (params) => {
    let { clickBtn, clickBtnText, selectTimeValue, downBack } = params;
    const clickMeBtn = document.getElementById(clickBtn);
    let ifLoading = false;
    let timer = {};

    // 还没开始
    if (!ifLoading) {
      ifLoading = true;
      clickMeBtn.disabled = true;
      clickMeBtn.innerHTML = `${selectTimeValue}s`;
      timer = setInterval(() => {
        if (!selectTimeValue) {
          init();
          downBack();
          window.clearTimeout(timer);
        } else {
          selectTimeValue--;
          clickMeBtn.innerHTML = `${selectTimeValue}s`;
        }
      }, 1000);
    }

    function init() {
      clickMeBtn.disabled = false;
      clickMeBtn.innerHTML = `${clickBtnText}s`;
      ifLoading = false;
    }
  };

}

export default ValidateCode;
