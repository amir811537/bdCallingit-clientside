import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../Authprovider/Authprovider";

const useCart = () => {
const {user}=useContext(AuthContext);

    const axiosPublic =useAxiosPublic()
//   transtack queary 
const {refetch,data: userCart=[] }=useQuery({
queryKey: ['userCart',user?.email],
queryFn: async ()=>{
    const res = await axiosPublic.get(`/userCart/${user?.email}`)
    return res.data;
}
})
return [userCart,refetch]
};

export default useCart;