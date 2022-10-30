const asyncHandler = require('express-async-handler')
const Activity = require('../models/Activity')

// @desc    Get Activities
// @route   GET /api/Activities
// @access  Private

const getActivities = asyncHandler(
async (req, res) => {
    const activities = await Activity.find()
    res.status(200).json(activities)
}
)

// @desc    Add Activity
// @route   POST /api/activities
// @access  Private

const addActivity = asyncHandler(
async (req, res) => {
    if(!req.body.name || !req.body.category || !req.body.points || !req.body.max_points){
        res.status(400)
        throw new Error('Please add neccessary fields')
    }

    const activity = await Activity.create({
        name: req.body.name,
        category: req.body.category,
        points: req.body.points,
        max_points: req.body.max_points
    })

    res.status(200).json(activity)
}
)
    
// @desc    Update Activity
// @route   PUT /api/Activities/:id
// @access  Private

const updateActivity = asyncHandler(
    async (req, res) => {
        const activity = await Activity.findById(req.params.id)
        if(!activity){
            res.status(400)
            throw new Error('Activity not found')
        }

        const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })

        res.status(200).json(updatedActivity)
    }
)

// @desc    Delete Activity
// @route   DELETE /api/Activities/:id
// @access  Private

const deleteActivity = asyncHandler(
    async (req, res) => {
        const activity = await Activity.findById(req.params.id)

    if(!activity){
        res.status(400)
        throw new Error('Activity not found')
    }

    await activity.remove()

    res.status(200).json({ id: req.params.id })
}
)


module.exports = {
getActivities, addActivity, deleteActivity, updateActivity
}