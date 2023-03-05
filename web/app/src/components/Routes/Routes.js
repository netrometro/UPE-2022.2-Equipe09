import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';

export function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
            </Routes>
        </Router>
    )
}