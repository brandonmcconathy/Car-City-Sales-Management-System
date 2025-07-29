import React, { useState } from 'react';

const initialCarModels = [
  { carModelID: 1, make: "Honda", model: "Accord", year: 2025 },
  { carModelID: 2, make: "Toyota", model: "Camry", year: 2024 },
];

const CarModels = () => {
  const [carModels, setCarModels] = useState(initialCarModels);
  const [editingID, setEditingID] = useState(null);
  const [formData, setFormData] = useState({ make: "", model: "", year: "" });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle add or update submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate unique combination of make, model, year
    const exists = carModels.some(cm =>
      cm.make.toLowerCase() === formData.make.toLowerCase() &&
      cm.model.toLowerCase() === formData.model.toLowerCase() &&
      Number(cm.year) === Number(formData.year) &&
      cm.carModelID !== editingID
    );

    if (exists) {
      alert("This car model (make, model, year) already exists.");
      return;
    }

    if (editingID !== null) {
      // Update existing
      setCarModels(carModels.map(cm =>
        cm.carModelID === editingID ? { carModelID: editingID, ...formData, year: Number(formData.year) } : cm
      ));
      setEditingID(null);
    } else {
      // Add new
      const nextID = carModels.length ? Math.max(...carModels.map(cm => cm.carModelID)) + 1 : 1;
      setCarModels([...carModels, { carModelID: nextID, ...formData, year: Number(formData.year) }]);
    }

    // Clear form
    setFormData({ make: "", model: "", year: "" });
  };

  const handleEdit = (carModel) => {
    setFormData({ make: carModel.make, model: carModel.model, year: carModel.year.toString() });
    setEditingID(carModel.carModelID);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this car model?")) {
      setCarModels(carModels.filter(cm => cm.carModelID !== id));
      if (editingID === id) {
        setEditingID(null);
        setFormData({ make: "", model: "", year: "" });
      }
    }
  };

  const handleCancel = () => {
    setEditingID(null);
    setFormData({ make: "", model: "", year: "" });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", textAlign: "center" }}>
      <h1 className='car-models-page'>Car Models Management</h1>
      
      <h2>Car Models</h2>
      <table>
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {carModels.map(cm => (
            <tr key={cm.carModelID}>
              <td>{cm.make}</td>
              <td>{cm.model}</td>
              <td>{cm.year}</td>
              <td>
                <button onClick={() => handleEdit(cm)}>Edit</button>{" "}
                <button onClick={() => handleDelete(cm.carModelID)}>Delete</button>
              </td>
            </tr>
          ))}
          {carModels.length === 0 && (
            <tr>
              <td colSpan="4" style={{ fontStyle: "italic" }}>No car models yet.</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>{editingID ? "Edit Car Model" : "Add New Car Model"}</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "400px", margin: "auto" }}>
        <input
          type="text"
          name="make"
          value={formData.make}
          onChange={handleChange}
          placeholder="Make"
          required
        />
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="Model"
          required
        />
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="Year"
          min="1900"
          max="2100"
          required
        />
        <button type="submit">{editingID ? "Update" : "Add"}</button>
        {editingID && <button type="button" onClick={handleCancel}>Cancel</button>}
      </form>
    </div>
  );
};

export default CarModels;
