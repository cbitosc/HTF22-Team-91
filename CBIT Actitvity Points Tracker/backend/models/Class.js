const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  class_name: {
    type: String,
    required: [true, 'Please add a name']
  },
  branch: {
    type: String,
    required: [true, 'Please add branch']
  },
  batch_year: {
    type: Number,
    required: [true, 'Please add batch year']
  },
  section: {
    type: Number,
    required: [true, 'Please add section number']
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }]
}, 
{
  timestamps: true
});

module.exports = Class = mongoose.model('class', ClassSchema);