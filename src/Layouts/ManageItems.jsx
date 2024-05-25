import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageItems = () => {
    const [courses, setCourses] = useState([]);


    const handeldelete = (_id) => {
        // console.log(_id);
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
            fetch(`https://electronics-bazar-server.vercel.app/products/${_id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                // eslint-disable-next-line react/prop-types
                setCourses(courses.filter((card) => card._id !== _id))
    
                Swal.fire("Deleted!", "Your product has been deleted.", "success");
                // if (data.deletedCount > 0) {
              
                // }
              });
          }
        });
      };






    const getData = async () => {
        try {
          const response = await axios.get("https://electronics-bazar-server.vercel.app/products");
          setCourses(response.data);
        } catch (error) {
          console.log("error in data fetching", error);
        }
      };
      useEffect(() => {
        getData();
      }, []);

    return (
        <div>
        <div className="flex justify-evenly my-7">
          <h2 className="text-3xl">All courses</h2>
          <h2 className="text-3xl">Total Courses : {courses.length}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>Edit Product</th>
                <th>Delete Product</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={course._id}>
                  <th>{index + 1}</th>
                  <td>{course.name}</td>

                  <td>
                  <Link to={`/updateproduct/${course._id}`}>
              <button className="flex items-center"> <AiOutlineEdit></AiOutlineEdit>Edit</button>
            </Link>
                  </td>


                  <td>
                    <button
                      onClick={() => handeldelete(course._id)}
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

export default ManageItems;