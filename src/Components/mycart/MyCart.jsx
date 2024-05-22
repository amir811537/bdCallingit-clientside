import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authprovider/Authprovider";
import MyCartcard from "./MyCartcard";

const MyCart = () => {
    const [product,setProduct]=useState([]);
    const user=useContext(AuthContext);
    useEffect(()=>{
      if(user?.user?.email){
        getProdcut()
      }
    
    },[user,product])

    const getProdcut=async()=>{
      
        
        try {
            const res=await axios.get(`https://electronics-bazar-server.vercel.app/userProduct/${user?.user?.email}`,)
           setProduct(res.data)
            
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="grid mx-6 gap-5 my-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-2">
        
            {product.length>0? product.map(singelproduct  =><MyCartcard key={singelproduct.ID} singelproduct={singelproduct}></MyCartcard>):<h1>Sorry No Data Found!</h1>
   
}

        </div>
    );
};

export default MyCart;