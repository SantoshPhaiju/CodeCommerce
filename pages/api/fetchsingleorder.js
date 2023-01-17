import connectToDb from "../../middleware/db";
import jwt from "jsonwebtoken";
import Order from "../../models/Order";
import mongoose from "mongoose";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const {email, trackingId} = req.body.data;
    try {
        const order = await Order.findOne({trackingId, email});
        if(order){
            console.log(order);
            res.status(200).send({ order, success: true });
        }else{
            res.status(400).send({success: false, error: "Please enter valid tracking Id or Email"});
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({error: "Internal Server error", success: false})
    }
  }
};

export default connectToDb(handler);
