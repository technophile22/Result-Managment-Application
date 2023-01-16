const Student = require('../models/student');

/*
 * @route - GET student/login
 * @description - render student login page
 */
getStudentLogin = async (req, res) => {
	res.render('student/login');
};

/*
 * @route - GET student/viewRecord
 * @description - render student score
 */
getStudentScore = async (req, res) => {
	try {
		const body = req.body;
		const { rollNumber, dob } = body;
		if (!rollNumber || !dob) {
			//send error message
			return res.render('student/login', {
				error: 'Invalid Request. Please try again!',
			});
		}
		const student = await Student.findOne({ rollNumber: rollNumber });
		// check for date of birth
		if (
			!student ||
			new Date(student.dob).toDateString() !== new Date(dob).toDateString()
		) {
			//send error message
			return res.render('student/login', {
				error: 'Record not found. Please try again!',
			});
		}
		res.render('student/viewRecord', { student: student });
	} catch (error) {
		console.log(error);
		res.render('student/login', { error: 'Server Error. Please try again!' });
	}
};

module.exports = { getStudentLogin, getStudentScore };
