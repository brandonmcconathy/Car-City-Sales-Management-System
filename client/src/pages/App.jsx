import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Customers from "./Customers";    

export default function App () {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/customers" element={<Customers/>} />
            </Routes>

        </Router>
    )
}