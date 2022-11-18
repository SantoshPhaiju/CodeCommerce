import connectToDb from "../../middleware/db";
import jwt from "jsonwebtoken";
import Order from "../../models/Order";
import User from "../../models/User";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const token = req.body.data;
    // console.log(req.body.data);
    const data = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(data);
    const user = await User.findById(data.id);
    let orders = await Order.find({ email: user.email });
    res.status(200).send({ orders, success: true });
  }
};

export default connectToDb(handler);
