import { useParams } from "react-router";
import { usegetsingleproduct } from "../../../hooks/api";

const SingleProductView = () => {
  const { slug } = useParams();
  const { data, isLoading, error } = usegetsingleproduct(slug);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;
  if (!data?.data) return <p>No product found.</p>;

  const product = data.data;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* PRODUCT TITLE */}
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

      {/* PRODUCT IMAGES */}
      <div className="flex gap-4 mb-6">
        {product.image?.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={product.name}
            className="w-40 h-40 object-cover rounded border"
          />
        ))}
      </div>

      {/* BASIC INFO */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <p><strong>Brand:</strong> {product.brand?.name ?? "N/A"}</p>
          <p><strong>Category:</strong> {product.category?.name ?? "N/A"}</p>
          <p><strong>Sub Category:</strong> {product.subCategory?.name ?? "N/A"}</p>
          <p><strong>Color:</strong> {product.color}</p>
          <p><strong>Size:</strong> {product.size}</p>
          <p><strong>SKU:</strong> {product.sku}</p>
        </div>

        <div>
          <p><strong>Retail Price:</strong> ${product.retailPrice}</p>
          <p><strong>Wholesale Price:</strong> ${product.wholesalePrice}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>MOQ:</strong> {product.minimumOrderQuantity}</p>
          <p><strong>Unit:</strong> {product.unit}</p>
          <p><strong>Group Unit:</strong> {product.groupUnit} ({product.groupUnitQuantity})</p>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p>{product.description || "No description available."}</p>
      </div>

      {/* WARRANTY */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Warranty Information</h2>
        <p><strong>Claim:</strong> {product.warrantyClaim ? "Yes" : "No"}</p>
        <p><strong>Expires:</strong> {new Date(product.warrentyexpires).toLocaleDateString()}</p>
        <p>{product.warrantyInformation}</p>
      </div>

      {/* SHIPPING */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
        <p>{product.shippingInformation || "N/A"}</p>
      </div>

      {/* REVIEWS */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Reviews</h2>
        {product.reviews?.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          product.reviews.map((r) => (
            <div key={r._id} className="border-b py-2">
              <p><strong>{r.user}</strong></p>
              <p>{r.comment}</p>
              <p>Rating: {r.rating}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SingleProductView;
