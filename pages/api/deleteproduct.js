import connectToDb from "../../middleware/db";
import Product from "../../models/Product";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const id = req.body;
    // console.log("backend id" , id)
    console.log("backend" + req.body);
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      res.status(200).json({ success: true, deletedProduct });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, error: "Something went wrong" });
    }
  }
};

export default connectToDb(handler);
