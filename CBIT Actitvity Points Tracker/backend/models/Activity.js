const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add activity name']
  },
  category: {
    type: String,
    required: [true, 'Please add activity type']
  },
  other_details: {
    type: String,
  },
  points: {
    type: String,
    required: [true, 'Please add points']
  },
  max_points: {
    type: String,
    required: [true, 'Please add max points']
  }
}, 
{
  timestamps: true
});

module.exports = Activity = mongoose.model('activity', ActivitySchema);