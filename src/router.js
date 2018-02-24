import React from 'react';
import { Router, Route, Switch } from 'dva/router';
// import IndexPage from './routes/IndexPage';
// import Products from './routes/Products';
import dynamic from 'dva/dynamic';
import routeItems from './routerParams';

function genRoute(item, app) {

  if (item) {
    const { path, models, page } = item;
    const component = dynamic({
      app,
      models,
      component: page,
    });
    return (<Route key={path} exact path={path} component={component} />);
  }

}

function RouterConfig({ history }) {

  const routes = routeItems.map((item) => {
    return genRoute(item);
  });

  return (
    <Router history={history}>
      <Switch>
        {routes}
      </Switch>
    </Router>
  );

}

export default RouterConfig;
