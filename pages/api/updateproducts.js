import connectToDb from "../../middleware/db";
import Product from "../../models/Product";

const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body.data);
    let p;
    for (let i = 0; i < req.body.data.length; i++) {
      p = await Product.findByIdAndUpdate(req.body.data[i]._id, req.body.data[i], {new: true});
    }
    let slug = p.slug;
    res.status(200).json({ success: true, result: p, slug});
  } else {
    res.status(400).json({ error: "Internal Server Error" });
  }
};

export default connectToDb(handler);
