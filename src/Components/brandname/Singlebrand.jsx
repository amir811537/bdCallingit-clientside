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

      <div className="bg-gray-50 rounded-lg shadow-md flex items-center justify-center p-9">
    <div className="flex justify-center items-center gap-5">
      <img className="w-2/6 rounded-lg" src={brand_image} alt="brand img" />
    </div>
</div>
</Link>
</div>
    );
};

export default Singlebrand;