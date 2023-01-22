import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: Number, required: true },
    name: { type: String, required: true },
    orderId: { type: String, required: true },
    transactionId: { type: String, default: "" },
    paymentInfo: { type: Object, default: "" },
    products: { type: Object, required: true },
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Pending", required: true },
    deliveryStatus: { type: String, default: "Order Placed", required: true },
    trackingId: { type: String, required: true },
    deliveryDate: { type: Date, default: "", required: false },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
