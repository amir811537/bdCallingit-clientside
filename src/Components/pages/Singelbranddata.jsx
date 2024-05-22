import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Singlebrand from "../brandname/Singlebrand";
import Singelcard from "./Singelcard";

const Singelbranddata = () => {
  const routeParams = useParams();
  const { brand } = routeParams || {};
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://electronics-bazar-server.vercel.app/products/${brand}`
      );
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
    getData();
  }, []);

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
            ></Singelcard>
          ))}
        </>
      )}
    </div>
  );
};

export default Singelbranddata;
