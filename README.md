# GuruCool Quiz Application Backend

This repository contains the backend code for a quiz application. It is built using Node.js, Express.js, and MongoDB. The application allows users to create quizzes, participate in timed quizzes, and retrieve quiz data and results.

## Table of Contents

- [Features](#features)
- [Routes](#routes)
- [Models](#models)
- [Cron Job](#cron-job)
- [Setup](#setup)

## Features

- **Quiz Creation:** Users can create quizzes by sending a POST request to the `/quizzes` endpoint.

- **Active Quiz Retrieval:** Users can retrieve the currently active quiz (within the start and end time) by sending a GET request to `/quizzes/active`.

- **Quiz Result Retrieval:** After 5 minutes of the quiz's end time, users can retrieve the quiz result by sending a GET request to `/quizzes/:id/result`, where `:id` is the quiz's unique identifier.

- **All Quizzes Retrieval:** Users can retrieve all quizzes (including inactive and finished) by sending a GET request to `/quizzes/all`.

## Routes

- `POST /quizzes`: Create a new quiz.
- `GET /quizzes/active`: Retrieve the currently active quiz.
- `GET /quizzes/:id/result`: Retrieve the result of a specific quiz.
- `GET /quizzes/all`: Retrieve all quizzes.

## Models

### Quiz Model

- `questions`: An array of question objects.
  - `question`: The text of the question.
  - `options`: An array of strings representing answer options.
  - `rightAnswer`: The index of the correct answer in the options array.
- `status`: The status of the quiz (`inactive`, `active`, `finished`).
- `startDate`: The date and time when the quiz should start.
- `endDate`: The date and time when the quiz should end.
- `isAllowedToPublishResult`: A boolean indicating whether the result can be published.

## Cron Job

A cron job is scheduled to run every minute, updating the status of quizzes based on their start and end times. Additionally, it allows the automatic publishing of results 5 minutes after the quiz's end.

## Setup

To run the application locally, follow these steps:

    1. Clone the repository:
    ```
    git clone https://github.com/your-username/quiz-app-backend.git
    ```

    2. Install dependencies:

    ```
    npm install
    ```


    3. Set up your MongoDB connection by creating a .env file with the following content:
    ```
    MONGO_URI=your_mongo_connection_string
    PORT=8000
    ```

4. Start the server:
   ```
   npm start
   ```
