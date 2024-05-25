import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Authprovider/Authprovider";
import axios from "axios";

const useAdmin = () => {
const {user}=useContext(AuthContext)

// console.log("===========>",user)
const {data : isAdmin,isPending:isAdminLoading }=useQuery({

    queryKey: [user?.email,'isAdmin'],
    queryFn: async()=>{
        const res =await axios.get(`https://electronics-bazar-server.vercel.app/profileInfo/admin/${user?.email}`);
        console.log("this is admin res",res.data)
        return res.data.admin;
    }
})

    return [isAdmin,isAdminLoading]
};

export default useAdmin;