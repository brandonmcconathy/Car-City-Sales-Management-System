import { useState } from "react";

const transactionData = [{
    transactionID: 1,
    customerID: 1,
    employeeID: 1,
    carID: 1,
    transactionDate: "2025-05-10",
    transactionAmount: 25999.99,
    paid: false
    }, {
    transactionID: 2,
    customerID: 2,
    employeeID: 2,
    carID: 2,
    transactionDate: "2025-10-10",
    transactionAmount: 55759.99,
    paid: true
}];

const carData = [{
    carID: 1,
    carModelID: 1,
    isPreOwned: 0,
    receivedDate: "2025-03-10",
    isForSale: 0
    }, {
    carID: 2,
    carModelID: 2,
    isPreOwned: 1,
    receivedDate: "2025-05-10",
    isForSale: 1
}];

const employeeData = [
  {
    employeeID: 1,
    fName: "Johnathon",
    lName: "Doer",
    jobTitle: "Manager",
    isDealer: false,
    email: "managerjohndoe@example.com",
    phoneNumber: "6265551235",
  },
  {
    employeeID: 2,
    fName: "Janeith",
    lName: "Don",
    jobTitle: "Sales Associate",
    isDealer: true,
    email: "janedoesales@example.com",
    phoneNumber: "6265559091",
  }
];

const carModelData = [
    { carModelID: 1, make: "Honda", model: "Accord", year: 2025 },
  { carModelID: 2, make: "Toyota", model: "Camry", year: 2024 }
];

const customerData = [
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

export default function Transactions() {
    const [transactions, setTransactions] = useState(transactionData);
    const [updateID, setUpdateID] = useState(null);
    const [newTransaction, setNewTransaction] = useState({customerID: "", employeeID: "",
        carID: "", transactionDate: "", transactionAmount: "", paid: false});

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setNewTransaction((prevNewTransaction) => ({...prevNewTransaction, [name]: type === "checkbox" ? checked : value}));
    };

    const handleEdit = (transaction) => {
        setNewTransaction(transaction);
        setUpdateID(transaction.transactionID);
    };

    const handleDelete = (transactionID) => {
        setTransactions(transactions.filter(transaction => transaction.transactionID !== transactionID));
        if (updateID == transactionID) {
            // Delete the entry while editing it
            setUpdateID(null);
            setNewTransaction({customerID: "", employeeID: "", carID: "", 
                transactionDate: "", transactionAmount: "", paid: false});
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate car ID
        let validCarID = false;
        carData.map((car) => {
            if (car.carID == newTransaction.carID) {
                validCarID = true;
            }
        });
        !validCarID && alert("Invalid car ID");

        // Validate employee ID
        let validEmployeeID = false;
        employeeData.map((employee) => {
            if (employee.employeeID == newTransaction.employeeID) {
                validEmployeeID = true;
            }
        });
        !validEmployeeID && alert("Invalid employee ID");

        // Validate customer ID
        let validCustomerID = false;
        customerData.map((customer) => {
            if (customer.customerID == newTransaction.customerID) {
                validCustomerID = true;
            }
        });
        !validCustomerID && alert("Invalid customer ID");

        if (validCarID && validCustomerID && validEmployeeID) {
            if (updateID) {
                // Editing a car
                setTransactions(transactions.map((transaction) => {
                    return updateID === transaction.transactionID ? {transactionID: updateID, ...newTransaction} : transaction
                }));
                setUpdateID(null);
            } else {
                // Add new car
                const nextID = transactions.length + 1;
                setTransactions((prevTransaction) => ([...prevTransaction, {transactionID: nextID, ...newTransaction}]));
            }
        }

        // Empty input fields
        setNewTransaction({customerID: "", employeeID: "", carID: "", 
            transactionDate: "", transactionAmount: "", paid: false});
    }

    const cancelUpdate = () => {
        setUpdateID(null);
        setNewTransaction({customerID: "", employeeID: "", carID: "", 
            transactionDate: "", transactionAmount: "", paid: false});
    }

    return (
        <div className='transactions-page' style={{ textAlign: "center" }}>
            <h1 style={{ marginTop: "2rem" }}>Transaction Management</h1>
            <h2>Transactions</h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <table>
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Employee</th>
                            <th>Car</th>
                            <th>Transaction Date</th>
                            <th>Transaction Amount</th>
                            <th>Paid</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                        <tr key={transaction.transactionID}>
                            <td>{customerData.map(customer => 
                                customer.customerID == transaction.customerID && 
                                `${customer.fName} ${customer.lName} ID: ${customer.customerID}` 
                            )}</td>
                            <td>{employeeData.map(employee => 
                                employee.employeeID == transaction.employeeID && 
                                `${employee.fName} ${employee.lName} ID: ${employee.employeeID}` 
                            )}</td>
                            <td>{carData.map(car => 
                                car.carID == transaction.carID && 
                                carModelData.map(carModel => 
                                    carModel.carModelID == car.carModelID &&
                                    `${carModel.year} ${carModel.make} ${carModel.model} ID: ${car.carID}`
                                ) 
                            )}</td>
                            <td>{transaction.transactionDate}</td>
                            <td>{transaction.transactionAmount}</td>
                            <td>{transaction.paid ? "Yes" : "No"}</td>
                            <td>
                                <button onClick={() => handleEdit(transaction)}>Edit</button>
                                <button onClick={() => handleDelete(transaction.transactionID)}>Delete</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <h2 style={{ marginTop: "2rem" }}>{updateID ? "Edit Transaction" : "Add New Transaction"}</h2>
            <form
                onSubmit={handleSubmit}
                style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                maxWidth: "500px",
                margin: "0 auto"
                }}
            >
                <input type="number" name="customerID" value={newTransaction.customerID} onChange={handleChange} placeholder="Customer ID" required/>
                <input type="number" name="carID" value={newTransaction.carID} onChange={handleChange} placeholder="Car ID" required/>
                <input type="number" name="employeeID" value={newTransaction.employeeID} onChange={handleChange} placeholder="Employee ID" required/>
                <input type="date" name="transactionDate" value={newTransaction.transactionDate} onChange={handleChange} required/>
                <input type="number" name="transactionAmount" value={newTransaction.transactionAmount} onChange={handleChange} placeholder="Cost" required/>
                <label htmlFor="paid">Paid
                    <input type="checkbox" id="paid" name="paid" onChange={handleChange} checked={newTransaction.paid}/>
                </label>
                <button type='submit'>{updateID ? "Update Transaction" : "Add Transaction"}</button>
                {updateID ? <button onClick={cancelUpdate}>Cancel</button> : null}
            </form>
        </div>
  );
};