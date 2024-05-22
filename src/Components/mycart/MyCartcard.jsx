import React from "react";
import Swal from "sweetalert2";
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

const MyCartcard = ({ singelproduct }) => {

  useEffect(() => {
    AOS.init();
  }, []);

  const {_id, photourl, name, price } = singelproduct;
  const handeldelete =(_id)=>{
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
        //   Swal.fire(
        //     'Deleted!',
        //     'Your added product has been deleted.',
        //     'success'
        //   )

fetch(`https://electronics-bazar-server.vercel.app/user/${_id}`,{
    method:"DELETE",
})
.then(res =>res.json())
.then(data =>{
    console.log(data);
    if(data.deletedCount > 0){
           Swal.fire(
            'Deleted!',
            'Your added product has been deleted.',
            'success'
          )
    }
})
    }
      })
console.log(_id)
  }

  return (
    <div className="container mx-auto px-4 py-8" data-aos="zoom-in-right"
    onMouseEnter={() => AOS.refresh()}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <button onClick={()=>handeldelete(_id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
          delete it
        </button>
      </div>
      <div className="mt-8">
        <div className="flex flex-col md:flex-row border-b border-gray-400 py-4">
          <div className="flex-shrink-0">
            <img
              src={photourl}
              alt="Product image"
              className="w-32 h-32 object-cover"
            />
          </div>
          <div className="mt-4 md:mt-0 md:ml-6">
            <h2 className="text-lg font-bold">{name}</h2>
            <p className="mt-2 text-gray-600">Product Description</p>
            <div className="mt-4 flex items-center">
              <span className="ml-auto font-bold"> Price: {price}</span>
            </div>
          </div>
        </div>
        {/* You can repeat the above structure for multiple products */}
      </div>
    </div>
  );
};

export default MyCartcard;
