const asyncHandler = require('express-async-handler')
const Class = require('../models/Class')
const User = require('../models/User')

// @desc    Get class
// @route   GET /api/class
// @access  Private

const getClasses = asyncHandler(
    async (req, res) => {
        const classs = await Class.find({ user: req.user.id })
        res.status(200).json(classs)
    }
)

// @desc    Add class
// @route   ADD /api/class
// @access  Private

const addClass = asyncHandler(
    async (req, res) => {
        if( !req.body.class_name || !req.body.branch || !req.body.batch_year || !req.body.section){
            res.status(400)
            throw new Error('Please add neccessary fields')
        }

        const classs = await Class.create({
            class_name: req.body.class_name,
            branch: req.body.branch,
            batch_year: req.body.batch_year,
            section: req.body.section,
        })

        res.status(200).json(classs)
    }
)

// @desc    Delete class
// @route   DELETE /api/class/:id
// @access  Private

const deleteClass = asyncHandler(
    async (req, res) => {
        const classs = await Class.findById(req.params.id)

        // const user = await User.findById(req.user.id)

        // Check for user
        if(!req.user){
            res.status(401)
            throw new Error('User not found')
        }

        if(!classs){
            res.status(400)
            throw new Error('Class not found')
        }

        await classs.remove()

        res.status(200).json({ id: req.params.id })
    }
)

// @desc    Update class
// @route   PUT /api/class/:id
// @access  Private

const updateClass = asyncHandler(
    async (req, res) => {
        const classs = await Class.findById(req.params.id)
        if(!classs){
            res.status(400)
            throw new Error('Class not found')
        }
        
        // const user = await User.findById(req.user.id)

        // Check for user
        if(!req.user){
            res.status(401)
            throw new Error('User not found')
        }

        // Make sure the logged in user matches the Class user
        // if(Class.user.toString() !== req.user.id){
        //     res.status(401)
        //     throw new Error('User not authorized')
        // }

        const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })

        res.status(200).json(updatedClass)
    }
)

module.exports = {
    getClasses, addClass, deleteClass, updateClass
}