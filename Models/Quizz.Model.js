const mongoose = require("mongoose");
const QuestionSchema = mongoose.Schema({
	question: {
		type: String,
		required: true,
	},
	options: [String],
	rightAnswer: {
		type: String,
		ENUM: [0, 1, 2, 3],
		required: true,
	},
});
const QuizSchema = mongoose.Schema({
	questions: [QuestionSchema],
	status: {
		type: String,
		enum: ["inactive", "active", "finished"],
		default: "inactive",
	},
	startDate: {
		type: Date,
		required: true,
	},
	endDate: {
		type: Date,
		required: true,
	},
	isAllowedToPublishResult: {
		type: Boolean,
		default: false,
	},
});

const QuizModel = mongoose.model("Quiz", QuizSchema);

module.exports = { QuizModel };
