import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Home  } from '../Home/Home';
import { Profile } from '../Profile/Profile';

export function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/home" element={<Home/>}/>
                <Route path="/profile/:id" element={<Profile />} />
            </Routes>
        </Router>
    )
}