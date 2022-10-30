const express = require("express");
const router = express.Router();
const { getClasses, addClass, updateClass, deleteClass } = require('../controllers/classController')
const { protect, adminProtect } = require('../middlewares/authMiddleware')

// http://localhost:9000/api/classes

router.post('/', adminProtect, addClass)
router.get('/', adminProtect, getClasses)
router.route('/:id').delete(adminProtect, deleteClass).put(protect, updateClass)

module.exports = router;
