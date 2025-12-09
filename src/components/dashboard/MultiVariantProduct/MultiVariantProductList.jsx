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
import { useVirtualizer } from '@tanstack/react-virtual';
const MultiVariantProductList = () => {
  const parentRef = React.useRef(null)

  const { data, isPending, isError, error } = useproductlist("multiple");
  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: data?.data?.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  })

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  const products = data?.data || [];



  return (
    <Card className="w-full mx-auto mt-10 shadow-lg rounded-2xl">
      <CardContent className="p-4 md:p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Multi Variant Product List
        </h2>

        {/* Horizontal scroll wrapper for mobile */}
        <div className="overflow-x-auto rounded-xl border p-2">
          <Table className="min-w-[1000px] md:min-w-full">
            <TableHeader>
              <TableRow className="grid grid-cols-12 gap-2 md:table-row">

                <TableHead className="col-span-2 md:col-auto">Name</TableHead>

                <TableHead className="col-span-2 md:col-auto">Brand</TableHead>
                <TableHead className="col-span-2 md:col-auto">Category</TableHead>

                <TableHead className="col-span-2 md:col-auto">SubCategory</TableHead>

                <TableHead className="col-span-2 md:col-auto">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody ref={parentRef}
                style={{
                  height: `400px`,
                  overflow: 'auto', 
                }}>
              
                <div style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  // width: '100%',
                  position: 'relative',
                }} className="w-full bg-amber-300">
                  {rowVirtualizer.getVirtualItems().map((virtualItem) => {
                    const item = (products[virtualItem.index])
                    return (

                      <div
                        key={virtualItem.key}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: `${virtualItem.size}px`,
                          transform: `translateY(${virtualItem.start}px)`,
                        }}
                      >

                        <TableRow
                          key={item._id}
                          className="grid bg-red-500 w-full grid-cols-12 gap-2 md:table-row items-center"
                        >


                          {/* NAME */}
                          <TableCell className="col-span-2 md:col-auto font-medium">
                            {item.name}
                          </TableCell>





                          {/* BRAND */}
                          <TableCell className="col-span-2 md:col-auto">
                            {item.brand?.name || "N/A"}
                          </TableCell>

                          {/* CATEGORY */}
                          <TableCell className="col-span-2 md:col-auto">
                            {item.category?.name || "N/A"}
                          </TableCell>


                          {/* SUBCATEGORY */}
                          <TableCell className="col-span-2 md:col-auto">
                            {item.subCategory?.name || "N/A"}
                          </TableCell>


                          {/* ACTIONS */}
                          <TableCell className="col-span-2 md:col-auto flex gap-2">
                            <Link to={`/mvpview/${item.slug}`}>
                              <Button size="sm" variant="outline">
                                <ListCheck className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button size="sm" variant="outline">
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive">
                              <Trash className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>

                      </div>

                    )
                  }

                  )}
                </div>
          
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(MultiVariantProductList);
