import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import {
  useCreateProduct,
  useGetAllbrand,
  useGetAllCategories,
} from "../../../hooks/api";

// ---------------------------------------------
// Simplified ZOD Schema (Only Your Required Fields)
// ---------------------------------------------
const schema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),

  category: z.string(),
  subCategory: z.string(),
  brand: z.string(),

  tag: z.array(z.string()).default([]),

  manufactureCountry: z.string(),

  warrantyInformation: z.string().optional(),
  warrentyexpires: z.string(),

  shippingInformation: z.string(),

  variantType: z.literal("multipleVariant"),


});

export default function CreateProductForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      subCategory: "",
      brand: "",
      tag: [],
      manufactureCountry: "",
      warrantyInformation: "",
      warrentyexpires: "",
      shippingInformation: "",
      variantType: "multipleVariant",
    
    },
  });

  const [subcategoryList, setsubcategoyList] = useState([]);

  const { data: categoryData, isPending: categorypending } = useGetAllCategories();
  const { data: brandData, isPending: brandpending } = useGetAllbrand();
  const createProduct = useCreateProduct(() => form.reset());

  // Update subcategories based on selected category
  useEffect(() => {
    const selected = categoryData?.data?.find(
      (item) => item._id === form.watch("category")
    );
    setsubcategoyList(selected?.subCategory || []);
  }, [form.watch("category"), categoryData]);

  // Submit handler
  const onSubmit = (values) => {
    createProduct.mutate(values);
  };
  

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>

        {/* NAME */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DESCRIPTION */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      

        {/* CATEGORY */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <select
                  disabled={categorypending}
                  className="border p-2 w-full rounded"
                  {...field}
                >
                  <option value="">Select Category</option>
                  {categoryData?.data?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* SUBCATEGORY */}
        <FormField
          control={form.control}
          name="subCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub Category</FormLabel>
              <FormControl>
                <select
                  disabled={subcategoryList.length === 0}
                  className="border p-2 w-full rounded"
                  {...field}
                >
                  <option value="">Select Subcategory</option>
                  {subcategoryList.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* BRAND */}
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <FormControl>
                <select
                  disabled={brandpending}
                  className="border p-2 w-full rounded"
                  {...field}
                >
                  <option value="">Select Brand</option>
                  {brandData?.data?.map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* MANUFACTURE COUNTRY */}
        <FormField
          control={form.control}
          name="manufactureCountry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Manufacture Country</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* WARRANTY INFORMATION */}
        <FormField
          control={form.control}
          name="warrantyInformation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Warranty Information</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* WARRANTY EXPIRY */}
        <FormField
          control={form.control}
          name="warrentyexpires"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Warranty Expires Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* SHIPPING INFO */}
        <FormField
          control={form.control}
          name="shippingInformation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shipping Information</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* TAGS */}
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (comma separated)</FormLabel>
              <FormControl>
                <Input
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.split(",").map((t) => t.trim())
                    )
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* VARIANT TYPE (AUTO SET) */}
        <FormField
          control={form.control}
          name="variantType"
          render={() => (
            <input type="hidden" value="multipleVariant" {...form.register("variantType")} />
          )}
        />

        <Button type="submit">
          {createProduct.isPending ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </Form>
  );
}
