const { QuizModel } = require("../Models/Quizz.Model");
const cron = require("node-cron");

const QuizzRouter = require("express").Router();

cron.schedule("* * * * *", async () => {
	try {
		const now = new Date();

		await QuizModel.updateMany(
			{
				startDate: { $lte: now },
				endDate: { $gt: now },
			},
			{ $set: { status: "active" } }
		);

		await QuizModel.updateMany(
			{
				endDate: { $lt: now },
			},
			{
				$set: { status: "finished" },
			}
		);

		console.log("Quiz Status Updated Successfully.");

		const fiveMinutesAgo = new Date(now - 5 * 60 * 1000);
		await QuizModel.updateMany(
			{
				endDate: { $lt: now, $gte: fiveMinutesAgo },
			},
			{
				$set: { isAllowedToPublishResult: true },
			}
		);
	} catch (error) {
		console.log(error.message);
	}
});

QuizzRouter.post("/", async (req, res) => {
	const { questions, startDate, endDate } = req.body;

	if (!questions || !startDate || !endDate) {
		return res
			.status(400)
			.json({ Response: false, msg: "Missing Required Field" });
	}
	try {
		const newQuizz = new QuizModel({ questions, startDate, endDate });

		await newQuizz.save();

		res.status(200).json({
			Response: true,
			msg: "Quiz Created Sccuessfully",
			quiz: newQuizz,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ msg: error.message });
	}
});

QuizzRouter.get("/active", async (req, res) => {
	try {
		const activeQuiz = await QuizModel.find({
			status: "active",
		});

		res.status(200).json({ message: "Active quiz data", quiz: activeQuiz });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

QuizzRouter.get("/:id/result", async (req, res) => {
	try {
		const { id } = req.params;
		const theQuiz = await QuizModel.findById(id);

		if (theQuiz.isAllowedToPublishResult) {
			const resultArr = [];
			theQuiz.questions.forEach((question) => {
				resultArr.push(question.rightAnswer);
			});

			res.status(200).json({
				Response: true,
				msg: "Result fetched Successfully.",
				result: resultArr,
			});
		} else {
			res.status(400).json({
				Response: false,
				msg: "The result of the requested quiz is not published yet, It will be published 5 minutes after the quiz's end.",
			});
		}
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ msg: "Internal server error." });
	}
});

QuizzRouter.get("/all", async (req, res) => {
	try {
		const allQuiz = await QuizModel.find();
		res
			.status(200)
			.json({ Response: true, msg: "All Quiz fetched Successfully.", allQuiz });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ Response: false, msg: "Internal server error." });
	}
});
module.exports = { QuizzRouter };
