import connectToDb from "../../middleware/db";
import jwt from "jsonwebtoken";
import User from "../../models/User";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const token = req.body.data;
      // console.log(req.body.data);
      const data = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(data);
      if (data) {
        const userdata = await User.findById(data.id).select("-password");
        res.status(200).send({ user: userdata, success: true });
      } else {
        res
          .status(400)
          .send({ success: false, error: "Some error occurred try relogin!" });
      }
    } catch (error) {
      // console.log(error);
      res
        .status(400)
        .send({ success: false, error: "Some error occurred try relogin!" });
    }
  }
};

export default connectToDb(handler);
