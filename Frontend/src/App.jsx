import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:3000/items';

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      // Update item
      try {
        const response = await axios.put(`${API_URL}/${editingId}`, form);
        setItems(items.map((item) => (item._id === editingId ? response.data : item)));
        setEditingId(null);
      } catch (error) {
        console.error('Error updating item:', error);
      }
    } else {
      // Create item
      try {
        const response = await axios.post(API_URL, form);
        setItems([...items, response.data]);
      } catch (error) {
        console.error('Error creating item:', error);
      }
    }
    setForm({ name: '', description: '', price: '' });
  };

  const handleEdit = (item) => {
    setForm({ name: item.name, description: item.description, price: item.price });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="app">
      <h1>CRUD Application</h1>
      <form className="item-form" onSubmit={handleFormSubmit}>
        <h2>{editingId ? 'Edit Item' : 'Add Item'}</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleFormChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleFormChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleFormChange}
        />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        {editingId && <button onClick={() => setEditingId(null)}>Cancel</button>}
      </form>
      <div className="item-list">
        <h2>Item List</h2>
        {items.length === 0 ? (
          <p>No items found</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item._id}>
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.description}</p>
                  <p>Price: ${item.price}</p>
                </div>
                <div className="actions">
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
