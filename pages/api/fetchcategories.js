// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToDb from "../../middleware/db";
import Category from "../../models/CategoryModel";

const handler = async (req, res) => {
  if (req.method === "GET") {
    let category = await Category.find();
    // console.log(category, "category")
    res.status(200).json({ category, success: true });
  } else {
    res.status(400).send({ error: "Invaild req method", success: false });
  }
};

export default connectToDb(handler);
