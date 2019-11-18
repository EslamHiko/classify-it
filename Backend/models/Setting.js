const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  name:  String,
  value: String,
}, { timestamps: true });

const Setting = mongoose.model('Setting', settingSchema);

module.exports = Setting;
