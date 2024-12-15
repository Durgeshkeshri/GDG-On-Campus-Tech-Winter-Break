
# Backend for Form App using Express and MySQL

## Prerequisites
- Install **Node.js** and **npm**.
- Have **MySQL** installed and running.
- Set up a **MySQL database** with a table for form submissions.

## MySQL Database Setup

1. **Create a database:**
   ```sql
   CREATE DATABASE form_app;
   ```

2. **Create a table for form submissions:**
   ```sql
   USE form_app;

   CREATE TABLE submissions (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     message TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

## Backend Setup with Express

### Install Dependencies

Run the following commands to set up your Node.js project and install necessary dependencies:

```bash
mkdir form-app-backend
cd form-app-backend
npm init -y
npm install express mysql2 body-parser
npm install -g nodemon
```

- **express**: For building the backend.
- **mysql2**: For connecting to MySQL.
- **body-parser**: To parse incoming request bodies (needed for POST requests).
- **nodemon**: For auto-restarting the server during development.

### Backend Code (app.js)

Create a new file `app.js` and add the following code:

```javascript
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Middleware to parse JSON and handle CORS
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost', // Change to your MySQL host if needed
  user: 'root',      // Change to your MySQL username
  password: '',      // Change to your MySQL password
  database: 'form_app' // The database you created earlier
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Could not connect to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// POST: Submit form data
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;

  // Input validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // Insert the form data into the database
  const query = 'INSERT INTO submissions (name, email, message) VALUES (?, ?, ?)';
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error inserting data into database', error: err });
    }
    res.status(200).json({ success: true, message: 'Form submitted successfully!', data: result });
  });
});

// GET: Retrieve all form submissions
app.get('/submissions', (req, res) => {
  const query = 'SELECT * FROM submissions ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error fetching submissions', error: err });
    }
    res.status(200).json({ success: true, data: results });
  });
});

// Error handling for invalid routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

## Explanation of the Code

1. **Dependencies:**
   - `express`: A lightweight web framework for handling HTTP requests.
   - `mysql2`: A Node.js MySQL client for connecting to MySQL.
   - `body-parser`: Middleware for parsing incoming JSON payloads.
   - `cors`: Middleware to enable cross-origin resource sharing.

2. **MySQL Connection:**
   - We use `mysql.createConnection()` to connect to the MySQL server with appropriate credentials.
   - Make sure to replace `'localhost'`, `'root'`, and `''` with your actual MySQL database credentials.

3. **POST Route (`/submit-form`):**
   - This route handles form submissions. It checks if the name, email, and message fields are present in the request body.
   - It then inserts the data into the `submissions` table in MySQL.
   - The response includes a success message and the inserted data.

4. **GET Route (`/submissions`):**
   - This route fetches all the submissions from the `submissions` table in MySQL, ordered by the creation time.

5. **Error Handling:**
   - Basic error handling for invalid routes and database errors.

## Running the Backend

1. **Start the server with Nodemon:**
   ```bash
   nodemon app.js
   ```

2. The server will start at `http://localhost:4000`. You can test the API using **Postman** or **cURL**.

## Testing the API

### POST: Submit Form Data

You can test the form submission using **Postman** or **cURL**:

**POST Request (Form Submission):**

- **URL:** `http://localhost:4000/submit-form`
- **Body (JSON):**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "This is a test message."
  }
  ```

- **Response:**
  ```json
  {
    "success": true,
    "message": "Form submitted successfully!",
    "data": {
      "insertId": 1
    }
  }
  ```

### GET: Fetch All Submissions

**GET Request (Fetch Submissions):**

- **URL:** `http://localhost:4000/submissions`

- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "message": "This is a test message.",
        "created_at": "2024-12-15T12:00:00Z"
      }
    ]
  }
  ```

## Conclusion

This backend API handles form submissions using Express and MySQL. The form data is inserted into a MySQL database and can be retrieved with a GET request. This structure can be extended further with authentication, validation, and more advanced features as needed.
