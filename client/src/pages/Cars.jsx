import { useState } from "react";

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

const carModelData = [
    { carModelID: 1, make: "Honda", model: "Accord", year: 2025 },
  { carModelID: 2, make: "Toyota", model: "Camry", year: 2024 }
];

export default function Cars() {
    const [cars, setCars] = useState(carData);
    const [updateID, setUpdateID] = useState(null);
    const [newCar, setNewCar] = useState({carModelID: "", isPreOwned: false, 
        receivedDate: "", isForSale: false});

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setNewCar((prevNewCar) => ({...prevNewCar, [name]: type === "checkbox" ? checked : value}));
    };

    const handleEdit = (car) => {
        setNewCar(car);
        setUpdateID(car.carID);
    };

    const handleDelete = (carID) => {
        setCars(cars.filter(car => car.carID !== carID));
        if (updateID == carID) {
            // Delete the entry while editing it
            setUpdateID(null);
            setNewCar({carID: "", carModelID: "", isPreOwned: false, 
                receivedDate: "", isForSale: false});
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (updateID) {
            // Editing a car
            setCars(cars.map((car) => {
                return updateID === car.carID ? {carID: updateID, ...newCar} : car
            }));
            setUpdateID(null);
        } else {
            // Add new car
            const nextID = cars.length + 1;
            setCars((prevCars) => ([...prevCars, {carID: nextID, ...newCar}]));
        }

        // Empty input fields
        setNewCar({carModelID: "", isPreOwned: false, 
                receivedDate: "", isForSale: false});
    }

    const cancelUpdate = () => {
        setUpdateID(null);
        setNewCar({carModelID: "", isPreOwned: false, 
                receivedDate: "", isForSale: false});
    }

    return (
        <div className='cars-page' style={{ textAlign: "center" }}>
            <h1 style={{ marginTop: "2rem" }}>Car Management</h1>
            <h2>Cars</h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <table>
                    <thead>
                        <tr>
                            <th>Car Model</th>
                            <th>Recieved Date</th>
                            <th>Pre Owned</th>
                            <th>For Sale</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((car) => (
                        <tr key={car.carID}>
                            <td>{carModelData.map(carModel => 
                                car.carModelID == carModel.carModelID && 
                                `${carModel.year} ${carModel.make} ${carModel.model}` 
                            )}</td>
                            <td>{car.receivedDate}</td>
                            <td>{car.isPreOwned ? "Yes" : "No"}</td>
                            <td>{car.isForSale ? "Yes" : "No"}</td>
                            <td>
                                <button onClick={() => handleEdit(car)}>Edit</button>
                                <button onClick={() => handleDelete(car.carID)}>Delete</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <h2 style={{ marginTop: "2rem" }}>{updateID ? "Edit Car" : "Add New Car"}</h2>
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
                <select name="carModelID" value={newCar.carModelID} onChange={handleChange} required>
                    <option value="" disabled hidden>Select a Car Model</option>
                    {carModelData.map(carModel => 
                    <option key={carModel.carModelID} value={carModel.carModelID}>
                        {`${carModel.year} ${carModel.make} ${carModel.model}`}
                    </option>)}
                </select>
                <input type="date" name="receivedDate" value={newCar.receivedDate} onChange={handleChange} required/>
                <label htmlFor="isPreOwned">Pre Owned
                    <input type="checkbox" id="isPreOwned" name="isPreOwned" onChange={handleChange} checked={newCar.isPreOwned}/>
                </label>
                <label htmlFor="isForSale">For Sale
                    <input type="checkbox" id="isForSale" name="isForSale" onChange={handleChange} checked={newCar.isForSale}/>
                </label>
                <button type='submit'>{updateID ? "Update Car" : "Add Car"}</button>
                {updateID ? <button onClick={cancelUpdate}>Cancel</button> : null}
            </form>
        </div>
  );
};