import connectToDb from "../../middleware/db";
import User from "../../models/User";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (
          req.body.email === user.email &&
          req.body.password === user.password
        ) {
          res.status(200).json({ success: true, email: user.email, name: user.name });
        } else {
          res
            .status(400)
            .send({ success: false, message: "Invalid credentials! Please try to login with correct credentials." });
        }
      } else {
        res.status(400).send({ success: false, message: "User Invalid" });
      }
    } catch (error) {
    //   console.log(error);
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(400).json({ error: "Internal Server Error" });
  }
};

export default connectToDb(handler);
