const express = require("express");
const router = express.Router();
const { loginUser, updateUser, deleteUser, getMe, registerAdmin, registerUser, getStudents, getMentors } = require('../controllers/userController')
const { protect, adminProtect, mentorProtect } = require('../middlewares/authMiddleware')

// http://localhost:9000/

router.post('/registerAdmin', registerAdmin )
router.post('/register', registerUser)
router.post('/login', loginUser )
router.get('/me', protect, getMe )
router.get('/students', mentorProtect, getStudents)
router.get('/mentors', mentorProtect, getMentors)
router.route('/:id').delete(adminProtect, deleteUser).put(protect, updateUser)

module.exports = router;
