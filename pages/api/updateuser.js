import mongoose from "mongoose";
import connectToDb from "../../middleware/db";
import User from "../../models/User";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { name, email, phone, gender, id, dob } = req.body.data;
      console.log(req.body);

      const user = await User.findById(id);
      console.log(id);
      const updatedUser = await User.findByIdAndUpdate(id, {name, email, phone, gender, dob});
      res.status(200).send({updatedUser, user, success: true});
    } catch (error) {
        console.log(error);
        res.status(400).send({success: false, error})
    }
  }
};

export default connectToDb(handler);
