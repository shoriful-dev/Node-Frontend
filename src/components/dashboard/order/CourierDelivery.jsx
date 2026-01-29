import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useSucessCourier } from "../../../hooks/api";

export const   CourierDelivery = () => {
  const { data, isPending, isError, refetch } =
    useSucessCourier();
 
  if (isPending) return <h1> laoding ..</h1>;


  return (
    <Card className="w-full max-w-full mx-auto mt-10 shadow-lg rounded-2xl">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Order List</h2>

        <div className="max-h-[350px] overflow-y-auto rounded-xl border p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
              
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.data?.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">
                    {order.invoiceId}
                  </TableCell>

                  <TableCell>{order.shippinfo?.firstName}</TableCell>

                  <TableCell>{order.shippinfo?.phone}</TableCell>

                  <TableCell>
                    <span className="capitalize">{order.paymentMethod}</span>
                  </TableCell>

                  <TableCell>
                    <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                      {order.orderStatus}
                    </span>
                  </TableCell>

                  <TableCell className="font-semibold">
                    ৳ {order.finalAmount}
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


