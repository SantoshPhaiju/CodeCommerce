import connectToDb from "../../middleware/db";
import User from "../../models/User";
import bcrypt, { hash } from "bcrypt";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { name, email, password } = req.body;
      console.log(name, email, password);
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      let user = await User.create({ name, email, password: hashPassword });
      console.log("user", user, hashPassword);
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(400).json({ sucess: false, error: error.message });
    }
  } else {
    res.status(400).json({ error: "Internal Server Error" });
  }
};

export default connectToDb(handler);
