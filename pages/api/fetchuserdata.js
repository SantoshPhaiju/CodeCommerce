import connectToDb from "../../middleware/db";
import jwt from "jsonwebtoken";
import User from "../../models/User";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const token = req.body.data;
    // console.log(req.body.data);
    const data = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(data);
    const userdata = await User.findById(data.id).select("-password");
    res.status(200).send({ user: userdata, success: true });
  }
};

export default connectToDb(handler);
