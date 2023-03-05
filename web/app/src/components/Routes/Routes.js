import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from '../Login/Login';

export function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}></Route>
            </Routes>
        </Router>
    )
}