// import useTheme from "../../darkmode/Darkmode";
import Brand from "../brandname/Brand";
import Alldata from "./Alldata";
import Banner from "./Banner";
import Extrasection from "./Extrasection";
import Newarrival from "./Newarrival";
import SecondExtra from "./SecoundExtra";

const Home = () => {
    //  function ThemBotton(){
    //     const {toggleTheme}=useTheme()
    //  }
    return (
        <div>
<div className="py-3">
    
<Banner></Banner>


    </div>  
    <div className=" py-9 mt-5">
    <h2 className="text-xl md:text-3xl font-bold text-orange-500 lg:text-5xl text-center" >Leading highlighter Brands: Unleash Innovation with our Diverse brand Selection!</h2>
    </div>
     
    <Brand></Brand>     

            
            <div className=" py-8 text-center font-bold  text-xl lg:text-5xl">
            New Arrival
            </div>
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"/>

            {/* new arival card  */}
            <Newarrival></Newarrival>
            
            {/* <div className=" py-8 text-center font-bold  text-xl lg:text-5xl">
            Best Selling
            </div>
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"/>

            <Alldata></Alldata> */}
            <div>
<SecondExtra></SecondExtra>

            </div>
            <div className="py-6">
                <Extrasection></Extrasection>
            </div>
        </div>
    );
};

export default Home;