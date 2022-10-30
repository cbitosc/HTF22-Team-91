const asyncHandler = require('express-async-handler')
const Student = require('../models/Student')
const Submission = require('../models/Submission')

// @desc    Get Submissiones
// @route   GET /api/submissions
// @access  Private

const getSubmissions = asyncHandler(
async (req, res) => {
    // const submissions = await Submission.find()
    // //{ user: req.user.id }
    // res.status(200).json(submissions)
    Student.find()
    .populate("activities")
    .exec((err, activity) => {
      if(err){
        return res.status(400).json(err)
      } else {
        return res.status(200).json(activity)
      }
    })
}
)

// @desc    Add Submission
// @route   POST /api/submissions
// @access  Private

const addSubmission = asyncHandler(
async (req, res) => {
    if(!req.body.activity_name || !req.body.rollno || !req.body.student_name || !req.file){
        res.status(400)
        throw new Error('Please add neccessary fields')
    }

    const url = req.protocol + "://" + req.get("host");

    const submission = await Submission.create({
        activity_name: req.body.activity_name,
        rollno: req.body.rollno,
        student_name: req.body.student_name,
        certificate: url + '/uploads/' +req.file.filename
    })

    await Student.updateOne({id_no: submission.rollno}, {$push: {activities: submission._id}})
    .then(p => res.status(200).json({submission}))
    .catch(err => res.status(200).json(err))
    
    // res.status(200).json(submission)
}
)
    
// @desc    Update Submission
// @route   PUT /api/submissions/:id
// @access  Private

const updateStudent = asyncHandler(
    async (req, res) => {
        const student = await Student.find({id_no: req.body.id_no })
        if(!student){
            res.status(400)
            throw new Error('Submission not found')
        }
        
        // if(!req.user){
        //     res.status(401)
        //     throw new Error('User not found')
        // }

        const updateStudent = await Student.findByIdAndUpdate({id_no: req.body.id_no }, req.body, {
            new: true,
        })

        res.status(200).json(updateStudent)
    }
)

// @desc    Update Submission
// @route   PUT /api/submissions/:id
// @access  Private

const updateSubmission = asyncHandler(
    async (req, res) => {
        const submission = await Submission.find(req.params.id)
        if(!submission){
            res.status(400)
            throw new Error('Submission not found')
        }
        
        // if(!req.user){
        //     res.status(401)
        //     throw new Error('User not found')
        // }

        const updatedSubmission = await Submission.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })

        res.status(200).json(updatedSubmission)
    }
)

// @desc    Delete Submission
// @route   DELETE /api/submissions/:id
// @access  Private

const deleteSubmission = asyncHandler(
    async (req, res) => {
        const submission = await Submission.findById(req.params.id)

    // if(!req.user){
    //     res.status(401)
    //     throw new Error('User not found')
    // }

    if(!submission){
        res.status(400)
        throw new Error('Submission not found')
    }

    await submission.remove()

    res.status(200).json({ id: req.params.id })
}
)


module.exports = {
getSubmissions, addSubmission, updateSubmission, deleteSubmission, updateStudent
}