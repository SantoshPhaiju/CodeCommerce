import connectToDb from "../../middleware/db";
import Product from "../../models/Product";
import Variants from "../../models/Variants";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const id = req.body;
    // console.log("backend id" , id)
    console.log("backend" + req.body);
    try {
      const product = await Product.findById(id);
      if(product){
        const deletedVariants = await Variants.deleteMany({ productsID: id });
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, deletedProduct, deletedVariants });
      }else{
        res.status(400).json({success: false, error: "this product cannot be deleted"});
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, error: "Something went wrong" });
    }
  }
};

export default connectToDb(handler);
