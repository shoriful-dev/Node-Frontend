import React, { useState } from "react";
import { usecaratevariant, useproductlist } from "../../../hooks/api";

const CreateVariant = () => {
  const { data, isPending } = useproductlist("multiple");

  const [formData, setFormData] = useState({
    product: "",
    variantName: "Premium Cotton-Shirt 2",
    variantDescription: "High-quality cotton T-shirt for men",
    size: "L",
    color: "Black",
    stockVariant: 50,
    alertVariantStock: 10,
    retailPrice: 1499,
    wholesalePrice: 999,
    image: [], 
  });

  const [previewImages, setPreviewImages] = useState([]);
  const variant = usecaratevariant()

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle image upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setFormData((prev) => ({ ...prev, image: files }));

    // preview images
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    variant.mutate(formData)
   
 
  };

  const products = data?.data || [];

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-6">Create Variant</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">

        {/* PRODUCT DROPDOWN */}
        <div>
          <label className="text-sm font-medium">Select Product</label>
          <select
            disabled={isPending}
            name="product"
            value={formData.product}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md bg-white"
          >
            <option value="">-- Select a Product --</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* VARIANT NAME */}
        <div>
          <label className="text-sm font-medium">Variant Name</label>
          <input
            type="text"
            name="variantName"
            value={formData.variantName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-sm font-medium">Variant Description</label>
          <textarea
            name="variantDescription"
            value={formData.variantDescription}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            rows={4}
          />
        </div>

        {/* SIZE + COLOR */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Size</label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Color</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
        </div>

        {/* STOCK */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Stock Variant</label>
            <input
              type="number"
              name="stockVariant"
              value={formData.stockVariant}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Alert Variant Stock</label>
            <input
              type="number"
              name="alertVariantStock"
              value={formData.alertVariantStock}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
        </div>

        {/* PRICES */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Retail Price</label>
            <input
              type="number"
              name="retailPrice"
              value={formData.retailPrice}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Wholesale Price</label>
            <input
              type="number"
              name="wholesalePrice"
              value={formData.wholesalePrice}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="text-sm font-medium">Variant Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border px-3 py-2 rounded-md bg-white"
          />

          {/* PREVIEW SELECTED IMAGES */}
          <div className="flex flex-wrap gap-3 mt-3">
            {previewImages.map((src, index) => (
              <img
                key={index}
                src={src}
                className="w-20 h-20 object-cover rounded-md border"
                alt="preview"
              />
            ))}
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={variant.isPending}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg mt-3 hover:bg-blue-700"
        >
            {variant.isPending ? "loading .." :"Create Variant"}
          
        </button>
      </form>
    </div>
  );
};

export default CreateVariant;
