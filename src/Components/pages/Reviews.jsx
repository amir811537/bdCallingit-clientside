/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react";
import axios from "axios";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const Reviews = () => {

    const [reviews, setReviews] = useState([]);
  
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/allRewiews");
        setReviews(response.data);
      } catch (error) {
        console.log("error in data fetching", error);
      }
    };
  
    useEffect(() => {
      getData();
    }, []);

    return (
      <div>
        <div>
            <h2 className="text-left text-2xl lg:text-3xl font-semibold pl-6"> What customers say about <br /> GREEMIND?</h2>
        </div>
        <br />
        <Swiper 
          watchSlidesProgress={true} 
          slidesPerView={1} 
          spaceBetween={10} 
          breakpoints={{
            // when window width is >= 640px
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 3,
              spaceBetween: 20, 
            },
          }} 
          className="mySwiper"
        >
          {reviews.map(review => (
            <SwiperSlide key={review._id} className="mb-4 lg:mb-0">
              <div className="flex flex-col gap-6 lg:gap-8 justify-center items-center">  {/* Adjusted gap */}
                <div className="flex flex-col justify-between rounded-md bg-[#C1DCDC] p-8 shadow-sm max-w-sm mx-auto mt-24">

                  {/* <!-- stars --> */}
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-4 h-4 ${
                          parseInt(review.reviewData.rating) > index
                            ? "text-violet-500"
                            : "text-gray-200 dark:text-gray-600"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                  </div>

                  <p className="my-4 mb-0 text-base font-normal leading-relaxed tracking-wide">
                    <span className="text-2xl font-bold">"</span>
                    {review.reviewData.review}
                    <span className="text-2xl font-bold">"</span>
                  </p>
                  <p>Review Date: {review.reviewData.reviewDate}</p>
                  <p>Review Time: {review.reviewData.reviewTime}</p>

                  <div className="mt-6 flex items-center gap-6">
                    <div className="h-10 w-10 overflow-hidden rounded-full shadow-sm outline-neutral-800">
                      <div className="relative inline-block overflow-hidden rounded-lg border-neutral-800">
                        <img alt="" src={review.reviewData.userImage} />
                      </div>
                    </div>
                    <div>
                      <p className="leading-relaxed tracking-wide">{review.reviewData.userEmail}</p>
                      <p className="text-xs leading-relaxed tracking-wide">User ID: {review.reviewData.reviewID}</p>
                      <p className="text-sm leading-relaxed tracking-wide">Youtuber</p>
                    </div>
                  </div>

                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
};

export default Reviews;
