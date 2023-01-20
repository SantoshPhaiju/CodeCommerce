import connectToDb from "../../middleware/db";
import jwt from "jsonwebtoken";
import Order from "../../models/Order";
import User from "../../models/User";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const page = req.query.page || 0;
    const { token, dataLimit, from, to } = req.body.data;
    // console.log(req.body.data);
    // console.log(from, to);
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(data.id);
    if (user.admin === false) {
      let orders = await Order.find({ email: user.email })
        .skip(page * dataLimit)
        .limit(dataLimit);
      if (dataLimit > orders.length) {
        res
          .status(200)
          .send({
            orders,
            success: true,
            admin: false,
            remaining: false,
            totalOrders: orders.length,
          });
      } else {
        res
          .status(200)
          .send({
            orders,
            success: true,
            admin: false,
            remaining: true,
            totalOrders: orders.length,
          });
      }
      // res.status(200).send({ orders, success: true });
    } else {
      // If searched by date
      let totalOrders = await Order.find();
      if (from && to !== undefined) {
        let orders = await Order.find({ createdAt: { $gte: from, $lte: to } })
          .skip(page * dataLimit)
          .limit(dataLimit);
        let totalOrders = await Order.find({
          createdAt: { $gte: from, $lte: to },
        });
        if (dataLimit > orders.length) {
          console.log("false",orders.length, dataLimit);
          res.status(200).send({
            orders,
            success: true,
            admin: true,
            remaining: false,
            totalOrders: totalOrders.length,
          })
        }else{
            console.log(orders.length);
            res.status(200).send({
              orders,
              success: true,
              admin: true,
              remaining: true,
              totalOrders: totalOrders.length,
            });
        }
      } else {
        // If not searched by using date
        let orders = await Order.find()
          .skip(page * dataLimit)
          .limit(dataLimit);
        if (dataLimit > orders.length) {
          res.status(200).send({
            orders,
            success: true,
            admin: true,
            remaining: false,
            totalOrders: totalOrders.length,
          });
        } else {
          res.status(200).send({
            orders,
            success: true,
            admin: true,
            remaining: true,
            totalOrders: totalOrders.length,
          });
        }
      }
    }
  }
};

export default connectToDb(handler);
