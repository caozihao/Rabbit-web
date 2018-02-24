// import log from '../utils/log';

// 注册当前route需要的models
const setModels = (models, app) => {
  if (Array.isArray(models) && models.length > 0) {
    models.map((model) => {
      registerModel(app, model);
    });
  }
};
// 配置页面文件
const setPage = (page, app, cb) => {
  if (page) {
    cb(null, page);
  }
};

const registerModel = (app, model) => {
  if (!window.cached[model.namespace]) {
    app.model(model);
    window.cached[model.namespace] = 1;
  }
};

const getRoute = (settings, app, isLoginFunc) => {
  const { path, models, page } = settings;
  const getComponent = (nextState, cb) => {
    // 检查是否登录了
    let isLogin = true;
    if (typeof isLoginFunc === 'function') {
      isLogin = isLoginFunc();
    }
    if (isLogin) {
      require.ensure([], () => {
        // 注册model
        setModels(models, app);
        // 配置页面
        setPage(page, app, cb);
      });
    }
  };
  const result = {
    path,
    getComponent,
  };
  return result;
};

const getAllRoutes = (routeSettings, app, isLoginFunc) => {
  const routes = routeSettings.map((setting) => {
    return getRoute(setting, app, isLoginFunc);
  });
  return routes;
};
const gen = (routeSettings, isLoginFunc) => {
  const func = (app) => {
    return getAllRoutes(routeSettings, app, isLoginFunc);
  };
  return func;
};

// --------------------------------OOPsolution
class Router {
  constructor(routeSettings, isLoginFunc) {
    this.routeSettings = routeSettings;
    this.isLoginFunc = isLoginFunc;
  }

  registerModel(model, app) {
    if (!window.cached[model.namespace]) {
      app.model(model);
      window.cached[model.namespace] = 1;
    }
  }

  setModels(models, app) {
    if (Array.isArray(models) && models.length > 0) {
      models.map((model) => {
        this.registerModel(model, app);
      });
    }
  }

  setPage(page, cb) {
    if (page) {
      cb(null, page);
    }
  }

  getRoute(config, app) {
    const that = this;
    const { path, models, page, setting } = config;
    const getComponent = (nextState, cb) => {
      // 检查是否登录了
      let isLogin = true;
      const ifJudge = setting ? setting.needJudge : true;

      if (typeof that.isLoginFunc === 'function' && ifJudge) {
        isLogin = that.isLoginFunc();
      }
      if (isLogin) {
        require.ensure([], () => {
          // 注册model
          that.setModels(models, app);
          // 配置页面
          that.setPage(page, cb);
        });
      }
    };
    const result = {
      path,
      getComponent,
    };
    return result;
  }

  getAllRoutes(app) {
    const that = this;
    const routes = this.routeSettings.map((setting) => {
      return that.getRoute(setting, app);
    });
    return routes;
  }
  gen() {
    const func = (app) => {
      return this.getAllRoutes(app);
    };
    return func;
  }
}


export default { gen, Router };
