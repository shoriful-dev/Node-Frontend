import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../helpers/axios";
import { Bounce, toast } from "react-toastify";
import { successToast } from "../helpers/toast";
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
      console.log(error);
      console.log(`rolling back optimistic update with id ${onMutateResult}`);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onSettled: (data, error, variables, onMutateResult, context) => {
      reset();
    },
  });
};

export const useCreateBrand = (reset) => {
  return useMutation({
    queryKey: ["createBrand"],
    mutationFn: (values) => {
      const imageFile = values.image[0];
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("since", values.since);
      formData.append("image", imageFile);
      return api.post("/brand/create-brand", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onError: (error, onMutateResult) => {
      // An error happened!
      console.log(error);
      console.log(`rolling back optimistic update with id ${onMutateResult}`);
    },
    onSuccess: (data) => {
      successToast("brand created sucessfullly");
    },
    onSettled: () => {
      reset();
    },
  });
};

// get all brand

export const useGetAllbrand = () => {
  return useQuery({
    queryKey: ["allbrand"],
    queryFn: async () => {
      const res = await api.get("/brand/all-brand");
      return res.data;
    },
  });
};

// delete branc

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    queryKey: ["DeleteBrand"],
    mutationFn: (slug) => {
      return api.delete(`/brand/delete-brand/${slug}`);
    },
    onError: (error, onMutateResult) => {
      // An error happened!
      console.log(error);
      console.log(`rolling back optimistic update with id ${onMutateResult}`);
    },
    onSuccess: (data) => {
      successToast("brand delete sucessfullly");
      // 🚀 invalidate brand list query
      queryClient.invalidateQueries({ queryKey: ["allbrand"] });
    },
  });
};
