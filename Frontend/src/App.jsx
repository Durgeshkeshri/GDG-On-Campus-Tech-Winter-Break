import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  const baseUrl = "http://localhost:3000/items";

  // Fetch all items
  const fetchItems = async () => {
    const res = await axios.get(baseUrl);
    setItems(res.data);
  };

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${baseUrl}/${editingId}`, form);
    } else {
      await axios.post(baseUrl, form);
    }
    setForm({ name: "", description: "", price: "" });
    setEditingId(null);
    fetchItems();
  };

  // Delete an item
  const handleDelete = async (id) => {
    await axios.delete(`${baseUrl}/${id}`);
    fetchItems();
  };

  // Edit an item
  const handleEdit = (item) => {
    setForm({ name: item.name, description: item.description, price: item.price });
    setEditingId(item._id);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="app">
      <h1>CRUD Operations</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"} Item</button>
      </form>

      <div className="items-list">
        {items.map((item) => (
          <div key={item._id} className="item">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p><strong>Price:</strong> ${item.price}</p>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
