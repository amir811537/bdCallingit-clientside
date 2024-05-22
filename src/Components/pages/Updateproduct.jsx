import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Updateproduct = () => {
  const product = useLoaderData();
  const { _id, photourl, brandname, name, price, rating, type } = product;
  console.log("==========>>>>>",product);


  const handelupdateproduct = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const photourl = form.get("imgage");
    const name = form.get("name");
    const brandname = form.get("Brandname").toLowerCase();

    const type = form.get("type");
    const price = form.get("price");

    const rating = form.get("rating");

    const updatedProduct = { _id, photourl, name, brandname, type, price, rating };
  
fetch(`https://electronics-bazar-server.vercel.app/products/${_id}`,{
  method:"PUT",
  headers:{
    "Content-Type":"application/json",

  },
  body:JSON.stringify(updatedProduct),

})
.then((res)=>res.json())
.then((data)=>{
  console.log(data)

    Swal.fire({
        title:'Success!',
        text: 'prduct updated successfully',
        icon: 'success',
        confirmButtonText: 'Cool'
    })
  
  
})

  };



  return (
    <div className="bg-cover bg-center min-h-screen flex justify-center items-center bg-image">
        
      <div className="flex justify-center items-center h-[100vh] ">

        <form onSubmit={handelupdateproduct}>
        <h1 className="py-9">Update your product {name}</h1>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="imgage"
                defaultValue={photourl}
                id=""
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
           border-0 border-b-2 border-gray-300 appearance-none dark:text-white
            dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute
            text-sm text-gray-500 dark:text-gray-400 duration-300 
            transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0
             peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter your photourl
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="name"
                defaultValue={name}
                id="floating_company"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_company"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="Brandname"
                defaultValue={brandname}
                id="floating_company"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_company"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Brand Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <div className="relative">
                <select
                  name="type"
                  defaultValue={type}
                  id="floating_company"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0
        border-b-2 border-gray-300 appearance-none
         dark:text-white dark:border-gray-600 dark:focus:border-blue-500
          focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                >
                  <option selected disabled>
                    Type
                  </option>
                  <option value="Phone">Phone</option>
                  <option value="Computer">Computer</option>
                  <option value="Headphone">Headphone</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Smart_Watch">Smart_Watch</option>
                  <option value="Tab">Tab</option>
                  {/* <!-- Add more options as needed --> */}
                </select>
                <label
                  htmlFor="floating_company"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                ></label>
              </div>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="price"
                defaultValue={price}
                id="floating_company"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_company"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Price
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                defaultValue={rating}
                name="rating"
                id="floating_company"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_company"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Rating
              </label>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Updateproduct;
