// Basic Server

// const express = require("express");
// const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });
//----------------------------------------------------------------------


// Serving Static Files 

// const express = require('express');
// const path = require('path')
// const app = express();

// app.get('/', (req, res) => {
//   // Use res.sendFile() to send the index.html file in response
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.get('/home', (req, res) => {
//   // Use res.sendFile() to send the index.html file in response
//   res.sendFile(path.join(__dirname, 'public', 'home.html'));
// });

// app.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });
//----------------------------------------------------------------------

// Routing 

// const express = require("express");
// const app = express();
// app.get('/', (req, res) => res.send("Hello World"));
// app.get('/items', (req, res) => res.send('GET items'));

// // use thunderclient or postman 

// app.post('/items', (req, res) => res.send('POST item'));
// app.put('/items/:id', (req, res) => res.send(`PUT item ${req.params.id}`));
// app.delete('/items/:id', (req, res) => res.send(`DELETE item ${req.params.id}`));

// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });

//----------------------------------------------------------------------

// Query Parameters 

// const express = require("express");
// const app = express();
// app.get('/user/:id', (req, res) => {
//   const userId = req.params.id;
//   res.send(`User ID is ${userId}`);
// });

// // http://localhost:3000/search?q=express
// app.get('/search', (req, res) => {
//   const query = req.query.q;
//   res.send(`Search query: ${query}`);
// });


// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });


//----------------------------------------------------------------------

// res.send() & res.json()

// const express = require("express");
// const app = express();

// app.get('/text', (req, res) => res.send('Hello, Text Response!'));
// app.get('/json', (req, res) => res.json({ message: 'Hello, JSON Response!' }));

// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });

//----------------------------------------------------------------------

// Middleware 

// const express = require("express");
// const app = express();

// app.use((req, res, next) => {
//   console.log(`${req.method} request for ${req.url}`);
//   next();
// });

// app.get('/', (req, res) => {
//   res.send('Middleware in action!');
// });


// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// })


//----------------------------------------------------------------------

// In-build middleware

// const express = require("express");
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // // use thunderclient or postman 

// app.post('/data', (req, res) => {
//   res.json(req.body);
// });

// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// })


//----------------------------------------------------------------------

// Api Testing 

// const express = require('express');
// const app = express();
// const PORT = 3000;

// // Middleware to parse JSON
// app.use(express.json());

// // Sample data
// const items = [
//   { id: 1, name: 'Item 1', description: 'First item' },
//   { id: 2, name: 'Item 2', description: 'Second item' },
// ];

// // API Endpoints

// // GET: Fetch all items
// app.get('/api/items', (req, res) => {
//   res.status(200).json({ success: true, data: items });
// });

// // GET: Fetch an item by ID
// app.get('/api/items/:id', (req, res) => {
//   const { id } = req.params;
//   const item = items.find((item) => item.id === parseInt(id));

//   if (item) {
//     res.status(200).json({ success: true, data: item });
//   } else {
//     res.status(404).json({ success: false, message: 'Item not found' });
//   }
// });

// // POST: Add a new item
// app.post('/api/items', (req, res) => {
//   const { name, description } = req.body;

//   if (!name || !description) {
//     return res.status(400).json({ success: false, message: 'Missing name or description' });
//   }

//   const newItem = { id: items.length + 1, name, description };
//   items.push(newItem);
//   res.status(201).json({ success: true, data: newItem });
// });

// // PUT: Update an existing item
// app.put('/api/items/:id', (req, res) => {
//   const { id } = req.params;
//   const { name, description } = req.body;
//   const item = items.find((item) => item.id === parseInt(id));

//   if (item) {
//     item.name = name || item.name;
//     item.description = description || item.description;
//     res.status(200).json({ success: true, data: item });
//   } else {
//     res.status(404).json({ success: false, message: 'Item not found' });
//   }
// });

// // DELETE: Remove an item
// app.delete('/api/items/:id', (req, res) => {
//   const { id } = req.params;
//   const index = items.findIndex((item) => item.id === parseInt(id));

//   if (index !== -1) {
//     items.splice(index, 1);
//     res.status(200).json({ success: true, message: 'Item deleted' });
//   } else {
//     res.status(404).json({ success: false, message: 'Item not found' });
//   }
// });

// // Error handling for invalid routes
// app.use((req, res) => {
//   res.status(404).json({ success: false, message: 'Endpoint not found' });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
//--------------------------------------------------------------------------------------



// MongoDB - Crud Operations 

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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