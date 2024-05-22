/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

const Singlebrand = ({singelbrand}) => {
console.log("========>",singelbrand)
  useEffect(() => {
    AOS.init();
  }, []);

    const { brand_name,brand_image } = singelbrand;
    return (



      <div>
          <Link to={`/singelbranddata/${brand_name}`} className="block">

      <div className="bg-gray-50 rounded-lg shadow-md  items-center justify-center p-9">
    <div className="flex justify-center items-center gap-5">
      <img className=" rounded-lg" src={brand_image} alt="brand img" />
    </div>
    <p className=" lg:my-2 lg:text-xl text-center font-bold">
  {brand_name}
</p>

</div>

</Link>
</div>
    );
};

export default Singlebrand;