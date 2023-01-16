const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StudentSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		rollNumber: {
			type: Number,
			required: true,
			unique: true,
		},
		dob: {
			type: Date,
			required: true,
		},
		score: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('Student', StudentSchema);
