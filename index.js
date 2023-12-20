const express = require("express");
const { connection } = require("./Config/db");
const { QuizzRouter } = require("./Routes/Quizz.Routes");
require("dotenv").config();
const port = process.env.PORT || 8000;

// ---------------------------
const app = express();
app.use(express.json());

// ---------------------------

app.get("/", (req, res) => {
	res.status(200).send("Welcome to The Quizz Application Backend.");
});

app.use("/quizzes", QuizzRouter);
// ---------------------------

app.listen(port, async () => {
	try {
		await connection();
		console.log("Connected to DB...");
	} catch (error) {
		console.log(error.message);
	}
	console.log(`Listening @ Port ${port}`);
});
