const {apiRoutes, env} = require('../config');
module.exports = (app) => {
  const {API_PREFIX} = env;
  const API_ROUTE_PREFIX = '../routes/api';
  let routeUrl, routeModule;
  for (const routeName of apiRoutes) {
    routeUrl = `${API_PREFIX}/${routeName}`;
    console.log('API_ROUTE_PREFIX', `${API_ROUTE_PREFIX}/${routeName}`);
    routeModule = require(`${API_ROUTE_PREFIX}/${routeName}`).default;
    app.use(routeUrl, routeModule);
  }
};
