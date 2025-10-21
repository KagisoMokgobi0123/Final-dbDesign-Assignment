# Instructions to run the project

1. Set up your MySQL database

Open MySQL Workbench or your MySQL client.

Create your database and tables (Students, Courses) as per your schema.

Example:

CREATE DATABASE crud_app;

USE crud_app;

CREATE TABLE students (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE courses (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255) NOT NULL,
description TEXT,
student_id INT,
FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE SET NULL
);

2. Configure backend environment variables

In your backend folder:

Create a .env file with your MySQL connection info:

DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=crud_app
PORT=5000

Make sure your backend code uses dotenv to load these (like in the example I provided earlier).

3. Run backend server

In your backend folder:

npm install # install dependencies
node server.js # or npm run start if configured

The backend should start on http://localhost:5000 (or your configured PORT).

Test backend API endpoints (like GET /students, GET /courses) using Postman or your browser.

4. Run frontend (React + Vite)

In your frontend folder:

npm install # install dependencies
npm run dev # starts the Vite dev server

Vite will show you a local URL (usually http://localhost:5173).

Open that URL in your browser.

You should see the React app with Students and Courses components working with the backend.

5. Using the app

Add students via the Students form.

Add courses and select students by name in the dropdown.

You can update or delete entries as per your CRUD implementation.

Troubleshooting tips

Make sure backend server is running before frontend (frontend needs API).

Check console logs for errors.

Confirm MySQL server is running and credentials in .env are correct.

If ports conflict, change in .env or in Vite config.

On first run, if tables don’t exist, create them manually or use migrations/seeds.
