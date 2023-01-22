// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToDb from "../../middleware/db";
import Category from "../../models/CategoryModel";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const id  = req.body;
    // console.log(req.body.data);
    let category = await Category.findByIdAndDelete(id);
    // console.log(category, "category")
    if(category){
        res.status(200).json({ category, success: true });
    }else{
        res.status(400).json({success: false, error: "Invalid category."});
    }
  } else {
    res.status(400).send({ error: "Invaild req method", success: false });
  }
};

export default connectToDb(handler);
