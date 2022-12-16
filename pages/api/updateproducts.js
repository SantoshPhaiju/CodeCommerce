import connectToDb from "../../middleware/db";
import Product from "../../models/Product";

const handler = async (req, res) => {
  if (req.method === "POST") {
    // console.log(req.body);
    for (let i = 0; i < req.body.length; i++) {
      let p = await Product.findByIdAndUpdate(req.body[i]._id, req.body[i]);
    }
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ error: "Internal Server Error" });
  }
};

export default connectToDb(handler);
