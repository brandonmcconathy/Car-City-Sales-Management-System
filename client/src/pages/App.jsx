import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import Customers from "./Customers";
import Employees from "./Employees";
import Cars from "./Cars";
import CarModels from "./CarModels";
import Repairs from "./Repairs";
import Transactions from "./Transactions";

export default function App () {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage />}/>
                <Route path="/customers" element={<Customers/>} />
                <Route path="/employees" element={<Employees />}/>
                <Route path="/cars" element={<Cars />}/>
                <Route path="/carModels" element={<CarModels />}/>
                <Route path="/repairs" element={<Repairs />}/>
                <Route path="/transactions" element={<Transactions />}/>
            </Routes>
        </Router>
    )
}