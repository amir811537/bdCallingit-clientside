import { useEffect, useState } from "react";
import axios from "axios";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Link } from "react-router-dom";

const Newarrival = () => {




    const [products, setProducts] = useState([]);
  
    const getData = async () => {
      try {
        const response = await axios.get("https://electronics-bazar-server.vercel.app/products");
        setProducts(response.data);
      } catch (error) {
        console.log("error in data fetching", error);
      }
    };
  
    useEffect(() => {
      getData();
    }, []);


    return (
      <div>
      <br />
      <Swiper watchSlidesProgress={true} slidesPerView={3} className="mySwiper">
          {products.map(product => (
              <SwiperSlide key={product._id}>
                  <div className="flex flex-col justify-center items-center">
                      <img className="w-1/2" src={product.photourl} alt={product.name} />
                      <p>{product.name}</p>
                      <Link className="flex items-center gap-2 justify-between" to={`/products/${product._id}`}>
            <button className="bg-orange-500  border-orange-500 text-sm p-1 border text-white rounded-3xl">৳{product.price}</button>
<button className="bg-orange-500  border-orange-500 text-sm p-1 border text-white rounded-3xl">buy now</button>
            </Link>                     
                  </div>

 

              </SwiperSlide>
          ))}
          <div className="flex justify-center my-10">
          <button className="hover:bg-orange-500  border-orange-500 text-orange-500 text-xl border  hover:text-white rounded-3xl px-6 py-3">Show More </button>

          </div>
      </Swiper>
  </div>
    );
};

export default Newarrival;