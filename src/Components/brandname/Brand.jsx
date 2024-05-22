import { useEffect, useState } from "react";
import Singlebrand from "./Singlebrand";

const Brand = () => {

    const [brands, setBrands] = useState([]); 
    useEffect(() => {
        fetch('https://electronics-bazar-server-amir811537.vercel.app/brand')
            .then(res => res.json())
            .then(data => setBrands(data)); 
        
    }, []);

    // console.log(brands)

    return (
        <div className="grid mx-6 gap-5 my-10 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">


        {
    brands.map(singelbrand  =><Singlebrand key={singelbrand.ID} singelbrand={singelbrand}></Singlebrand>)
}


        </div>
   
    );
};

export default Brand;