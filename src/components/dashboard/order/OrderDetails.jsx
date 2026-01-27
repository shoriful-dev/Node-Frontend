import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useParams } from "react-router";
import { usegetorder, useUpdateOrder } from "../../../hooks/api";

const OrderDetails = () => {
  const { phone } = useParams();
  const { data, isPending } = usegetorder(phone);
 const updateMutation = useUpdateOrder();
  if (isPending) return <h1>loading...</h1>;

  const order = data?.data?.[0];

  const handleOrderUpdate = (e) => {
    updateMutation.mutate({
      id: order._id,
      status: e.target.value,
    });
  };
  return (
    <div className="max-w-6xl mx-auto mt-10 space-y-6">
      {/* Order Summary */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Invoice ID</p>
            <p className="font-semibold">{order.invoiceId}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Transaction ID</p>
            <p className="font-semibold">{order.transactionId}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Order Status</p>
            <Badge variant="outline">{order.orderStatus}</Badge>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Payment Method</p>
            <p className="font-semibold capitalize">{order.paymentMethod}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Payment Status</p>
            <select
              className="border rounded-md p-2"
              onChange={handleOrderUpdate}
              defaultValue={order.orderStatus}
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="courierPending">Qurier Pending</option>
              <option value="Cancel">Cancelled</option>
            </select>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Final Amount</p>
            <p className="font-bold text-lg">৳ {order.finalAmount}</p>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Information */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Shipping Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Customer Name</p>
            <p className="font-semibold">{order.shippinfo.firstName}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-semibold">{order.shippinfo.phone}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-semibold">{order.shippinfo.email}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Country</p>
            <p className="font-semibold">{order.shippinfo.country}</p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-muted-foreground">Address</p>
            <p className="font-semibold">{order.shippinfo.address}</p>
          </div>
        </CardContent>
      </Card>

      {/* Courier Info */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Courier Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Courier Status</p>
            <Badge className="bg-gray-100 text-gray-700">
              {order.courier.status}
            </Badge>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Courier Name</p>
            <p className="font-semibold">
              {order.courier.name ?? "Not Assigned"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Tracking ID</p>
            <p className="font-semibold">{order.courier.trackingId ?? "N/A"}</p>
          </div>
        </CardContent>
      </Card>

      {/* Ordered Items */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Ordered Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <img
                      src={item.image[0]}
                      alt={item.name || item.variantName}
                      className="w-14 h-14 rounded-xl object-cover border"
                    />
                  </TableCell>

                  <TableCell className="font-medium">
                    {item.name || item.variantName}
                  </TableCell>

                  <TableCell>{item.size || "-"}</TableCell>
                  <TableCell>{item.color || "-"}</TableCell>

                  <TableCell className="font-semibold">
                    ৳ {item.retailPrice}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetails;
