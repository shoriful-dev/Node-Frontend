import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../helpers/axios";
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

//  create  product
export const useCreateProduct = (reset) => {
  return useMutation({
    queryKey: ["crearteproduct"],
    mutationFn: (values) => {
      const formData = new FormData();
      for (let key in values) {
        if (key === "image") {
          const files = values[key];
          if (files && files.length > 0) {
            // Loop through all selected images
            for (let i = 0; i < files.length; i++) {
              formData.append("image", files[i]); // multiple image upload
            }
          }
        } else {
          formData.append(key, values[key]);
        }
      }
      return api.post("/product/create-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onError: (error) => {
      // An error happened!
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
      successToast(" product created sucessfullly", data);
    },
    onSettled: () => {
      reset();
    },
  });
};

// get producxt
export const useproductlist = (type) => {
  return useQuery({
    queryKey: [`${type} product`],
    queryFn: async () => {
      if (type) {
        const res = await api.get(`/product/getall-product?ptype=${type}`);
        return res.data;
      } else {
        const res = await api.get("/product/getall-product");
        return res.data;
      }
    },
  });
};

// get single product
export const usegetsingleproduct = (slug) => {
  return useQuery({
    queryKey: [`singleproduct`],
    queryFn: async () => {
      const res = await api.get(`/product/single-product`, {
        params: { slug },
      });
      return res.data;
    },
    enabled: !!slug,
  });
};

export const usecaratevariant = (reset) => {
  return useMutation({
    queryKey: ["createvariant"],
    mutationFn: (values) => {
      const formData = new FormData();
      for (let key in values) {
        if (key === "image") {
          const files = values[key];
          if (files && files.length > 0) {
            // Loop through all selected images
            for (let i = 0; i < files.length; i++) {
              formData.append("image", files[i]); // multiple image upload
            }
          }
        } else {
          formData.append(key, values[key]);
        }
      }
      return api.post("/variant/create-variant", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onError: (error) => {
      // An error happened!
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
      successToast(" Variant created sucessfullly", data);
    },
  });
};

// get variant list
export const usevariantlist = () => {
  return useQuery({
    queryKey: [`variantlist`],
    queryFn: async () => {
      const res = await api.get(`/variant/getall-variant`);
      return res.data;
    },
  });
};

// get all order
export const usegetallorder = (status) => {
  return useQuery({
    queryKey: ["allOrder"],
    queryFn: async () => {
      const res = await api.get("/order/getorderbystatus", {
        params: {
          status,
        },
      });
      return res.data;
    },
    enabled: !!status,
  });
};
// get order details by phone number
export const usegetorder = (invoice) => {
  return useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await api.get("/order/getAllorder", {
        params: {
          invoice,
        },
      });
      return res.data;
    },
    enabled: !!invoice,
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => {
      return api.put(`/order/orderupdate/${id}`, {
        status,
      });
    },
    onSuccess: () => {
      successToast("Order updated successfully");
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

// send courier

export const useSendCourier = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderid) => {
      console.log(orderid)
      return api.post(`/courier/create-order`, {
        orderid: orderid,
      });
    },
    onSuccess: (data) => {
      console.log(data);
      successToast("Courier  updated successfully");
      // queryClient.invalidateQueries({ queryKey: ["order"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};