import connectToDb from "../../middleware/db";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  const matchPassword = async (enteredPassword, userPassword) => {
    return await bcrypt.compare(enteredPassword, userPassword);
  };

  const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  };
  if (req.method === "POST") {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (await matchPassword(req.body.password, user.password)) {
          const token = generateToken(user._id);
          res
            .status(200)
            .json({
              success: true,
              email: user.email,
              name: user.name,
              token,
              admin: user.admin,
            });
        } else {
          res.status(400).send({
            success: false,
            message:
              "Invalid credentials! Please try to login with correct credentials.",
          });
        }
      } else {
        res.status(400).send({ success: false, message: "User Invalid" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, message: error.message });
    }
  } else {
    res.status(400).json({ error: "Internal Server Error" });
  }
};

export default connectToDb(handler);
