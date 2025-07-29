import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Customers from "./Customers";  
import Employees from "./Employees";  
import CarModels from "./CarModels";

export default function App () {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/customers" element={<Customers/>} />
                <Route path="/employees" element={<Employees />}/>
                <Route path="/carModels" element={<CarModels />}/>
            </Routes>

        </Router>
    )
}