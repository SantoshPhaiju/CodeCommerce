import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    pincode: { type: Number, required: true },
    phone: { type: Number, required: true },
    name: { type: String, required: true },
    orderId: { type: String, required: true },
    paymentInfo: { type: Object, default: "" },
    products: { type: Object, required: true },
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Pending", required: true },
    deliveryStatus: { type: String, default: "Order Placed", required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
