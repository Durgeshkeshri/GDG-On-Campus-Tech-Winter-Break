const express = require('express');
const app = express();
const PORT = 4000;

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
