import { Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Auth from "./auth/Auth";
import Profile from "./profile/Profile";

import Login from "./auth/login/Login";
import Register from "./auth/register/Register";
import Products from "./profile/products/Products";
import Users from "./profile/users/Users";


import Header from "../components/header/Header";

const RouteController = () => {
  return (
    <Routes>
        <Route element={<Header headerType="home" />}>
            <Route path="" element={<Home />} />
        </Route>
        <Route path="profile" element={<Profile />}>
            <Route index path="" element={<Products/>} />
            <Route path="users" element={<Users/>} />
        </Route>
        <Route path="auth" element={<Auth />}>
            <Route index path="" element={<Login/>}/>
            <Route path="register" element={<Register/>}/> 
        </Route>
    </Routes>
  )
}

export default RouteController