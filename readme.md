# Result Management System

A basic result management system built using Node.js, EJS and MongoDB.

## Features

- Student login: Students can view their marks.
- Teacher login: Teachers can add, delete and edit students' information and their marks.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- MongoDB

### Installation

1.  Clone the repository: `git clone https://github.com/<your-username>/result-management-system.git`
2.  Install the dependencies: `npm install`
3.  Create .env file in the root folder of the project with `MONGODB_URI` and `PORT` variables and paste the MongoDB connection string and port as 3000 as shown below in the example.
4.  Start the server: `npm start`
5.  Visit `http://localhost:3000/` in your browser
6.  Please refer to teacher login credentials mentioned below for logging as a teacher.

### Steps to get MongoDB connection string

1. Sign-in/up to https://www.mongodb.com/cloud/atlas/register
2. Create a free cluster and create a new project.
3. Get connection string of the project and paste it in the `.env` file of your application.

### .env file

```
MONGODB_URI=<YOUR_MONGO_DB_CONNECTION_STRING>
PORT=3000
```

## Teacher Login Credentials

```
email = admin@email.com
password = admin
```

## Built With

- [Node.js](https://nodejs.org/)
- [EJS](https://ejs.co/)
- [MongoDB](https://www.mongodb.com/)

## Author

- [Raghav Mangal](https://github.com/technophile22)

## Acknowledgements

- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Passport.js](http://www.passportjs.org/)
- [EJS-Lint](https://github.com/RyanZim/EJS-Lint)

---
