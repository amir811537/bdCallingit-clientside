import axios from "axios";

 const axiosPublic=axios.create({
    baseURL:'https://electronics-bazar-server.vercel.app'
})
const useAxiosPublic=()=>{
    return axiosPublic;
}
export default useAxiosPublic;