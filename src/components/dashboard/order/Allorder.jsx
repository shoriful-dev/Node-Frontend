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
import { Eye } from "lucide-react";
import { Link } from "react-router";
import { usegetallorder } from "../../../hooks/api";

const OrderList = () => {
  const { data, isPending, isError, refetch } = usegetallorder();
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
                <TableHead>Actions</TableHead>
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

                  <TableCell>
                    <Link to={`/orderdetails/${order.invoiceId}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-xl"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
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

export default OrderList;
