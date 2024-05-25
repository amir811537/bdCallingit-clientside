import  { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../Authprovider/Authprovider";
const image_hostion_api = "https://api.imgbb.com/1/upload?key=1d6fdf8c502424c419510b9f0a67a7f8";


const UpdateProfileInfo = () => {


    const {user}=useContext(AuthContext)

// const singleProfileInfo=useLoaderData()
const location = useLocation();
const singleProfileInfo = location.state;
const navigate = useNavigate();
const [loading, setLoading] = useState(true);
const { name,mobile,sociallink,address } = singleProfileInfo;

useEffect(() => {
  // Use userInformation
  // console.log("User Information:", singleProfileInfo);
  setLoading(false);
}, []);



const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();




const onSubmit = async (data) => {
  try {
    const imageFile = { image: data.image[0] };
    const imageUploadRes = await axios.post(image_hostion_api, imageFile, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (imageUploadRes.data.success) {
      const profileUpdates = {
        name: data.name,
        email: data.email,
        address: data.address,
        mobile: data.mobile,
        sociallink: data.sociallink,
        userimg: imageUploadRes.data.data.display_url,
        role:"user"
        // Add other fields as needed
        // Assuming you have stored the user's ID in singleProfileInfo._id
      };

      const patchRes = await axios.patch(`https://electronics-bazar-server.vercel.app/profileInfo/${singleProfileInfo._id}`, profileUpdates);
      console.log("============>",patchRes)

      if (patchRes.data) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title:  "Your Profile update successful.",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/dashboard/profile')
      }
    }
  } catch (error) {
    console.log(error);
  }
};



















return (
  <div>
    {loading ? (
      <span className="loading loading-spinner loading-lg"></span>
    ) : (
      <div>
        {/* Your update form and UI here */}
        <div className="h-full">
          <div className="mx-auto">
            <div className="flex justify-center px-6 py-12">
              {/* <!-- Col --> */}
              <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 rounded-lg ">
                <h3 className="text-2xl text-center text-gray-800 dark:text-white">
                  Update Your Profile
                </h3>

                <form
                  className=" bg-white dark:bg-gray-800 rounded"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="mb-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="name"
                    >
                      Name:
                    </label>
                    <input
                      {...register("name")}
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      name="name"
                      required
                      defaultValue={name}
                      type="text"
                      placeholder="Enter Your Name..."
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="email"
                    >
                      Email:
                    </label>
                    <input
                      {...register("email")}
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      name="email"
defaultValue={user?.email}
disabled
                      type="text"
                      placeholder="Enter Your email..."
                    />
                  </div>


                  <div className="mb-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="address"
                    >
                      Adress
                    </label>
                    <input
                      {...register("address")}
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      name="address"
                      required
                      defaultValue={address}
                      type="text"
                      placeholder="Enter Your address"
                    />
                  </div>

                  <div className="mb-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="mobile"
                    >
                      Mobile No
                    </label>
                    <input
                      {...register("mobile")}
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      name="mobile"
                      required
                      defaultValue={mobile}
                      type="number"
                      placeholder="Enter Your mobile num"
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="sociallink"
                    >
                      Add social link
                    </label>
                    <input
                      {...register("sociallink")}
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      name="sociallink"
                      required
                      defaultValue={sociallink}
                      type="text"
                      placeholder="Enter Your social link"
                    />
                  </div>


        

                  <div className="form-control w-full py-3 mb-2 max-w-xs">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="image"
                    >
                      Update Profile Picture:(150 x 150 pixels)
                    </label>
                    <input
                      {...register("image", { required: true })}
                      type="file"
                      className="file-input w-full "
                    />
                    {errors.image?.type === "required" && (
                      <p className="text-red-600" role="alert">
                        image  is required
                      </p>
                    )}
                  </div>

                  {/* Add more form fields as needed */}

                  <div className="mb-6 text-center">
                    <button
                      className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Update Information
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Use userInformation data to pre-fill form fields or display information */}
      </div>
    )}
  </div>
);







};

export default UpdateProfileInfo;