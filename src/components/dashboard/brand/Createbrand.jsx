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
import { useCreateBrand } from "../../../hooks/api";

// ---------- ZOD SCHEMA ----------
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),

  since: z
    .string()
    .regex(/^\d{4}$/, { message: "Enter a valid year (e.g., 2002)." }),

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

export function CreateBrand() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      since: "",
      image: undefined,
    },
  });

  //   useCreateBrand
  const brand = useCreateBrand(() => form.reset());
  async function onSubmit(values) {
    brand.mutate(values);
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
                <Input placeholder="Brand Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SINCE FIELD */}
        <FormField
          control={form.control}
          name="since"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Since</FormLabel>
              <FormControl>
                <Input placeholder="2002" type="number" {...field} />
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
          {brand.isPending ? "loading ..." : "Create Brand"}
        </Button>
      </form>
    </Form>
  );
}
