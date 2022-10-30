const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  activity_name: {
    type: String,
    required: [true, 'Please add activity name']
  },
  rollno: {
    type: String,
    required: [true, 'Please add rollno'] 
  },
  allotedpoints: {
    type: Number
  },
  student_name: {
    type: String,
    required: [true, 'Please add rollno'] 
  },
  certificate: {
    type: String,
    required: [true, 'Please upload relevant certificate']
  }
}, 
{
  timestamps: true
});

module.exports = Submission = mongoose.model('submission', SubmissionSchema);