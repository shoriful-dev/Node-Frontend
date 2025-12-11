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
import { Pencil, Trash } from "lucide-react";
import { usevariantlist } from '../../../hooks/api';
const VariantList = () => {
  const {data , isPending} = usevariantlist();
  if(isPending) return <h1>loading..</h1>
  console.log(data.data);
  
  return (
    <div>
          <Card className="w-full max-w-full mx-auto mt-10 shadow-lg rounded-2xl">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Category List</h2>

        {/* Vertical Scroll */}
        <div className="max-h-[350px] overflow-y-auto rounded-xl border p-2">
          <Table>
           <TableHeader>
  <TableRow>
    <TableHead className="text-left">Image</TableHead>
    <TableHead className="text-left">Variant Name</TableHead>
    <TableHead className="text-left">Color</TableHead>
    <TableHead className="text-left">Retail Price</TableHead>
    <TableHead className="text-left">Size</TableHead>
    <TableHead className="text-left">Stock</TableHead>
    <TableHead className="text-left">Wholesale Price</TableHead>
    <TableHead className="text-left">Actions</TableHead>
  </TableRow>
</TableHeader>

            <TableBody>
              {data.data?.map((variant) => (
                <TableRow key={variant.id}>
                  <TableCell>
                    <img
                      loading="lazy"
                      src={variant.image[0]}
                      alt={variant.name}
                      className="w-14 h-14 rounded-xl object-cover border"
                    />
                  </TableCell>

                  <TableCell className="text-lg font-medium">
                    {variant.variantName}
                  </TableCell>
                  <TableCell className="text-lg font-medium">
                    {variant.color}
                  </TableCell>
                  <TableCell className="text-lg font-medium">
                    {variant.retailPrice}
                  </TableCell>
                  <TableCell className="text-lg font-medium">
                    {variant.size}
                  </TableCell>
                  <TableCell className="text-lg font-medium">
                    {variant.stockVariant}
                  </TableCell>
                  <TableCell className="text-lg font-medium">
                    {variant.wholesalePrice}
                  </TableCell>

                  <TableCell className="flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(variant.slug)}
                      className="rounded-xl"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(variant.slug)}
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
    </div>
  )
}

export default VariantList