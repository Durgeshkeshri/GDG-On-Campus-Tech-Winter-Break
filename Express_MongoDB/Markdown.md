# Express.js Basics: A Complete Server Guide

This document serves as a beginner-friendly guide to demonstrate **basic server creation**, **routing**, **static file serving**, **query parameters**, **middleware**, **API testing**, and **MongoDB CRUD operations** using **Express.js**.

---

## Table of Contents
1. [Basic Server](#basic-server)
2. [Serving Static Files](#serving-static-files)
3. [Routing](#routing)
4. [Query Parameters](#query-parameters)
5. [Response Types: res.send() & res.json()](#response-types)
6. [Middleware](#middleware)
7. [Built-in Middleware](#built-in-middleware)
8. [API Testing](#api-testing)
9. [MongoDB CRUD Operations](#mongodb-crud-operations)
10. [Express Js Quiz](#quiz)

---

## 1. Basic Server

This is the simplest example of an **Express.js server** that responds with "Hello, World!" when a user accesses the root (`/`) route.

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
```
---

## 2. Serving Static Files

You can serve static HTML files (e.g., `index.html`) using `res.sendFile()`.

```javascript
const express = require('express');
const path = require('path')
const app = express();

app.get('/', (req, res) => {
  // Use res.sendFile() to send the index.html file in response
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/home', (req, res) => {
  // Use res.sendFile() to send the index.html file in response
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
```
---

## 3. Routing

Routes define the different endpoints your server can respond to.

```javascript
const express = require("express");
const app = express();
app.get('/', (req, res) => res.send("Hello World"));
app.get('/items', (req, res) => res.send('GET items'));

// use thunderclient or postman 

app.post('/items', (req, res) => res.send('POST item'));
app.put('/items/:id', (req, res) => res.send(`PUT item ${req.params.id}`));
app.delete('/items/:id', (req, res) => res.send(`DELETE item ${req.params.id}`));

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
```
---

## 4. Query Parameters

Query and route parameters allow dynamic data retrieval.

```javascript
const express = require("express");
const app = express();
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID is ${userId}`);
});

// http://localhost:3000/search?q=express
app.get('/search', (req, res) => {
  const query = req.query.q;
  res.send(`Search query: ${query}`);
});


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
```
---

## 5. Response Types: res.send() & res.json()

Express can send responses in **text** or **JSON** format.

```javascript
const express = require("express");
const app = express();

app.get('/text', (req, res) => res.send('Hello, Text Response!'));
app.get('/json', (req, res) => res.json({ message: 'Hello, JSON Response!' }));

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
```
---

## 6. Middleware

Middleware functions allow you to process requests before sending a response.

```javascript
const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Middleware in action!');
});


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
})
```
---

## 7. Built-in Middleware

Built-in middleware like `express.json()` and `express.urlencoded()` parse incoming data.

```javascript
const express = require("express");
const app = express();

app.use(express.json());

// A space becomes %20
// & becomes %26
// = becomes %3D

app.use(express.urlencoded({ extended: true }));

// // use thunderclient or postman 

app.post('/data', (req, res) => {
  res.json(req.body);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
})
```
---

## 8. API Testing

A complete CRUD API example with testable endpoints.

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Sample data
const items = [
  { id: 1, name: 'Item 1', description: 'First item' },
  { id: 2, name: 'Item 2', description: 'Second item' },
];

// API Endpoints

// GET: Fetch all items
app.get('/api/items', (req, res) => {
  res.status(200).json({ success: true, data: items });
});

// GET: Fetch an item by ID
app.get('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const item = items.find((item) => item.id === parseInt(id));

  if (item) {
    res.status(200).json({ success: true, data: item });
  } else {
    res.status(404).json({ success: false, message: 'Item not found' });
  }
});

// POST: Add a new item
app.post('/api/items', (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ success: false, message: 'Missing name or description' });
  }

  const newItem = { id: items.length + 1, name, description };
  items.push(newItem);
  res.status(201).json({ success: true, data: newItem });
});

// PUT: Update an existing item
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const item = items.find((item) => item.id === parseInt(id));

  if (item) {
    item.name = name || item.name;
    item.description = description || item.description;
    res.status(200).json({ success: true, data: item });
  } else {
    res.status(404).json({ success: false, message: 'Item not found' });
  }
});

// DELETE: Remove an item
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex((item) => item.id === parseInt(id));

  if (index !== -1) {
    items.splice(index, 1);
    res.status(200).json({ success: true, message: 'Item deleted' });
  } else {
    res.status(404).json({ success: false, message: 'Item not found' });
  }
});

// Error handling for invalid routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```
---

## 9. MongoDB CRUD Operations

Integrate MongoDB using **Mongoose** for full database operations.

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173' // Allow requests only from this origin
}));
// MongoDB connection
mongoose.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true, // to avoid decription warnings 
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Mongoose schema and model
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: Number,
});

const Item = mongoose.model('Item', itemSchema);

// Routes

// Create
app.post('/items', async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const newItem = new Item({ name, description, price });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read All
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read One
app.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update
app.put('/items/:id', async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            { name, description, price },
            { new: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete
app.delete('/items/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

---
## Quiz
[Express Js Quiz](https://forms.gle/kL4R41k1W2K2AEsr8)
---
## Summary
This guide covers key Express.js concepts for building servers, serving static content, routing, middleware, and MongoDB database operations. These examples provide a solid foundation for creating APIs and backend applications.

---

**Happy Coding!** 🎉
