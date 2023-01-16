const Student = require('../models/student');
const constants = require('../constants/constants');

/*
 * @route - GET teacher/login
 * @description - render teacher login
 */
getTeacherLogin = (req, res) => {
	res.render('teacher/login');
};

/*
 * @route - POST teacher/login
 * @description - teacher login
 */
postTeacherLogin = (req, res) => {
	const body = req.body;
	const { email, password } = body;
	if (!email || !password) {
		// send error message
		res.render('teacher/login', {
			error: 'Invalid Request. Please try again!',
		});
	}
	if (
		email !== constants.TEACHER_LOGIN_EMAIL ||
		password !== constants.TEACHER_LOGIN_PASSWORD
	) {
		// send error message
		res.render('teacher/login', {
			error: 'Incorrect email or password. Please try again!',
		});
	}
	res.redirect('/teacher/viewRecords');
};

/*
 * @route - GET teacher/viewRecords
 * @description - render all records
 */
getAllRecords = async (req, res) => {
	const students = await Student.find();
	res.render('teacher/viewRecords', { students: students });
};

/*
 * @route - GET teacher/editRecord/:id
 * @description - render edit record screen
 */
getEditRecord = async (req, res) => {
	try {
		const id = req.params.id;
		const student = await Student.findById(id);
		console.log(student);
		if (!student) {
			return res.render('teacher/editRecord', {
				error: 'Record not found. Please try again!',
			});
		}
		res.render('teacher/editRecord', { student: student });
	} catch (error) {
		console.log(error.message);
		res.redirect('/teacher/viewRecords');
	}
};

/*
 * @route - POST teacher/editRecord/:id
 * @description - edit student record
 */
postEditRecord = async (req, res) => {
	try {
		const id = req.params.id;
		const body = req.body;
		const { name, rollNumber, dob, score } = body;
		console.log(name, rollNumber, dob, score);
		if (!name || !rollNumber || !dob || !score) {
			//bad request
			return res.render('teacher/editRecord', {
				error: 'Invalid Request. Please try again!',
			});
		}
		const student = await Student.findByIdAndUpdate(id, body);
		console.log('student', student);
		if (!student) {
			//not found error
			console.log('inside');
			return res.render('teacher/editRecord', {
				error: 'Record not found. Please try again!',
			});
		}
		res.redirect('/teacher/viewRecords');
	} catch (error) {
		//error
		return res.render('teacher/editRecord', {
			error: 'Server Error. Please try again!',
		});
	}
};

/*
 * @route - GET teacher/deleteRecord/:id
 * @description - delete student record
 */
getDeleteRecord = async (req, res) => {
	try {
		console.log('inside get delete');
		const id = req.params.id;
		console.log(id);
		if (!id) {
			// error
			return res.redirect('/teacher/viewRecords');
		}
		const a = await Student.findByIdAndDelete(id);
		res.redirect('/teacher/viewRecords');
	} catch (error) {
		res.redirect('/teacher/viewRecords');
	}
};

/*
 * @route - GET teacher/addRecord
 * @description - render add record screen
 */
getAddRecord = (req, res) => {
	res.render('teacher/addRecord');
};

/*
 * @route - POST teacher/addRecord
 * @description - add student record
 */
postAddRecord = async (req, res) => {
	try {
		const body = req.body;
		const { name, rollNumber, dob, score } = body;
		if (!name || !rollNumber || !dob || !score) {
			//bad request
			return res.render('teacher/addRecord', {
				error: 'Invalid Request. Please try again!',
			});
		}
		console.log(name, rollNumber, dob, score);
		const student = new Student({
			name: name,
			rollNumber: rollNumber,
			dob: dob,
			score: score,
		});
		const result = await student.save();
		console.log(result);
		res.redirect('/teacher/addRecord');
		//record added successfully
	} catch (error) {
		console.log(error.code);
		if (error.code === 11000) {
			//duplicate key error
			return res.render('teacher/addRecord', {
				error: 'Roll Number already exists. Please try again!',
			});
		}
		// internal server error
		return res.render('teacher/addRecord', {
			error: 'Server Error. Please try again!',
		});
	}
};

module.exports = {
	getTeacherLogin,
	postTeacherLogin,
	getAllRecords,
	getEditRecord,
	postEditRecord,
	getDeleteRecord,
	getAddRecord,
	postAddRecord,
};
