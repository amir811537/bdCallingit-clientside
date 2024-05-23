import axios from "axios";
import { useEffect, useState } from "react";
import Singelcard from "./Singelcard";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Alldata = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(12);
  const { register, handleSubmit } = useForm();
  const [searchParams, setSearchParams] = useState({ search: "", type: "" });


  const getData = async (page = 1, searchParams = {}) => {
    try {
      const response = await axios.get(`http://localhost:5000/products`, {
        params: {
          page: page,
          limit: usersPerPage,
          name: searchParams.search,
          type: searchParams.type,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.log("error in data fetching", error);
    }
  };

  useEffect(() => {
    getData(currentPage, searchParams);
  }, [currentPage, searchParams]);

  const onSubmit = async (data) => {
    setSearchParams({ search: data.search, type: data.domain });
    setCurrentPage(1); // Reset to first page on new search
  };

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <div>
      <div className="flex justify-center items-center py-7">
        <form className="flex flex-col md:flex-row gap-3" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            required
            placeholder="Search Product Name..."
            className="w-full md:w-80 px-3 rounded-l border-2 border-sky-500 focus:outline-none focus:border-sky-500"
            {...register("search")}
          />
          <select
            className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
            {...register("domain")}
          >
            <option value="">Select Type</option>
            <option value="Phone">Phone</option>
            <option value="Computer">Computer</option>
            <option value="Headphone">Headphone</option>
            <option value="Laptop">Laptop</option>
            <option value="Smart_Watch">Smart Watch</option>
            <option value="Tab">Tab</option>
          </select>
          <button
            type="submit"
            className="bg-sky-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1"
          >
            Search
          </button>
        </form>
      </div>

      <div className="grid gap-5 my-10 p-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {products.length > 0 ? (
          products.map((singlecard) => (
            <Singelcard
              key={singlecard._id}
              products={products}
              setProducts={setProducts}
              singlecard={singlecard}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No data found</p>
        )}
      </div>
      
      <div className="flex justify-center my-10 items-center gap-3">
        <button onClick={prevPage} disabled={currentPage === 1}>
          <FaArrowLeft className="text-2xl" />
        </button>
        <p>Page {currentPage}</p>
        <button onClick={nextPage}>
          <FaArrowRight className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Alldata;
