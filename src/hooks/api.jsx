import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../helpers/axios";
// get all categories
export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["getallCategory"],
    queryFn: async () => {
      const res = await api.get("/category/getAll-category");
      return res.data;
    },
  });
};

// crearte sub category
export const useCreateSubCategory = (reset) => {
  return useMutation({
    queryKey: ["createSubCategory"],
    mutationFn: (value) => {
      return api.post("/subcategory/create-subcategory", value, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onError: (error, onMutateResult) => {
      // An error happened!
      console.log(error)
      console.log(
        `rolling back optimistic update with id ${ onMutateResult}`
      );
    },
    onSuccess: (data) => {
      console.log(data)
    },
    onSettled: (data, error, variables, onMutateResult, context) => {
      reset()
    },
  });
};
