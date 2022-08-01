const errorHandler = require('utils/errorHandler');

module.exports = async (app) => {
  app.use(errorHandler);
};
