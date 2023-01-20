import connectToDb from "../../middleware/db";
import Order from "../../models/Order";

const handler = async (req, res) => {
  if (req.method === "POST") {
    // console.log(req.body.data);
    const { id, orderState } = req.body.data;
    const order = await Order.findById(id);
    if (order !== null) {
      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { deliveryStatus: orderState, deliveryDate: new Date() },
        { new: true }
      );
      res.status(200).json({ success: true, updatedOrder });
    } else {
      res.status(200).json({ success: false, error: "Invalid order" });
    }
  } else {
    res.status(400).json({ error: "Internal Server Error" });
  }
};

export default connectToDb(handler);
