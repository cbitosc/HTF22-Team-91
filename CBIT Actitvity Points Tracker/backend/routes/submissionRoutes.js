const express = require("express")
const router = express.Router()
const { protect } = require("../middlewares/authMiddleware")
const { uploadCertificate } = require("../middlewares/uploadMiddleware")
const { getSubmissions,addSubmission,updateSubmission,deleteSubmission,updateStudent } = require("../controllers/submissionController");

router
    .route('/')
    .get( getSubmissions)
    .post(uploadCertificate.single('certificate'), addSubmission)

router
    .route('/:id')
    .put( updateSubmission)
    .delete( deleteSubmission)

router.route("/student/feedback").put(updateStudent)


module.exports = router