import dva from 'dva';
import './common.scss';
import { hashHistory } from 'dva/router';

// 1. Initialize
const app = dva({
  history: hashHistory,
  onError(e) {
    // message.error(e.message, ERROR_MSG_DURATION);
  },

});



// 2. Plugins
// app.use({});

// 3. Model
// app.model();

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
