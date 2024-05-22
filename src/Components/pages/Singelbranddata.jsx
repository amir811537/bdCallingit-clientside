import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Singelcard from "./Singelcard";

const Singelbranddata = () => {
  const routeParams = useParams();
  const { brand } = routeParams || {};
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  console.log("-------------------->", brand);

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products/type/${brand}`);
      setProducts(response.data);
      if (response.data.length === 0) {
        setError("There is no data here.");
      }
    } catch (error) {
      console.log("error in data fetching", error);
      setError("Error fetching data.");
    }
  };

  useEffect(() => {
    if (brand) {
      getData();
    }
  }, [brand]);  // Include brand in the dependency array

  return (
    <div className="grid mx-6 gap-5 my-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {error ? (
        <div className="text-center">
          <p>{error}</p>
        </div>
      ) : (
        <>
          {products.map((singlecard) => (
            <Singelcard
              key={singlecard._id}
              products={products}
              setProducts={setProducts}
              singlecard={singlecard}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Singelbranddata;
