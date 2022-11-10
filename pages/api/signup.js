import connectToDb from "../../middleware/db";
import User from "../../models/User";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      let user = new User(req.body);
      let result = await user.save();
      if (result) {
        res.status(200).json({ success: true });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ sucess: false, error: error.message });
    }
  } else {
    res.status(400).json({ error: "Internal Server Error" });
  }
};

export default connectToDb(handler);
