# Express.js and MySQL Project Documentation

## Introduction to Express.js
Express.js is a fast, minimal, and flexible Node.js web application framework used to build web apps and APIs.

# Creating express app - 
```bash
npm install express
npm install -g nodemon

```
---
# Package.json setup  
```bash
npm init -y
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```
# Run - npm run dev


**Request and Response:**
- `req`: Represents the HTTP request, including properties like `params`, `query`, and `body`.
- `res`: Used to send back the HTTP response.
---

## Creating a Basic Express Server
```javascript
const express = require('express');
const app = express(); 

//Ignore for now 
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Ignore for now 

app.get('/', (req, res) => {
  res.send('Welcome to Express.js!');
});

app.listen(3000, () => {
  console.log('Server is running on port 5000');
});
```

---

## Serving Static Files
Express can serve static files like HTML, CSS, and JavaScript.

**Example:**
```javascript

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => console.log('Static files are being served!'));
```

Place your static files in a `public` folder.

---


## Routing in Express
Routes define how the server responds to different HTTP methods.

**Example: GET, POST, PUT, DELETE**
```javascript

app.get('/items', (req, res) => res.send('GET items'));
app.post('/items', (req, res) => res.send('POST item'));
app.put('/items/:id', (req, res) => res.send(`PUT item ${req.params.id}`));
app.delete('/items/:id', (req, res) => res.send(`DELETE item ${req.params.id}`));

```

---


## Handling URL Parameters and Query Strings
**Example:**
```javascript

app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID is ${userId}`);
});

app.get('/search', (req, res) => {
  const query = req.query.q;
  res.send(`Search query: ${query}`);
});

```

---

## Sending Responses
1. `res.send` - Sends a plain text or HTML response.
2. `res.json` - Sends a JSON response.
3. `res.render` - Renders a template engine view (e.g., Pug, EJS).

**Example:**
```javascript

app.get('/text', (req, res) => res.send('Hello, Text Response!'));
app.get('/json', (req, res) => res.json({ message: 'Hello, JSON Response!' }));

```

---

## Working with Middleware
Middleware functions are functions that have access to `req`, `res`, and `next`. They are used for tasks like logging, parsing, and authentication.

**Example:**
```javascript
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Middleware in action!');
});

```

---

## Built-in Middleware
1. `express.json()` - Parses incoming JSON payloads.
2. `express.urlencoded()` - Parses URL-encoded payloads.

**Example:**
```javascript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/data', (req, res) => {
  res.json(req.body);
});
```

---

## MVC Architecture
Model-View-Controller separates the application logic into three components:
1. **Model**: Manages data and business logic.
2. **View**: Displays data to the user (e.g., EJS templates).
3. **Controller**: Handles user requests and responses.

**Folder Structure:**
```
project/
├── models/
│   └── userModel.js
├── views/
│   └── index.ejs
├── controllers/
│   └── userController.js
├── app.js
```
## Project Example - CodersClub Backend 
---

## Project: Form App Backend
#  Backend Setup for Form App with CRUD Operations (Express + MySQL)

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

app.post('/submit', (req, res) => {
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

app.put('/update/:id', (req, res) => {
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

app.delete('/delete/:id', (req, res) => {
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

1. **POST `/submit`**: This route handles form submissions by inserting the data into the `submissions` table.
2. **GET `/submissions`**: This route retrieves all form submissions from the database.
3. **PUT `/update/:id`**: This route updates a specific form submission by its `id`. It requires all fields to be provided in the request body.
4. **DELETE `/delete/:id`**: This route deletes a form submission by its `id`.

## 4. Running the Backend

1. **Start the server with Nodemon:**
   ```bash
   nodemon app.js
   ```

2. The server will be running on `http://localhost:4000`.

## 5. Testing the CRUD Operations

You can test the CRUD operations using **Postman** or **cURL**.

#### **POST: Submit Form Data**

- **URL:** `http://localhost:4000/submit`
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

- **URL:** `http://localhost:4000/update/1`
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

- **URL:** `http://localhost:4000/delete/1`

- **Response (Success):**
  ```json
  {
    "success": true,
    "message": "Submission deleted successfully"
  }
  ```

## 6. Conclusion

This backend API now supports **Create**, **Read**, **Update**, and **Delete** operations for form submissions. The server allows you to submit form data, retrieve it, update it, and delete it using RESTful routes in **Express** with **MySQL**.


### Frontend (React + Tailwind CSS)
A simple React component with Tailwind CSS for styling:

```javascript
import React, { useState, useEffect } from 'react';

const FormApp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submissions, setSubmissions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:4000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    fetchSubmissions();
  };

  const fetchSubmissions = async () => {
    const response = await fetch('http://localhost:4000/submissions');
    setSubmissions(await response.json());
  };

  useEffect(() => { fetchSubmissions(); }, []);

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
          className="border p-2 w-full mb-4"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
          className="border p-2 w-full mb-4"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Message"
          className="border p-2 w-full mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Submit</button>
      </form>

      <div className="mt-6">
        <h2>Submissions:</h2>
        <ul>
          {submissions.map(sub => (
            <li key={sub.id}>{sub.name} ({sub.email}): {sub.message}</li>
          ))}
        </ul>
      </div>
   
```

  [Express JS Quiz](https://forms.gle/JGTqu7HYYjWxiZiJ6)