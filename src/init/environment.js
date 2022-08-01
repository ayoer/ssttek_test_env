const dotenv = require('dotenv');

module.exports = async () => {
  if (process.env.NODE_ENV === 'production') dotenv.config({path: './src/config/config.env'});
  else dotenv.config({path: './src/config/config-dev.env'});
};
