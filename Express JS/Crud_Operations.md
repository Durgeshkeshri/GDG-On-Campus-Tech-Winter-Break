# Backend Setup for Form App with CRUD Operations (Express + MySQL)

## 1. Database Schema (MySQL)

Ensure you have the following table in your MySQL database:

```sql
CREATE DATABASE form_app;

USE form_app;

CREATE TABLE submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 2. Backend Code with CRUD Operations (app.js)

### Install Dependencies

If you haven't installed the necessary dependencies, do so:

```bash
npm install express mysql2 body-parser cors
npm install -g nodemon
```

### app.js - Backend with CRUD Operations

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

// ------------------------
// CREATE: Submit Form Data
// ------------------------

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

// ------------------------
// READ: Retrieve all Form Submissions
// ------------------------

app.get('/submissions', (req, res) => {
  const query = 'SELECT * FROM submissions ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error fetching submissions', error: err });
    }
    res.status(200).json({ success: true, data: results });
  });
});

// ------------------------
// UPDATE: Update a Submission by ID
// ------------------------

app.put('/update-submission/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, message } = req.body;

  // Input validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // Update the form submission in the database
  const query = 'UPDATE submissions SET name = ?, email = ?, message = ? WHERE id = ?';
  db.query(query, [name, email, message, id], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error updating data', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }
    res.status(200).json({ success: true, message: 'Submission updated successfully' });
  });
});

// ------------------------
// DELETE: Delete a Submission by ID
// ------------------------

app.delete('/delete-submission/:id', (req, res) => {
  const { id } = req.params;

  // Delete the form submission from the database
  const query = 'DELETE FROM submissions WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error deleting data', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }
    res.status(200).json({ success: true, message: 'Submission deleted successfully' });
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

## 3. Explanation of CRUD Routes

1. **POST `/submit-form`**: This route handles form submissions by inserting the data into the `submissions` table.
2. **GET `/submissions`**: This route retrieves all form submissions from the database.
3. **PUT `/update-submission/:id`**: This route updates a specific form submission by its `id`. It requires all fields to be provided in the request body.
4. **DELETE `/delete-submission/:id`**: This route deletes a form submission by its `id`.

## 4. Running the Backend

1. **Start the server with Nodemon:**
   ```bash
   nodemon app.js
   ```

2. The server will be running on `http://localhost:4000`.

## 5. Testing the CRUD Operations

You can test the CRUD operations using **Postman** or **cURL**.

#### **POST: Submit Form Data**

- **URL:** `http://localhost:4000/submit-form`
- **Body (JSON):**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "This is a new test message."
  }
  ```

- **Response (Success):**
  ```json
  {
    "success": true,
    "message": "Form submitted successfully!",
    "data": {
      "insertId": 1
    }
  }
  ```

#### **GET: Retrieve All Submissions**

- **URL:** `http://localhost:4000/submissions`

- **Response (Success):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "name": "Jane Doe",
        "email": "jane@example.com",
        "message": "This is a new test message.",
        "created_at": "2024-12-15T12:00:00Z",
        "updated_at": "2024-12-15T12:00:00Z"
      }
    ]
  }
  ```

#### **PUT: Update a Submission**

- **URL:** `http://localhost:4000/update-submission/1`
- **Body (JSON):**
  ```json
  {
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "message": "Updated message content."
  }
  ```

- **Response (Success):**
  ```json
  {
    "success": true,
    "message": "Submission updated successfully"
  }
  ```

#### **DELETE: Delete a Submission**

- **URL:** `http://localhost:4000/delete-submission/1`

- **Response (Success):**
  ```json
  {
    "success": true,
    "message": "Submission deleted successfully"
  }
  ```

## 6. Conclusion

This backend API now supports **Create**, **Read**, **Update**, and **Delete** operations for form submissions. The server allows you to submit form data, retrieve it, update it, and delete it using RESTful routes in **Express** with **MySQL**.
