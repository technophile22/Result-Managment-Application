const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher');

router.get('/login', teacherController.getTeacherLogin);
router.post('/login', teacherController.postTeacherLogin);
router.get('/viewRecords', teacherController.getAllRecords);
router.get('/editRecord/:id', teacherController.getEditRecord);
router.post('/editRecord/:id', teacherController.postEditRecord);
router.get('/deleteRecord/:id', teacherController.getDeleteRecord);
router.get('/addRecord', teacherController.getAddRecord);
router.post('/addRecord', teacherController.postAddRecord);
module.exports = router;
