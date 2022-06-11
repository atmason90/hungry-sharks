const mongoose = require('mongoose');

const MongoDB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hungry-shark-cards-db';
console.log(MongoDB_URI);
mongoose.connect(MongoDB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;