import React, { useState } from 'react';
import '../styles/global.css';

const testData = [
  {
    customerID: 1,
    fName: "John",
    lName: "Doe",
    addressLine1: "303 Main Street",
    city: "Mesa",
    state: "AZ",
    country: "US",
    postalCode:"85212",
    email: "johndoe@example.com",
    phoneNumber: "6265551234"
  },
  {
    customerID: 2,
    fName: "Jane",
    lName: "Doe",
    addressLine1:"505 South Street",
    city: "Los Angeles",
    state: "California",
    country: "US",
    postalCode: "50562",
    email: "janedoe@example.com",
    phoneNumber: "6265559090"
  }
];

const formatPhoneNumber = (number) => {
  const cleaned = ('' + number).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return number;
};

const Customers = () => {
  const [customers, setCustomers] = useState(testData);
  const [editingCustomerID, setEditingCustomerID] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    fName: "",
    lName: "",
    email: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    postalCode: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    // Normalize phone number for comparison
    const normalizePhone = (phone) => phone.replace(/\D/g, "");
  
    const isDuplicate = customers.some((cust) => {
      const sameEmail = cust.email.toLowerCase() === newCustomer.email.toLowerCase();
      const samePhone = normalizePhone(cust.phoneNumber) === normalizePhone(newCustomer.phoneNumber);
      return (sameEmail || samePhone) && cust.customerID !== editingCustomerID;
    });
  
    if (isDuplicate) {
      alert("A customer with this email or phone number already exists.");
      return;
    }
  
    if (editingCustomerID !== null) {
      setCustomers(customers.map(c =>
        c.customerID === editingCustomerID ? { ...c, ...newCustomer } : c
      ));
      setEditingCustomerID(null);
    } else {
      const nextID = customers.length + 1;
      setCustomers([...customers, { customerID: nextID, ...newCustomer }]);
    }
  
    setNewCustomer({
      fName: "",
      lName: "",
      email: "",
      phoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      postalCode: ""
    });
  };
  
  const handleEditClick = (cust) => {
    setNewCustomer(cust);
    setEditingCustomerID(cust.customerID);
  };

  const handleDelete = (id) => {
    setCustomers(customers.filter(c => c.customerID !== id));
    if (editingCustomerID === id) {
      setEditingCustomerID(null);
      setNewCustomer({
        fName: "",
        lName: "",
        email: "",
        phoneNumber: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "",
        postalCode: ""
      });
    }
  };

  return (
    <div className='customers-page' style={{ textAlign: "center" }}>
      <h1 style={{ marginTop: "2rem" }}>Customer Management</h1>

      <h2>Customers</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>City</th>
              <th>State</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust) => (
              <tr key={cust.customerID}>
                <td>{cust.fName}</td>
                <td>{cust.lName}</td>
                <td>{cust.email}</td>
                <td>{formatPhoneNumber(cust.phoneNumber)}</td>
                <td>{cust.city}</td>
                <td>{cust.state}</td>
                <td>
                  <button onClick={() => handleEditClick(cust)}>Edit</button>
                  <button onClick={() => handleDelete(cust.customerID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: "2rem" }}>{editingCustomerID ? "Edit Customer" : "Add New Customer"}</h2>
      <form
        onSubmit={handleFormSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          maxWidth: "500px",
          margin: "0 auto"
        }}
      >
        <input name="fName" value={newCustomer.fName} onChange={handleInputChange} placeholder='First Name' required />
        <input name="lName" value={newCustomer.lName} onChange={handleInputChange} placeholder='Last Name' required />
        <input name="addressLine1" value={newCustomer.addressLine1} onChange={handleInputChange} placeholder='Address Line 1' required />
        <input name="addressLine2" value={newCustomer.addressLine2} onChange={handleInputChange} placeholder='Address Line 2 (Optional)' />
        <input name="city" value={newCustomer.city} onChange={handleInputChange} placeholder='City' required />
        <input name="state" value={newCustomer.state} onChange={handleInputChange} placeholder='State' required />
        <input name="country" value={newCustomer.country} onChange={handleInputChange} placeholder='Country' required />
        <input name="postalCode" value={newCustomer.postalCode} onChange={handleInputChange} placeholder='Postal Code' required />
        <input name="email" value={newCustomer.email} onChange={handleInputChange} placeholder='Email' required />
        <input name="phoneNumber" value={newCustomer.phoneNumber} onChange={handleInputChange} placeholder='Phone Number (e.g. 123-456-7890)' required />
        <button type='submit'>{editingCustomerID ? "Update Customer" : "Add Customer"}</button>
      </form>
    </div>
  );
};

export default Customers;
