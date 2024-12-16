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
│   └── index.html
├── controllers/
│   └── userController.js
├── app.js
```
## Project Example - CodersClub Backend 
---

  [Express JS Quiz](https://forms.gle/JGTqu7HYYjWxiZiJ6)