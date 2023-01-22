import connectToDb from "../../middleware/db";
import Category from "../../models/CategoryModel";

const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body.data);
    const { id, cName, cDesc } = req.body.data;
    const category = await Category.findById(id);
    if (category !== null) {
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { name: cName || category.name, description: cDesc || category.description },
        { new: true }
      );
      res.status(200).json({ success: true, updatedCategory });
    } else {
      res.status(200).json({ success: false, error: "Invalid category!" });
    }
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default connectToDb(handler);
