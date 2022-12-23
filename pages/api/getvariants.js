// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../models/Product";
import connectToDb from "../../middleware/db";

const handler = async (req, res) => {
  let products = await Product.find();
  res.status(200).json({ products });
};

export default connectToDb(handler);
