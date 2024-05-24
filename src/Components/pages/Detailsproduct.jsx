import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { AuthContext } from "../../Authprovider/Authprovider";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import useCart from "../../Hooks/useCart";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAllReviews from "../../Hooks/useAllReview";

const Detailsproduct = () => {
  const dataapi = useLoaderData();

  const [refetch] = useCart();

  const axiousPublic = useAxiosPublic();
  // console.log(dataapi)
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [allReviews, reReviewFetch] = useAllReviews();

  const singledata = dataapi.find((singledata) => singledata._id === id);
  // console.log(singledata);
  const { _id, photourl, name, brandname, type, price, rating } = singledata;

  // const [cart,setCarts]=useState([])

  const user1 = useContext(AuthContext);

  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});

  const handeladdtocart = async (data1) => {
    const payload = {
      photourl: data1?.photourl,
      name: data1?.name,
      brandname: data1?.brandname,
      type: data1?.type,
      price: data1?.price,
      rating: data1?.rating,
      email: user1?.user?.email,
    };
    try {
      const response = await axiousPublic.post("/userCart", payload);
      // console.log(response?.data)

      if (response?.data?.insertedId) {
        Swal.fire("Good job!", "added to cart !", "success");
        refetch();

        // alert('')
      }
    } catch (error) {
      console.log("add product api error", error);
    }
  };

  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleReaction = async (reviewId, reaction) => {
    try {
      const response = await axiousPublic.post("/updateReviewReaction", {
        reviewId,
        reaction,
      });

      if (response.data.success) {
        if (reaction === "like") {
          setLikes((prev) => ({
            ...prev,
            [reviewId]: (prev[reviewId] || 0) + 1,
          }));
        } else {
          setDislikes((prev) => ({
            ...prev,
            [reviewId]: (prev[reviewId] || 0) + 1,
          }));
        }
      }
    } catch (error) {
      console.error("Error updating reaction:", error);
    }
  };

  // submit the modal form data and post he data mongoDb
  const onSubmit = async (data) => {
    console.log(data);

    try {
      console.log(user?.displayURL);
      const allReviewData = {
        review: data.description,
        rating: data.rating,
        reviewID: _id,
        reviewDate: new Date().toLocaleDateString(),
        reviewTime: new Date().toLocaleTimeString(),
        userEmail: user?.email,
        userImage: user?.photoURL,
      };

      const res = await axiousPublic.post("/allRewiews", {
        allReviewData,
      });

      if (res.data.insertedId) {
        reReviewFetch();
        setOpen(false);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Your review added successfully",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "you alreay added your review!",
        });
      }
    } catch (error) {
      console.error("Error requesting added review:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "you alreay added your review!",
      });
    }
  };

  // filter the data using the _id=== reviewID

  useEffect(() => {
    const filteredData = allReviews.filter(
      (review) => review?.reviewData?.reviewID === _id
    );
    setFilteredReviews(filteredData);
  }, [allReviews, _id]);

  // console.log(id,dataapi)
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="grid gap-8 sm:grid-cols-2">
          {/* <!-- image - start --> */}
          <div className="h-80 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto">
            <img
              src={photourl}
              loading="lazy"
              alt="Photo "
              className=" h-full w-full lg:mx-auto object-cover object-center"
            />
          </div>
          {/* <!-- image - end --> */}

          {/* <!-- content - start --> */}
          <div className="flex flex-col items-center justify-center sm:items-start md:py-24 lg:py-32">
            <p className="mb-4 text-sm font-semibold uppercase text-indigo-500 md:text-base">
              {brandname}
            </p>
            <h1 className="mb-2 text-center text-2xl font-bold text-gray-800 sm:text-left md:text-3xl">
              {name}
            </h1>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              <button className="flex items-center justify-evenly">
                <span className="font-bold">Rating: </span>
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  {/*  use [...Array(5)] to create an array with 5 elements, as i want to display 5 stars. */}
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${
                        parseInt(rating) > index
                          ? "text-yellow-300"
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
              </button>
            </span>

            <p className="mb-4 text-center font-semibold text-orange-400 sm:text-left md:mb-8 md:text-lg">
             {price} <span className="text-2xl"> ৳ </span>
            </p>
            <p className="mb-4 text-center text-gray-500 sm:text-left md:mb-8 md:text-lg">
              Category: {type}
            </p>

            <nav className="flex gap-4 sm:block sm:space-y-1 md:space-y-2">
              <div>
                <Link to="/mycart">
                  <div
                    onClick={() => handeladdtocart(singledata)}
                    className="inline-block text-sm text-indigo-500 transition duration-100
                   hover:text-indigo-600 active:text-indigo-700 md:text-base"
                  >
                    <button className="btn-ghost p-3 rounded">
                      Add to cart
                    </button>
                  </div>{" "}
                </Link>

                <div className="shadow rounded-lg w-full mt-8 p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold">
                      Reviews({filteredReviews.length} +)
                    </h3>
                    <button
                      className="uppercase w-fit border border-[#09BE51] bg-[#09BE51] hover:bg-transparent text-white py-1 text-lg px-6 md:ml-8 hover:border hover:border-[#09BE51] hover:text-[#09BE51] duration-300 cursor-pointer"
                      onClick={() => setOpen(true)}
                    >
                      Review
                    </button>
                    {/* <!-- Modal toggle --> */}
                    <Modal open={open} onClose={() => setOpen(false)}>
                      <form
                        className="p-4 md:p-5"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="grid gap-4 mb-4">
                          <div className="h-auto w-96">
                            <label
                              htmlFor="description"
                              className="block mb-2 text-sm text-center font-medium text-gray-900 dark:text-white"
                            >
                              Write your review here
                            </label>
                            <div className="text-center">
                              <div className="rating">
                                <input
                                  type="radio"
                                  value="1"
                                  className="mask mask-star-2 bg-orange-400"
                                  {...register("rating", {
                                    required: "Rating is required",
                                  })}
                                />
                                <input
                                  type="radio"
                                  value="2"
                                  className="mask mask-star-2 bg-orange-400"
                                  {...register("rating", {
                                    required: "Rating is required",
                                  })}
                                />
                                <input
                                  type="radio"
                                  value="3"
                                  className="mask mask-star-2 bg-orange-400"
                                  {...register("rating", {
                                    required: "Rating is required",
                                  })}
                                />
                                <input
                                  type="radio"
                                  value="4"
                                  className="mask mask-star-2 bg-orange-400"
                                  {...register("rating", {
                                    required: "Rating is required",
                                  })}
                                />
                                <input
                                  type="radio"
                                  value="5"
                                  className="mask mask-star-2 bg-orange-400"
                                  {...register("rating", {
                                    required: "Rating is required",
                                  })}
                                />
                              </div>
                            </div>
                            <textarea
                              id="description"
                              rows={4}
                              {...register("description", {
                                required: "Description is required",
                              })}
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Write your review here"
                            ></textarea>
                            {errors.rating && (
                              <span className="text-red-500">
                                {errors.rating.message}
                              </span>
                            )}
                            {errors.description && (
                              <span className="text-red-500">
                                {errors.description.message}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <button
                            type="submit"
                            className="uppercase border border-[#09BE51] bg-[#09BE51] hover:bg-transparent text-white py-1 text-lg px-6 hover:border hover:border-[#09BE51] hover:text-[#09BE51] duration-300 cursor-pointer"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </Modal>
                  </div>
                  <div>
                    {/* maping the filter review data  */}
                    <div>
                      {filteredReviews.map((review) => (
                        <div
                          key={review._id}
                          className="py-8 border-b-2 border-gray-400"
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <img
                                className="w-12 h-12 rounded-full"
                                src={review.reviewData.userImage}
                                alt=""
                              />
                              <div>
                                <h2 className="font-semibold">
                                  {review.reviewData.userEmail}
                                </h2>
                                <h3 className="text-sm text-gray-500">
                                  {review.reviewData.reviewDate}
                                </h3>
                              </div>
                            </div>
                            <div className="flex flex-col items-center">
                              <span className="text-gray-600 mb-1">
                                Rating:
                              </span>
                              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                {[...Array(5)].map((_, index) => (
                                  <svg
                                    key={index}
                                    className={`w-4 h-4 ${
                                      parseInt(review.reviewData.rating) > index
                                        ? "text-yellow-300"
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
                             
                            </div>
                            
                          </div>
                          
                          <div className="mt-4">
                            <p>{review.reviewData.review}</p>

                            <div className=" mr-5 text-right">
                            <h3 className="hover:text-green-600 hover:underline"> Replay</h3>
                          </div>
                            <div className="flex space-x-4 mt-2">
                              <button
                                onClick={() =>
                                  handleReaction(review._id, "like")
                                }
                                className="text-sm text-blue-500"
                              >
                                👍 (
                                {likes[review._id] ||
                                  review.reviewData.likes ||
                                  0}
                                )
                              </button>
                              <button
                                onClick={() =>
                                  handleReaction(review._id, "dislike")
                                }
                                className="text-sm text-red-500"
                              >
                                👎 (
                                {dislikes[review._id] ||
                                  review.reviewData.dislikes ||
                                  0}
                                )
                              </button>
                            </div>
                        
                          </div>
                         
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
    </div>
  );
};

export default Detailsproduct;
