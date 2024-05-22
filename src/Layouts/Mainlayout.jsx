import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";

const Mainlayout = () => {
    return (
        <div className=""> 
             {/* data-theme='dark' */}
            <Navbar></Navbar>
         <div className="max-w-7xl mx-auto"><Outlet></Outlet></div>
            <Footer></Footer>
        </div>
    );
};

export default Mainlayout;