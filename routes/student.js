const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');

router.get('/login', studentController.getStudentLogin);
router.post('/viewRecord', studentController.getStudentScore);

module.exports = router;
