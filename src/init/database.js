const mongoose = require('mongoose');

module.exports = async () => {
  const {DB_HOST} = process.env;

  const conn = await mongoose.connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};
