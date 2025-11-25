import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ShadCN components
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCreateSubCategory, useGetAllCategories } from "../../../hooks/api";

// Example categories
const categories = [
  { id: "68bfca62657ad760cac2ec4d", name: "Laptops" },
  { id: "68bfca62657ad760cac2ec4e", name: "Phones" },
  { id: "68bfca62657ad760cac2ec4f", name: "Accessories" },
];

// Zod schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  category: z.string().nonempty("Category is required"),
});

const CreateSubCategory = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
    },
  });

  const {data , isPending  ,isError, error , refetch} = useGetAllCategories();
  const subcategory = useCreateSubCategory(()=> form.reset())
  if(isPending) return <div>Loading... {isPending}</div>
  if (isError) {
      console.log(error);
    return <div>Error loading categories</div>;
    
  }

  const onSubmit = (values) => {
    subcategory.mutate(values)
    // Here you can call your API to create subcategory
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full p-4 border rounded-md"
      >
        {/* Name field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Subcategory Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category dropdown */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                disabled={isPending}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue=""
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {data.data.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={subcategory.isPending} >
            {subcategory.isPending ? "loading .." : "Create Subcategory"}
            </Button>
      </form>
    </Form>
  );
};

export default CreateSubCategory;
