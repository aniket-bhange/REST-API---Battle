const { dbUrl } = require('./config');
const mongoose = require('mongoose');
module.exports.conn = mongoose.connect(dbUrl, { useNewUrlParser: true });
