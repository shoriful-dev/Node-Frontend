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
import { useState } from "react";
import { api } from "../../helpers/axios";

// ---------- ZOD SCHEMA ----------
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),

  image: z
    .any()
    .refine((file) => file instanceof FileList && file.length === 1, {
      message: "Image is required.",
    })
    .refine(
      (file) =>
        file instanceof FileList &&
        ["image/png", "image/jpeg", "image/jpg"].includes(file[0]?.type),
      {
        message: "Only .png, .jpg, .jpeg files are allowed.",
      }
    ),
});

export function CreateCategory() {
  const [loading, setloading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  async function onSubmit(values) {
    // Convert FileList to File
    const imageFile = values.image[0];

    const finalData = {
      name: values.name,
      image: imageFile,
    };
    const fromData = new FormData();
    fromData.append("name", finalData.name);
    fromData.append("image", finalData.image);

    try {
      setloading(true);
      const res = await api.post("/category/create-category", fromData);
      if (res.status == 201) {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* NAME FIELD */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Category Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* IMAGE FIELD */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {loading ? "loading ..." : "Create Category"}
        </Button>
      </form>
    </Form>
  );
}
