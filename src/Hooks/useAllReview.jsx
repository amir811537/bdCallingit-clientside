import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllReviews = () => {
  const axiosPublic = useAxiosPublic();
  const {
    refetch : reReviewFetch,
    data: allRewiews = [],
    isPending: loading,
  } = useQuery({
    queryKey: ["allRewiews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allRewiews");
      return res.data;
    },
  });
  return [allRewiews, reReviewFetch, loading];
};

export default useAllReviews;