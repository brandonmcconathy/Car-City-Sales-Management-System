import React, { useState } from 'react';
import '../styles/global.css';

const testData = [
  {
    employeeID: 1,
    fName: "John",
    lName: "Doe",
    jobTitle: "Manager",
    isDealer: false,
    email: "managerjohndoe@example.com",
    phoneNumber: "6265551235",
  },
  {
    employeeID: 2,
    fName: "Jane",
    lName: "Doe",
    jobTitle: "Sales Associate",
    isDealer: true,
    email: "janedoesales@example.com",
    phoneNumber: "6265559091",
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

const Employees = () => {
  const [employees, setEmployees] = useState(testData);
  const [editingEmployeeID, setEditingEmployeeID] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    fName: "",
    lName: "",
    jobTitle: "",
    isDealer: false,
    email: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEmployee(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const normalizePhone = (phone) => phone.replace(/\D/g, "");

    const isDuplicate = employees.some(emp => {
      const sameEmail = emp.email.toLowerCase() === newEmployee.email.toLowerCase();
      const samePhone = normalizePhone(emp.phoneNumber) === normalizePhone(newEmployee.phoneNumber);
      return (sameEmail || samePhone) && emp.employeeID !== editingEmployeeID;
    });

    if (isDuplicate) {
      alert("An employee with this email or phone number already exists.");
      return;
    }

    if (editingEmployeeID !== null) {
      // Update existing employee
      setEmployees(employees.map(emp =>
        emp.employeeID === editingEmployeeID ? { employeeID: editingEmployeeID, ...newEmployee } : emp
      ));
      setEditingEmployeeID(null);
    } else {
      // Add new employee
      const nextID = employees.length ? Math.max(...employees.map(emp => emp.employeeID)) + 1 : 1;
      setEmployees([...employees, { employeeID: nextID, ...newEmployee }]);
    }

    // Reset form
    setNewEmployee({
      fName: "",
      lName: "",
      jobTitle: "",
      isDealer: false,
      email: "",
      phoneNumber: "",
    });
  };

  const handleEditClick = (emp) => {
    setNewEmployee({ ...emp });
    setEditingEmployeeID(emp.employeeID);
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter(emp => emp.employeeID !== id));
    if (editingEmployeeID === id) {
      setEditingEmployeeID(null);
      setNewEmployee({
        fName: "",
        lName: "",
        jobTitle: "",
        isDealer: false,
        email: "",
        phoneNumber: "",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingEmployeeID(null);
    setNewEmployee({
      fName: "",
      lName: "",
      jobTitle: "",
      isDealer: false,
      email: "",
      phoneNumber: "",
    });
  };

  return (
    <div className='employees-page' style={{ textAlign: "center" }}>
      <h1 style={{ marginTop: "2rem" }}>Employee Management</h1>

      <h2>Employees</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Job Title</th>
              <th>Dealer</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.employeeID}>
                <td>{emp.fName}</td>
                <td>{emp.lName}</td>
                <td>{emp.jobTitle}</td>
                <td>{emp.isDealer ? "Yes" : "No"}</td>
                <td>{emp.email}</td>
                <td>{formatPhoneNumber(emp.phoneNumber)}</td>
                <td>
                  <button onClick={() => handleEditClick(emp)}>Edit</button>{' '}
                  <button onClick={() => handleDelete(emp.employeeID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: "2rem" }}>{editingEmployeeID ? "Edit Employee" : "Add New Employee"}</h2>
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
        <input
          name="fName"
          value={newEmployee.fName}
          onChange={handleInputChange}
          placeholder="First Name"
          required
        />
        <input
          name="lName"
          value={newEmployee.lName}
          onChange={handleInputChange}
          placeholder="Last Name"
          required
        />
        <input
          name="jobTitle"
          value={newEmployee.jobTitle}
          onChange={handleInputChange}
          placeholder="Job Title"
          required
        />
        <label style={{ textAlign: 'left' }}>
          <input
            type="checkbox"
            name="isDealer"
            checked={newEmployee.isDealer}
            onChange={handleInputChange}
          />{' '}
          Is Dealer
        </label>
        <input
          name="email"
          type="email"
          value={newEmployee.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          name="phoneNumber"
          value={newEmployee.phoneNumber}
          onChange={handleInputChange}
          placeholder="Phone Number (e.g. 123-456-7890)"
          required
        />
        <button type="submit">{editingEmployeeID ? "Update Employee" : "Add Employee"}</button>
        {editingEmployeeID && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default Employees;
