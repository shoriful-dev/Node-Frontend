import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ListCheck, Pencil, Trash } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { useproductlist } from "../../../hooks/api";

const SingleVariantProductList = () => {
  const { data, isPending, isError, error } = useproductlist("single");

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  const products = data?.data || [];

  return (
    <Card className="w-full mx-auto mt-10 shadow-lg rounded-2xl">
      <CardContent className="p-4 md:p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Single Variant Product List
        </h2>

        {/* Horizontal scroll wrapper for mobile */}
        <div className="overflow-x-auto rounded-xl border p-2">
          <Table className="min-w-[1000px] md:min-w-full">
            <TableHeader>
              <TableRow className="grid grid-cols-12 gap-2 md:table-row">
                <TableHead className="col-span-2 md:col-auto">Image</TableHead>
                <TableHead className="col-span-2 md:col-auto">Name</TableHead>
                <TableHead className="col-span-1 md:col-auto">Price</TableHead>
                <TableHead className="col-span-1 md:col-auto">Stock</TableHead>
                <TableHead className="col-span-2 md:col-auto">Brand</TableHead>
                <TableHead className="col-span-2 md:col-auto">Category</TableHead>
                <TableHead className="col-span-1 md:col-auto">Color</TableHead>
                <TableHead className="col-span-1 md:col-auto">Size</TableHead>
                <TableHead className="col-span-1 md:col-auto">SKU</TableHead>
                <TableHead className="col-span-2 md:col-auto">SubCategory</TableHead>
                <TableHead className="col-span-1 md:col-auto">Total Sale</TableHead>
                <TableHead className="col-span-1 md:col-auto">Wholesale Price</TableHead>
                <TableHead className="col-span-2 md:col-auto">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {products.map((item) => (
                <TableRow
                  key={item._id}
                  className="grid grid-cols-12 gap-2 md:table-row items-center"
                >
                  {/* IMAGE */}
                  <TableCell className="col-span-2 md:col-auto">
                   
                    <img
                      loading="lazy"
                      src={item.image?.[0]}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover border"
                    />
                   
                  </TableCell>

                  {/* NAME */}
                  <TableCell className="col-span-2 md:col-auto font-medium">
                    {item.name}
                  </TableCell>

                  {/* PRICE */}
                  <TableCell className="col-span-1 md:col-auto font-medium">
                    ৳{item.retailPrice}
                  </TableCell>

                  {/* STOCK */}
                  <TableCell
                    className={`col-span-1 md:col-auto font-medium ${
                      item.stock > 20 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.stock} pcs
                  </TableCell>

                  {/* BRAND */}
                  <TableCell className="col-span-2 md:col-auto">
                    {item.brand?.name || "N/A"}
                  </TableCell>

                  {/* CATEGORY */}
                  <TableCell className="col-span-2 md:col-auto">
                    {item.category?.name || "N/A"}
                  </TableCell>

                  {/* COLOR */}
                  <TableCell className="col-span-1 md:col-auto">{item.color}</TableCell>

                  {/* SIZE */}
                  <TableCell className="col-span-1 md:col-auto">{item.size}</TableCell>

                  {/* SKU */}
                  <TableCell className="col-span-1 md:col-auto">{item.sku}</TableCell>

                  {/* SUBCATEGORY */}
                  <TableCell className="col-span-2 md:col-auto">
                    {item.subCategory?.name || "N/A"}
                  </TableCell>

                  {/* TOTAL SALE */}
                  <TableCell className="col-span-1 md:col-auto">
                    {item.totalSale || 0}
                  </TableCell>

                  {/* WHOLESALE PRICE */}
                  <TableCell className="col-span-1 md:col-auto">
                    {item.wholesalePrice}
                  </TableCell>

                  {/* ACTIONS */}
                  <TableCell className="col-span-2 md:col-auto flex gap-2">
                    <Link to={`/svpview/${item.slug}`}>
                     <Button size="sm" variant="outline">
                      <ListCheck className="w-4 h-4" />
                    </Button></Link>
                    <Button size="sm" variant="outline">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(SingleVariantProductList);
