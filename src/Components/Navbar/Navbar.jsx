// import { useContext } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { AuthContext } from "../../Authprovider/Authprovider";
// import { AiFillHome } from "react-icons/ai";
// import { SlLogin } from "react-icons/sl";
// import { MdAddBusiness } from "react-icons/md";
// import { HiShoppingBag } from "react-icons/hi";
// import { CiSearch } from "react-icons/ci";
// import { FaRegUser } from "react-icons/fa";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import CartcountBadge from "./CartcountBadge";
/* eslint-disable react/no-unescaped-entities */
import { Link, NavLink } from "react-router-dom";
import { RiMenu3Line } from "react-icons/ri";
import { useContext } from "react";
import { AuthContext } from "../../Authprovider/Authprovider";
import { FaCircleUser } from "react-icons/fa6";
import useCart from "../../Hooks/useCart";
// import MyCart from "../mycart/MyCart";
const Navbar = () => {
  const { logOut, user } = useContext(AuthContext);
const [userCart]=useCart()
  const handelsingout = () => {
    logOut()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const navlinks = (
    <>
      <li>
        <NavLink className=" text-xl text-[#00FFA7]" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className=" text-xl text-[#00FFA7]" to="/AddProduct">
          Add product
        </NavLink>
      </li>
      <li>
        <NavLink className=" text-xl  hover:text-[#00FFA7]" to="/alldata">
          Products
        </NavLink>
      </li>
      <li>
        <NavLink
          className=" text-xl   hover:text-[#00FFA7]"
          to="/contacts"
        >
          Contacts
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar flex items-center  md:justify-evenly p-8 h-24 w-full ">
      <div className="flex justify-between items-center">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <RiMenu3Line className=" text-2xl" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box text-black lg: w-52"
          >

  <div className="flex-none">
    <div className="dropdown">
<Link to='/myCart'>

<div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span className="badge badge-sm indicator-item">{userCart?.length}</span>
        </div>
      </div>
</Link>
    </div>
      </div>

            {navlinks}
            {user ? (
            
                <button
                  className="btn border btn-outline"
                  onClick={handelsingout}
                >
                 <FaCircleUser/> Sign Out
                </button>
             
            ) : (
           
                <Link to="/login">
                  <button className="btn border btn-outline">Login</button>
                </Link>
             
            )}

           
          </ul>
        </div>

        <Link to="/">
        <h2 className="text-xl mr-14 uppercase font-semibold">Greenmind</h2>
        </Link>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-black lg:">
            {navlinks}
          </ul>
        </div>

        <div className=" hidden lg:flex lg:ml-32">
        <div className="flex-none mr-4">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
<Link to='/myCart'>
<span className="badge badge-sm indicator-item">{userCart?.length}</span>

</Link>
        </div>
      </div>
      <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="font-bold text-center text-lg">{userCart?.length} Items</span>
          <div className="card-actions">


<button className="btn btn-primary btn-block"><Link to='/myCart'>View cart</Link></button>
        </div>
        </div>
      </div>
    </div>
      </div>
          {user ? (
            
              <button
                className="btn border btn-outline"
                onClick={handelsingout}
              >
 <FaCircleUser className="text-xl" /> Sign Out              </button>
          
          ) : (
            
              <Link to="/login">
                <button className="btn border btn-outline">Login</button>
              </Link>
          
          )}
        
        </div>
      </div>
    </div>
  );
};

export default Navbar;
