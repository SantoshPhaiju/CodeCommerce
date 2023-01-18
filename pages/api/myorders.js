import connectToDb from "../../middleware/db";
import jwt from "jsonwebtoken";
import Order from "../../models/Order";
import User from "../../models/User";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const {token, dataLimit} = req.body.data;
    // console.log(req.body.data);
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(data.id);
    if (user.admin === false) {
      let orders = await Order.find({ email: user.email }).limit(dataLimit)
      if (dataLimit > orders.length) {
        res
          .status(200)
          .send({ orders, success: true, admin: false, remaining: false });
      } else {
        res
          .status(200)
          .send({ orders, success: true, admin: false, remaining: true });
      }
      // res.status(200).send({ orders, success: true });
    }else{
      let orders = await Order.find().limit(dataLimit);
      if(dataLimit > orders.length){
        res.status(200).send({ orders, success: true, admin: true, remaining: false });
      }else{
        res.status(200).send({ orders, success: true, admin: true, remaining: true });
      }
    }
  }
};

export default connectToDb(handler);
