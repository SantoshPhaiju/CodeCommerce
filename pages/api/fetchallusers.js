import connectToDb from "../../middleware/db";
import jwt from "jsonwebtoken";
import User from "../../models/User";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const token = req.headers.admintoken;
      const data = jwt.verify(token, process.env.JWT_SECRET);
      const searchquery = req.query.searchquery;
      if (data) {
        // console.log(req.query.searchquery);
        if (searchquery) {
          const userData = await User.findById(data.id);
          if (userData.admin === true) {
            const users = await User.find({email: {$regex: searchquery, $options: "i"}}).select("-password");
            res.status(200).send({ users, success: true });
          } else {
            res.status(400).send({
              error: "You are not valid user to access this endpoint",
              success: false,
            });
          }
        } else {
          const userData = await User.findById(data.id);
          if (userData.admin === true) {
            const users = await User.find().select("-password");
            res.status(200).send({ users, success: true });
          } else {
            res.status(400).send({
              error: "You are not valid user to access this endpoint",
              success: false,
            });
          }
        }
      } else {
        res
          .status(400)
          .send({
            error: "You are not valid user to access it.",
            success: false,
          });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Internal server error" });
    }
  }
};

export default connectToDb(handler);
