import { FiPackage } from "react-icons/fi"; 
import { AiOutlineHome, AiOutlineUser, AiFillLock, AiOutlineUserSwitch } from "react-icons/ai";
import { NavLink } from "react-router-dom"; 

export const NAVIGATION = [
    {
        name: 'Home',
        label: <NavLink to="/">Home</NavLink>,
        icon: <AiOutlineHome />,
        key: 'home'
    },
    {
        name: 'Profile',
        icon: <AiOutlineUser />,
        label: <NavLink to="profile">Profile</NavLink>,
        key: 'profile'
    },
    {
        name: 'Auth',
        label: <NavLink to="auth">Auth</NavLink>,
        icon: <AiFillLock />,
        key: 'auth'
    }
]

export const SIDEBAR = [
    {
        name: 'Products',
        label: <NavLink end to="/profile">Products</NavLink>,
        icon: <FiPackage />,
        key: 'products'
    },
    {
        name: 'Users',
        label: <NavLink to="/profile/users">Users</NavLink>,
        icon: <AiOutlineUserSwitch />,
        key: 'users'
    }
]