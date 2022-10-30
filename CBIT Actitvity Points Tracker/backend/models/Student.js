const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add activity name']
  },
  id_no: {
    type: String,
    required: [true, 'Please add roll no']
  },
  batch_year: {
    type: Number,
    required: [true, 'Please specify batch year']
  },
  branch: {
    type: String,
    required: [true, 'Please specify branch']
  },
  section: {
    type: String,
    required: [true, 'Please add section']
  },
  activities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'submission'
  }],
  feedback: {
    type: String,
  }
}, 
{
  timestamps: true
});

module.exports = Student = mongoose.model('student', StudentSchema);