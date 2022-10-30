const express = require("express");
const router = express.Router();
const { getActivities, addActivity, deleteActivity, updateActivity } = require('../controllers/activityController')
const { protect, adminProtect } = require('../middlewares/authMiddleware')

// http://localhost:9000/api/activities

router.route('/').get(getActivities).post(adminProtect, addActivity)
router.route('/:id').put(adminProtect, updateActivity).delete(adminProtect, deleteActivity)

module.exports = router;