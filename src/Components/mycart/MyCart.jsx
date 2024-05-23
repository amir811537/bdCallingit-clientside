/* eslint-disable react-hooks/exhaustive-deps */
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../Authprovider/Authprovider";
import MyCartcard from "./MyCartcard";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useCart from "../../Hooks/useCart";

const MyCart = () => {
    // const axiosPublic =useAxiosPublic()
    // const [product,setProduct]=useState([]);
    const [ userCart ,refetch]=useCart()
 
    return (
        <div className="grid mx-6 gap-5 my-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-2">
        
            {userCart.length>0? userCart.map(singelproduct  =><MyCartcard key={singelproduct._id} deletefetch={refetch} singelproduct={singelproduct}></MyCartcard>):<h1>Sorry No Data Found!</h1>
   
}

        </div>
    );
};

export default MyCart;