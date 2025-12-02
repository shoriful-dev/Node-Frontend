import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { useGetAllbrand, useGetAllCategories } from "../../../hooks/api";
import { useEffect, useState } from "react";

export default function CreateProductForm({
  categories = [],
  subCategories = [],
  brands = [],
}) {
  // ---------------------------------------------
  // ZOD SCHEMA (FIXED)
  // ---------------------------------------------
  const schema = z.object({
    name: z.string().min(2),
    description: z.string().min(10),

    category: z.string(),
    subCategory: z.string(),
    brand: z.string(),

    tag: z.array(z.string()).default([]),

    manufactureCountry: z.string(),
    rating: z.coerce.number().min(0).max(5),

    warrantyInformation: z.string().optional(),
    warrentyexpires: z.string(),

    shippingInformation: z.string(),
    sku: z.string(),

    groupUnit: z.enum(["Box", "Packet", "Dozen", "Custom"]),
    groupUnitQuantity: z.coerce.number(),

    unit: z.enum(["Piece", "Kg", "Gram", "Packet", "Custom"]),

    size: z.string(),
    color: z.string(),

    stock: z.coerce.number(),
    retailPrice: z.coerce.number(),
    wholesalePrice: z.coerce.number(),

    alertQuantity: z.coerce.number(),
    minimumOrderQuantity: z.coerce.number(),

    variantType: z.string(),

    images: z
      .any()
      .refine((files) => files instanceof FileList && files.length > 0, {
        message: "Upload at least one image.",
      }),
  });

  // ---------------------------------------------
  // react-hook-form
  // ---------------------------------------------
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
      rating: 0,
      warrantyInformation: "",
      warrentyexpires: "",
      shippingInformation: "",
      sku: "",
      groupUnit: "",
      groupUnitQuantity: 0,
      unit: "",
      size: "",
      color: "",
      stock: 0,
      retailPrice: 0,
      wholesalePrice: 0,
      alertQuantity: 0,
      minimumOrderQuantity: 0,
      variantType: "singleVariant",
      images: undefined,
    },
  });

  const [subcategoryList, setsubcategoyList] = useState([]);
  const { data: categoryData, isPending: categorypending } =
    useGetAllCategories();
  // fetch all brand
  const { data: brandData, isPending: brandpending } = useGetAllbrand();

  // find subcategory selected category id
  useEffect(() => {
    if (form.watch("category")) {
      const scategory = categoryData?.data?.find(
        (item) => item._id == form.watch("category")
      );
      setsubcategoyList(scategory.subCategory);
    }
  }, [form.watch("category")]);
  const onSubmit = (values) => {
    console.log("PRODUCT DATA:", values);
  };
  console.log(subcategoryList);

  // ---------------------------------------------
  // UI
  // ---------------------------------------------
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

        {/* IMAGES */}
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={(e) => field.onChange(e.target.files)}
                />
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
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SUB CATEGORY */}
        <FormField
          disabled={subcategoryList?.length == 0 ? true : false}
          control={form.control}
          name="subCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub Category</FormLabel>
              <FormControl>
                <select className="border p-2 w-full rounded" {...field}>
                  {subcategoryList?.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* BRAND */}
        <FormField
          disabled={brandpending}
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <FormControl>
                <select className="border p-2 w-full rounded" {...field}>
                  <option value="">Select Brand</option>
                  {brandData?.data?.map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* UNIT */}
        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit</FormLabel>
              <FormControl>
                <select className="border p-2 w-full rounded" {...field}>
                  <option value="">Select Unit</option>
                  <option value="Piece">Piece</option>
                  <option value="Kg">Kg</option>
                  <option value="Gram">Gram</option>
                  <option value="Packet">Packet</option>
                  <option value="Custom">Custom</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* GROUP UNIT */}
        <FormField
          control={form.control}
          name="groupUnit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group Unit</FormLabel>
              <FormControl>
                <select className="border p-2 w-full rounded" {...field}>
                  <option value="">Select Group Unit</option>
                  <option value="Box">Box</option>
                  <option value="Packet">Packet</option>
                  <option value="Dozen">Dozen</option>
                  <option value="Custom">Custom</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* GROUP UNIT QUANTITY */}
        <FormField
          control={form.control}
          name="groupUnitQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group Unit Quantity</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SIZE */}
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* sku */}
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>sku</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* COLOR */}
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* STOCK */}
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* RETAIL PRICE */}
        <FormField
          control={form.control}
          name="retailPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Retail Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* WHOLESALE PRICE */}
        <FormField
          control={form.control}
          name="wholesalePrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wholesale Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* MINIMUM ORDER QUANTITY */}
        <FormField
          control={form.control}
          name="minimumOrderQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Order Quantity</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create Product</Button>
      </form>
    </Form>
  );
}
