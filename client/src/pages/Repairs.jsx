import { useState } from "react";

const repairData = [{
    repairID: 1, 
    employeeID: 1, 
    carID: 2, 
    cost: 89.99, 
    serviceDate: "2025-06-05", 
    serviceType: "Oil Change", 
    notes: "Customer requested synthetic oil change"
    }, {
    repairID: 2, 
    employeeID: 2, 
    carID: 1, 
    cost: 109.99, 
    serviceDate: "2025-06-20", 
    serviceType: "Brake Change", 
    notes: "Front and rear brakes replaced"
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

const carModelData = [
    { carModelID: 1, make: "Honda", model: "Accord", year: 2025 },
  { carModelID: 2, make: "Toyota", model: "Camry", year: 2024 }
];

export default function Repairs() {
    const [repairs, setRepairs] = useState(repairData);
    const [updateID, setUpdateID] = useState(null);
    const [newRepair, setNewRepair] = useState({employeeID: "", carID: "", 
        cost: "", serviceDate: "", serviceType: "", notes: ""});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewRepair((prevNewCar) => ({...prevNewCar, [name]: value}));
    };

    const handleEdit = (repair) => {
        setNewRepair(repair);
        setUpdateID(repair.repairID);
    };

    const handleDelete = (repairID) => {
        setRepairs(repairs.filter(repair => repair.repairID !== repairID));
        if (updateID == repairID) {
            // Delete the entry while editing it
            setUpdateID(null);
            setNewRepair({employeeID: "", carID: "", cost: "", 
                serviceDate: "", serviceType: "", notes: ""});
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate car ID
        let validCarID = false;
        carData.map((car) => {
            if (car.carID == newRepair.carID) {
                validCarID = true;
            }
        });
        !validCarID && alert("Invalid car ID");

        // Validate employee ID
        let validEmployeeID = false;
        employeeData.map((employee) => {
            if (employee.employeeID == newRepair.employeeID) {
                validEmployeeID = true;
            }
        });
        !validEmployeeID && alert("Invalid employee ID");

        if (validCarID && validEmployeeID) {
            if (updateID) {
                // Editing a car
                setRepairs(repairs.map((repair) => {
                    return updateID === repair.repairID ? {repairID: updateID, ...newRepair} : repair
                }));
                setUpdateID(null);
            } else {
                // Add new car
                const nextID = repairs.length + 1;
                setRepairs((prevRepairs) => ([...prevRepairs, {repairID: nextID, ...newRepair}]));
            }
        }

        // Empty input fields
        setNewRepair({employeeID: "", carID: "", cost: "", 
            serviceDate: "", serviceType: "", notes: ""});
    }

    const cancelUpdate = () => {
        setUpdateID(null);
        setNewRepair({employeeID: "", carID: "", cost: "", 
            serviceDate: "", serviceType: "", notes: ""});
    }

    return (
        <div className='repairs-page' style={{ textAlign: "center" }}>
            <h1 style={{ marginTop: "2rem" }}>Repair Management</h1>
            <h2>Repairs</h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <table>
                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Car</th>
                            <th>Cost</th>
                            <th>Service Date</th>
                            <th>Service Type</th>
                            <th>Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {repairs.map((repair) => (
                        <tr key={repair.repairID}>
                            <td>{employeeData.map(employee => 
                                repair.employeeID == employee.employeeID && 
                                `${employee.fName} ${employee.lName} ID: ${employee.employeeID}` 
                            )}</td>
                            <td>{carData.map(car => 
                                repair.carID == car.carID &&
                                carModelData.map(carModel =>
                                    carModel.carModelID == car.carModelID &&
                                    `${carModel.year} ${carModel.make} ${carModel.model} ID: ${car.carID}`
                                )
                            )}</td>
                            <td>{repair.cost}</td>
                            <td>{repair.serviceDate}</td>
                            <td>{repair.serviceType}</td>
                            <td>{repair.notes}</td>
                            <td>
                                <button onClick={() => handleEdit(repair)}>Edit</button>
                                <button onClick={() => handleDelete(repair.repairID)}>Delete</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <h2 style={{ marginTop: "2rem" }}>{updateID ? "Edit Repair" : "Add New Repair"}</h2>
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
                <input type="number" name="employeeID" value={newRepair.employeeID} onChange={handleChange} placeholder="Employee ID" required/>
                <input type="number" name="carID" value={newRepair.carID} onChange={handleChange} placeholder="Car ID" required/>
                <input type="number" name="cost" value={newRepair.cost} onChange={handleChange} placeholder="Cost" required/>
                <input type="date" name="serviceDate" value={newRepair.serviceDate} onChange={handleChange} required/>
                <input name="serviceType" value={newRepair.serviceType} onChange={handleChange} placeholder="Service Type" required/>
                <input name="notes" value={newRepair.notes} onChange={handleChange} placeholder="Notes"/>
                <button type='submit'>{updateID ? "Update Repair" : "Add Repair"}</button>
                {updateID ? <button onClick={cancelUpdate}>Cancel</button> : null}
            </form>
        </div>
  );
};