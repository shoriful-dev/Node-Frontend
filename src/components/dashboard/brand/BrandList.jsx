import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

import { useNavigate } from "react-router";
import { useDeleteBrand, useGetAllbrand } from "../../../hooks/api";

const BrandList = () => {
  const [seletedbrand, setbrand] = useState("");
  const { isPending, error, data, refetch, isError } = useGetAllbrand();
  const brandDelete = useDeleteBrand();
  if (isPending) return <h1>loading ...</h1>;
  //   /handleDelete
  const handleDelete = (slug) => {
    setbrand(slug);
    brandDelete.mutate(slug);
  };

  return (
    <Card className="w-full max-w-full mx-auto mt-10 shadow-lg rounded-2xl">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Brand List</h2>

        <div className="max-h-[350px] overflow-y-auto rounded-xl border p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Image</TableHead>
                <TableHead className="text-left">Name</TableHead>
                <TableHead className="text-left">Since</TableHead>
                <TableHead className="text-left">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.data?.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>
                    <img
                      loading="lazy"
                      src={brand.image}
                      alt={brand.name}
                      className="w-14 h-14 rounded-xl object-cover border"
                    />
                  </TableCell>

                  <TableCell className="text-lg font-medium">
                    {brand.name}
                  </TableCell>

                  <TableCell className="text-lg font-medium">
                    {brand.since}
                  </TableCell>

                  <TableCell className="flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      //   onClick={() => handleEdit(brand.slug)}
                      className="rounded-xl"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(brand.slug)}
                      className="rounded-xl"
                    >
                      {seletedbrand == brand.slug ? (
                        brandDelete.isPending ? (
                          "lo"
                        ) : (
                          <Trash className="w-4 h-4" />
                        )
                      ) : (
                        <Trash className="w-4 h-4" />
                      )}
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

export default BrandList;
