import React, { useState, useEffect } from "react";
import { PlusCircle, Save, Trash2, Edit, Image, AlertCircle, Check } from "lucide-react";
import "./Inventory.css";

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [newItem, setNewItem] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
    rating: 0
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const categories = [
    "pizza", "burger", "pasta", "salad", "dessert", 
    "seafood", "rice", "mexican", "beverage", "other"
  ];


  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("inventoryItems")) || [];
    setInventoryItems(savedItems);
  }, []);


  useEffect(() => {
    localStorage.setItem("inventoryItems", JSON.stringify(inventoryItems));
  }, [inventoryItems]);

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "price") {
     
      if (value === "" || (!isNaN(value) && value >= 0)) {
        setNewItem({
          ...newItem,
          [name]: value
        });
      }
    } else if (name === "rating") {

      const rating = parseFloat(value);
      if (!isNaN(rating) && rating >= 0 && rating <= 5) {
        setNewItem({
          ...newItem,
          [name]: rating
        });
      }
    } else {
      setNewItem({
        ...newItem,
        [name]: value
      });
    }
  };

  const validateForm = () => {
    if (!newItem.name.trim()) {
      setError("Item name is required");
      return false;
    }
    if (!newItem.price || isNaN(newItem.price)) {
      setError("Valid price is required");
      return false;
    }
    if (!newItem.category) {
      setError("Category is required");
      return false;
    }
    if (!newItem.image.trim()) {
      setError("Image URL is required");
      return false;
    }
    if (!newItem.description.trim()) {
      setError("Description is required");
      return false;
    }
    if (!newItem.rating || isNaN(newItem.rating) || newItem.rating < 0 || newItem.rating > 5) {
      setError("Valid rating between 0-5 is required");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (editing) {
      const updatedItems = inventoryItems.map(item => 
        item.id === editId ? { ...newItem, id: editId } : item
      );
      setInventoryItems(updatedItems);
      setEditing(false);
      setEditId(null);
      showSuccess("Item updated successfully!");
    } else {

      const newId = Math.max(1000, ...inventoryItems.map(item => item.id), 0) + 1;
      setInventoryItems([...inventoryItems, { ...newItem, id: newId, price: parseFloat(newItem.price) }]);
      showSuccess("Item added successfully!");
    }

    setNewItem({
      id: "",
      name: "",
      price: "",
      category: "",
      image: "",
      description: "",
      rating: 0
    });
    setImagePreview("");
  };

  const handleEdit = (item) => {
    setNewItem({
      ...item,
      price: item.price.toString()
    });
    setEditing(true);
    setEditId(item.id);
    setImagePreview(item.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    setInventoryItems(inventoryItems.filter(item => item.id !== id));
    showSuccess("Item deleted successfully!");
    
    if (editId === id) {
      setNewItem({
        id: "",
        name: "",
        price: "",
        category: "",
        image: "",
        description: "",
        rating: 0
      });
      setEditing(false);
      setEditId(null);
      setImagePreview("");
    }
  };

  const handleImagePreview = (e) => {
    const imageUrl = e.target.value;
    setNewItem({
      ...newItem,
      image: imageUrl
    });
    setImagePreview(imageUrl);
  };

  const handleCancel = () => {
    setNewItem({
      id: "",
      name: "",
      price: "",
      category: "",
      image: "",
      description: "",
      rating: 0
    });
    setEditing(false);
    setEditId(null);
    setImagePreview("");
    setError("");
  };

  return (
    <div id="inventory-container">
      <div id="inventory-header">
        <h1>Inventory Management</h1>
        <p>Add, edit, or remove items from your menu</p>
      </div>

      {successMessage && (
        <div id="success-message">
          <Check size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      <div id="inventory-content">
        <div id="inventory-form-container">
          <div id="form-header">
            <h2>{editing ? "Edit Item" : "Add New Item"}</h2>
            {error && (
              <div id="error-message">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} id="inventory-form">
            <div id="form-row">
              <div id="form-group">
                <label htmlFor="name">Item Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newItem.name}
                  onChange={handleInputChange}
                  placeholder="Enter item name"
                  required
                />
              </div>

              <div id="form-group">
                <label htmlFor="price">Price (Rs.)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  min="0"
                  step="0.01"
                  value={newItem.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  required
                />
              </div>
            </div>

            <div id="form-row">
              <div id="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={newItem.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div id="form-group">
                <label htmlFor="rating">Rating (0-5)</label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  min="0"
                  max="5"
                  step="0.1"
                  value={newItem.rating}
                  onChange={handleInputChange}
                  placeholder="Enter rating"
                  required
                />
              </div>
            </div>

            <div id="form-group">
              <label htmlFor="image">Image URL</label>
              <input
                type="text"
                id="image"
                name="image"
                value={newItem.image}
                onChange={handleImagePreview}
                placeholder="Enter image URL"
                required
              />
            </div>

            <div id="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={newItem.description}
                onChange={handleInputChange}
                placeholder="Enter item description"
                rows="3"
                required
              ></textarea>
            </div>

            {imagePreview && (
              <div id="image-preview">
                <h3>Image Preview</h3>
                <img src={imagePreview} alt="Preview" onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/300x200?text=Invalid+Image+URL";
                }} />
              </div>
            )}

            <div id="form-actions">
              {editing && (
                <button type="button" id="cancel-button" onClick={handleCancel}>
                  Cancel
                </button>
              )}
              <button className="bb" type="submit" id="submit-button">
                {editing ? (
                  <>
                    <Save size={16} />
                    <span>Update Item</span>
                  </>
                ) : (
                  <>
                    <PlusCircle size={16} />
                    <span>Add Item</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div id="inventory-list-container">
          <h2>Current Inventory</h2>
          
          {inventoryItems.length === 0 ? (
            <div id="empty-inventory">
              <Image size={48} />
              <p>No items in inventory yet</p>
              <p id="empty-subtitle">Add your first item using the form</p>
            </div>
          ) : (
            <div id="inventory-list">
              {inventoryItems.map(item => (
                <div key={item.id} id="inventory-item">
                  <div id="inventory-item-image">
                    <img src={item.image} alt={item.name} onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/100x100?text=Image+Error";
                    }} />
                  </div>
                  <div id="inventory-item-details">
                    <h3>{item.name}</h3>
                    <div id="inventory-item-meta">
                      <span id="inventory-item-category">{item.category}</span>
                      <span id="inventory-item-price">Rs. {item.price.toFixed(2)}</span>
                    </div>
                    <p id="inventory-item-description">{item.description}</p>
                    <div id="inventory-rating">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} id={i < Math.floor(item.rating) ? "star filled" : "star"}>★</span>
                      ))}
                      <span id="rating-value">{item.rating}</span>
                    </div>
                  </div>
                  <div id="inventory-item-actions">
                    <button id="edit-button" onClick={() => handleEdit(item)}>
                      <Edit size={16} />
                    </button>
                    <button id="delete-button" onClick={() => handleDelete(item.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;