import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Home  } from '../Home/Home';
import { Profile } from '../Profile/Profile';
import { MeProfile } from "../MeProfile/MeProfile";
import { UpdateUser } from "../UpdateUser/UpdateUser";
import { SeePost } from "../SeePost/SeePost";
import { SeeFeedPost } from "../SeeFeedPost/SeeFeedPost";

export function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/home" element={<Home/>}/>
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/profile/me" element={<MeProfile />} />
                <Route path="/edit-profile" element={<UpdateUser />} />
                <Route path="/post/:id" element={<SeePost />} />
                <Route path="/feedpost/:id" element={<SeeFeedPost/>}/>
            </Routes>
        </Router>
    )
}

