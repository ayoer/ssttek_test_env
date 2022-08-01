const helmet = require('helmet');

module.exports = async (app) => {
  app.use(helmet({contentSecurityPolicy: false}));
};
