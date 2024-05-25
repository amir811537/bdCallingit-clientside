import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageUser = () => {
  const { data: profileInfo = [], refetch } = useQuery({
    queryKey: ["profileInfo"],
    queryFn: async () => {
      const res = await axios.get("hhttps://electronics-bazar-server.vercel.app/profileInfo");
      return res.data;
    },
  });

  const hadelDeleteUser = (profile) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //   Swal.fire(
        //     'Deleted!',
        //     'Your added product has been deleted.',
        //     'success'
        //   )

        fetch(`hhttps://electronics-bazar-server.vercel.app/profileInfo/${profile._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Profile has been deleted.", "success");
            }
          });
      }
    });
  };


  const hadelMakeAdmin = async (profile) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    });
  
    if (result.isConfirmed) {
      try {
        const res = await axios.patch(`hhttps://electronics-bazar-server.vercel.app/profileInfo/admin/${profile._id}`);
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
            refetch(); 
          
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${profile.name} is now an admin`,
            showConfirmButton: false,
            timer: 2500
          });
        }
      } catch (error) {
        console.error("Error making user admin:", error);
      }
    }
  };
  

  return (
    <div>
      <div className="flex justify-evenly my-7">
        <h2 className="text-3xl">All users</h2>
        <h2 className="text-3xl">Total Users : {profileInfo.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {profileInfo.map((profile, index) => (
              <tr key={profile._id}>
                <th>{index + 1}</th>
                <td>{profile.name}</td>
                <td>{profile.email}</td>
                <td>
{  profile.role ==="admin" ? "Admin" :                <button
                    onClick={() => hadelMakeAdmin(profile)}
                    className="btn bg-orange-500  btn-lg"
                  >
                    <FaUsers className="text-white font-bold"></FaUsers>
                  </button>}
                </td>
                <td>
                  <button
                    onClick={() => hadelDeleteUser(profile)}
                    className="btn  btn-ghost btn-lg"
                  >
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;