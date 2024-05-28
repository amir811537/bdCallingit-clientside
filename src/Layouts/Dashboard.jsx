import { useState } from 'react';
import { Link, NavLink, Outlet } from "react-router-dom";
import { FaShoppingCart, FaUserAlt, FaHome, FaBars } from "react-icons/fa";
import { FcAddImage } from "react-icons/fc";
import { TiSpanner } from "react-icons/ti";
import { FaUserEdit } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../Authprovider/Authprovider";
import useAdmin from "../Hooks/useAdmin";
import { ImCross } from "react-icons/im";
const Dashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    console.log(isAdmin);

    const handleSignOut = () => {
        logOut()
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    if (isAdminLoading) {
        return <span className="loading loading-ring  loading-lg"></span>;
    }

    return (
        <div className="relative min-h-screen md:flex">
            {/* Mobile menu button */}
            <div className="md:hidden flex justify-between items-center bg-orange-500 p-4">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white">
                    <FaBars size={24} />
                </button>
                <div>
                    {user ? (
                     <Link to="/">
                        <button className="text-white" onClick={handleSignOut}>
                            Sign Out
                        </button></Link>
                    ) : (
                        <Link to="/login">
                            <button className="text-white">Login</button>
                        </Link>
                    )}
                </div>
            </div>

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-orange-500 p-4 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out z-50`}>
                <ul className="menu">
                    {isAdmin ? (
                        <>
                            <p className="text-white text-xl text-center font-semibold my-4">Welcome back Admin!</p>
                            <li>
                                <NavLink className="text-white" to="/dashboard/profile">
                                    <FaUserAlt /> Profile
                                    <span className="badge">New</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="text-white" to="/dashboard/AddProduct">
                                    <FcAddImage /> Add items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="text-white" to="/dashboard/ManageItem">
                                    <TiSpanner /> Manage items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="text-white" to="/dashboard/ManageUser">
                                    <FaUserEdit /> Manage Users
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <p className="text-white text-xl text-center font-semibold my-4">Welcome back User!</p>
                            <li>
                                <NavLink className="text-white" to="/dashboard/profile">
                                    <FaUserAlt /> Profile
                                    <span className="badge">New</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="text-white" to="/dashboard/myCart">
                                    <FaShoppingCart /> My Cart
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="text-white" to="/">
                                    <FaHome /> User Home
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
                <hr className="h-px" />
                <div className="flex py-10 items-center gap-2 text-center justify-center">
                    <NavLink className="text-white" to="/">Return Home</NavLink>
                    <FaHome className="text-2xl text-sky-300" />
                </div>


                <div>
                    {user ? (
                     <Link to="/">
                        <button className="text-white bg-red-600 py-3 px-4 rounded-md text-center mx-auto flex" onClick={handleSignOut}>
                          <div className='flex items-center gap-2'> Sign Out <ImCross/></div>
                        </button></Link>
                    ) : (
                        <Link to="/login">
                            <button className="text-white">Login</button>
                        </Link>
                    )}
                </div>
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"></div>}

            {/* Main content */}
            <div className="flex-1 p-4 md:ml-64">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
