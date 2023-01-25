// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../models/Product";
import connectToDb from "../../middleware/db";

const handler = async (req, res) => {
  if (req.method === "GET") {
    // Need to pass options lean true that it doesn't populate the products with the variants filed empty or this:-[]
    // The issue with the populate method was I changed mine model name so it was giving me the error of missing model name.
    let products = await Product.find()
    .populate({
      path: "variants",
      options: { lean: true },
    });
   
    if (products) {
      res.status(200).json({ success: true, products });
    }
  } else {
    res.status(500).send({ error: "Internal server error" });
  }
};

export default connectToDb(handler);
