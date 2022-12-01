import mongoose from "mongoose";
import connectToDb from "../../middleware/db";
import User from "../../models/User";
import bcrypt from 'bcrypt'

const handler = async (req, res) => {
  if (req.method === "POST") {
    const matchPassword = async (enteredPassword, userPassword) => {
      return await bcrypt.compare(enteredPassword, userPassword);
    };
    try {
      const { cupassword, newpassword, email } = req.body.data;
      console.log(req.body);

      const user = await User.findOne({ email });
        const id = user._id;
      if (await matchPassword(cupassword, user.password)) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newpassword, salt);
        const updatedUser = await User.findByIdAndUpdate(id, {
          password: hashPassword,
        });
        res.status(200).send({ updatedUser, user, success: true });
      } else {
        res.status(400).send({
          success: false,
          message:
            "Password you entered doesn't match with the current password!",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({ success: false, error });
    }
  }
};

export default connectToDb(handler);
