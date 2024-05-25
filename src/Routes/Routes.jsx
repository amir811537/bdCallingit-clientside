import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layouts/Mainlayout";
import Home from "../Components/pages/Home";
import AddProduct from "../Components/pages/AddProduct";
import MyCart from "../Components/mycart/MyCart";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import ErrorPage from "../Components/pages/ErrorPage";
import Alldata from "../Components/pages/Alldata";
import Updateproduct from "../Components/pages/Updateproduct";
import Singelbranddata from "../Components/pages/Singelbranddata";
import PrivateRoute from "./PrivateRoute";
import Detailsproduct from "../Components/pages/Detailsproduct";
import ContactUs from "../Components/pages/ContactUs";
import Dashboard from "../Layouts/Dashboard";
import ManageItems from "../Layouts/ManageItems";
import ManageUser from "../Layouts/ManageUser";
import Profile from "../Layouts/Profile";
import UpdateProfileInfo from "../Layouts/UpdateProfileInfo";
import DashboardHome from "../Layouts/DashboardHome";
// import Singelcard from "../Components/pages/Singelcard";

const router=createBrowserRouter([
    {
        path:'/',
        element:<Mainlayout></Mainlayout>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path: "/AddProduct",
                element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>
            },
            {
                path: "/myCart",
                element:<PrivateRoute> <MyCart></MyCart></PrivateRoute>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path:"/register",
                element:<Register></Register>
            },
            {
                path:'/alldata',
                element:<Alldata></Alldata>,
            },
            {
                path:'/updateproduct/:id',
                element:<PrivateRoute><Updateproduct></Updateproduct></PrivateRoute>,
                loader:({params})=>fetch(`https://electronics-bazar-server.vercel.app/productsbyid/${params.id}`)
            },
            {
                path:'/singelbranddata/:brand',
                element:<Singelbranddata></Singelbranddata>
            },
            {
                path:'/products/:id',
                element:<PrivateRoute><Detailsproduct></Detailsproduct></PrivateRoute>,
                loader:()=>fetch('https://electronics-bazar-server.vercel.app/products')
            },
            {
                path:'/contacts',
                element:<ContactUs></ContactUs>
            }
            
        ]
    },
    {
        path:"dashboard",
        element:<Dashboard></Dashboard>,
        children:[
            {
                path:'myCart',
                element:<MyCart></MyCart>
            },
            {
                path: "AddProduct",
                element: <AddProduct></AddProduct>
            },
            {
                path:"ManageItem",
                element:<ManageItems></ManageItems>
            },
            {
                path:"ManageUser",
                element:<ManageUser></ManageUser>
            },
            {
                path:'profile',
                element:<Profile></Profile>
            },
            {
                path:'updateprofileInfo/:id',
                element:<UpdateProfileInfo></UpdateProfileInfo>,
                loader:()=>fetch('hhttps://electronics-bazar-server.vercel.app/profileInfo')
            },

            {
                path:'dashboardHome',
                element:<DashboardHome></DashboardHome>,
            }
                    ]
    }
]);
export default router;