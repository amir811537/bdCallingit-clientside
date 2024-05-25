import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Authprovider/Authprovider";

const Profile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const {user} = useContext(AuthContext);
    const [userData, setUserData] = useState([]);

  

    const userInfo = async () => {
        try {
            const res = await axios.get(`https://electronics-bazar-server.vercel.app/profileInfo/${user?.email}`);
            setUserData(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false); 
        }
    };
    useEffect(() => {
        userInfo();
    }, [user]);

  console.log("thsi is user data ",userData)

    const handleUpdateInfo = () => {
        // Pass user information as state during navigation
        navigate(`/dashboard/updateprofileInfo/${userData[0]._id}`,{ state: userData[0] });
    };

    return (
        <div className="w-full justify-center">
            {loading ? (
                <span className="loading loading-spinner loading-lg"></span>
            ) : (
                <div className="">
                    <div className="bg-white  rounded-lg py-3">
                        <div className=" p-2">
                            <img className="w-32 h-32 rounded-full mx-auto" src={user.photoURL?user.photoURL:userData[0].userimg} alt="John Doe"/>
                        </div>
                        <div className="p-2 text-center">
                            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{`${userData[0]?.name||''}`}</h3>
                            <div className="text-center text-gray-400 text-xs font-semibold">
                                <p>{userData[0].role}</p>
                            </div>
                            <div className="my-3">
                                <div className="flex items-center mb-2">
                                    <div className="w-1/3 text-gray-500 font-semibold">Gmail:</div>
                                    <div className="w-2/3 text-red-500"><p>{user.email}</p></div>
                                </div>
                                <div className="flex items-center mb-2">
                                    <div className="w-1/3 text-gray-500 font-semibold">Address</div>
                                    <div className="w-2/3">{userData[0].address} </div>
                                </div>
                           
                                <div className="flex items-center mb-2">
                                    <div className="w-1/3 text-gray-500 font-semibold">Mobile</div>
                                    <div className="w-2/3">{userData[0].mobile}</div>
                                </div>
                                <div className="flex items-center mb-2">
                                    <div className="w-1/3 text-gray-500 font-semibold">Add social link</div>
                                    <div className="w-2/3">{userData[0].sociallink}</div>
                                </div>
                            </div>
                            <button onClick={handleUpdateInfo} className="underline text-blue-600">
                                Update your information
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
