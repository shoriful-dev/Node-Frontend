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
import { api } from "../../helpers/axios";
import { useNavigate } from "react-router";

const CategoryList = () => {
  const navigate = useNavigate();
  const [categorylistData, setCategoryListData] = useState([]);
  const categories = [
    {
      id: 1,
      name: "Electronics",
      image: "https://via.placeholder.com/60",
    },
    {
      id: 2,
      name: "Fashion",
      image: "https://via.placeholder.com/60",
    },
    {
      id: 3,
      name: "Groceries",
      image: "https://via.placeholder.com/60",
    },
  ];

  useEffect(() => {
    const abort = new AbortController();
    const getcategory = async () => {
      try {
        const res = await api.get("/category/getAll-category");
        setCategoryListData(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getcategory();
    return () => abort.abort();
  }, []);

  //   handleEdit
  const handleEdit = (slug) => {
    navigate(`/editCatgory/${slug}`);
  };

  const handleDelete = async (slug) => {
    const response = await api.delete(`/category/delete-category/${slug}`);
    console.log("Delete: ", response);
  };

  return (
    <Card className="w-full max-w-full mx-auto mt-10 shadow-lg rounded-2xl">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Category List</h2>

        {/* Vertical Scroll */}
        <div className="max-h-[350px] overflow-y-auto rounded-xl border p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Image</TableHead>
                <TableHead className="text-left">Name</TableHead>
                <TableHead className="text-left">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {categorylistData?.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell>
                    <img
                      loading="lazy"
                      src={cat.image}
                      alt={cat.name}
                      className="w-14 h-14 rounded-xl object-cover border"
                    />
                  </TableCell>

                  <TableCell className="text-lg font-medium">
                    {cat.name}
                  </TableCell>

                  <TableCell className="flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(cat.slug)}
                      className="rounded-xl"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(cat.slug)}
                      className="rounded-xl"
                    >
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

export default CategoryList;
