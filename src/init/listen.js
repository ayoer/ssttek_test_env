// const { PORT, NODE_ENV } = process.env
const errorHandler = require('utils/errorHandler');

module.exports = async (app) => {
  // app.listen(PORT, () =>
  //   console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`)
  // ),

  const {PORT, NODE_ENV} = process.env;

  app.listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
  });
};
