import mongoose from "mongoose";
import connectToDb from "../../middleware/db";
import AddressBook from "../../models/AddressBook";
import User from "../../models/User";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const {
        name,
        address,
        mobile,
        landmark,
        province,
        city,
        area,
        label,
        shippingaddress,
        billingaddress,
      } = req.body.data;
      console.log(req.body.data, `Headers: ${req.headers}`);
      const token = req.headers.token;
      const data = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(data);
      const userdata = await User.findById(data.id).select("-password");

      const existsAddress = await AddressBook.find({ userid: userdata._id });

      console.log("exists addressses: " + existsAddress);

      if (existsAddress) {
        if (shippingaddress === true) {
          await AddressBook.updateMany(
            { userid: userdata._id },
            {
              $set: {
                shippingAddress: false,
              },
            },
            {
              multi: true,
            }
          );
        }
        if (billingaddress === true) {
          await AddressBook.updateMany(
            { userid: userdata._id },
            {
              $set: {
                billingAddress: false,
              },
            },
            {
              multi: true,
            }
          );
        }
      }

      const useraddress = await AddressBook.create({
        userid: userdata._id,
        name,
        address,
        mobile,
        landmark,
        province,
        city,
        area,
        label,
        shippingAddress: shippingaddress,
        billingAddress: billingaddress,
      });
      if (useraddress) {
        res.status(201).json({ success: true, useraddress });
      } else {
        res.status(400).json({ success: false, error: "something went worng" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({ success: false, error });
    }
  }
};

export default connectToDb(handler);
