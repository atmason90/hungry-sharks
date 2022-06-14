const mongoose = require('mongoose');

const MongoDB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hungry-shark-cards-db';
mongoose.connect(MongoDB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;