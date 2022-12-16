import connectToDb from "../../middleware/db";
import Product from "../../models/Product";

const handler = async(req, res)=> {
  if (req.method === "POST") {
    // console.log(req.body);
    for (let i = 0; i < req.body.length; i++) {
      let p = new Product({
        title: req.body[i].title,
        slug: req.body[i].slug,
        desc: req.body[i].desc,
        img: req.body[i].img,
        category: req.body[i].category,
        size: req.body[i].size,
        color: req.body[i].color,
        price: req.body[i].price,
        availableQty: req.body[i].availableQty,
      });
      await p.save();
    }
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ error: "Internal Server Error" });
  }
}

export default connectToDb(handler);
