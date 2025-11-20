import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { api } from "../../helpers/axios";

const EditCategory = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [name, setName] = useState("Electronics");
  const [image, setImage] = useState(null);
  const [defaultValue, setDeafuluValue] = useState({});

  useEffect(() => {
    const abort = new AbortController();
    const getcategory = async () => {
      try {
        const res = await api.get(`/category/singleCategory/${slug}`);
        setDeafuluValue(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getcategory();
    return () => abort.abort();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, image });
  };

  const handlBack = () => {
    navigate("/categorylist");
  };

  console.log(defaultValue);

  return (
    <Card className="max-w-full mx-auto mt-10 shadow-lg rounded-2xl p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Edit Category</CardTitle>
      </CardHeader>

      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              value={defaultValue.name ?? name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              className="rounded-xl"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Category Image</Label>

            <div className="w-full border rounded-xl p-4 flex items-center gap-4">
              <label
                htmlFor="imageUpload"
                className="flex items-center gap-2 cursor-pointer bg-gray-100 px-3 py-2 rounded-xl border"
              >
                <Upload className="w-4 h-4" /> Upload
              </label>

              <input
                type="file"
                id="imageUpload"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />

              {image ? (
                <span className="text-sm text-green-600">{image.name}</span>
              ) : (
                <span className="text-sm text-gray-500">No file chosen</span>
              )}

              <div className="w-[50px] h-[50px]!  bg-amber-400">
                {defaultValue?.image && (
                  <div>
                    <img
                      src={defaultValue.image}
                      alt={defaultValue.image}
                      className="w-full h-[50px]! object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between ">
            <Button type="submit" className=" rounded text-lg py-2">
              Update Category
            </Button>

            <Button onClick={handlBack} className=" rounded text-lg py-2">
              Back
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditCategory;
