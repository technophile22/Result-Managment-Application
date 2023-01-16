const Student = require('../models/student');

getTeacherLogin = (req, res) => {
	res.render('teacher/login');
};

postTeacherLogin = (req, res) => {
	const body = req.body;
	const { email, password } = body;
	if (!email || !password) {
		// send error message
		res.render('teacher/login', {
			error: 'Invalid Request. Please try again!',
		});
	}
	if (email !== 'admin@email.com' || password !== 'admin') {
		// send error message
		res.render('teacher/login', {
			error: 'Incorrect email or password. Please try again!',
		});
	}
	res.redirect('/teacher/viewRecords');
};

getAllRecords = async (req, res) => {
	const students = await Student.find();
	res.render('teacher/viewRecords', { students: students });
};

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
			//bad request
			console.log('inside');
			return res.render('teacher/editRecord', {
				error: 'Record not found. Please try again!',
			});
		}
		res.redirect('/teacher/viewRecords');
	} catch (error) {
		//error
	}
};

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

getAddRecord = (req, res) => {
	res.render('teacher/addRecord');
};

/*
 * @route - GET student/
 * @description - get student login
 */
postAddRecord = async (req, res) => {
	// put auth middleware
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
