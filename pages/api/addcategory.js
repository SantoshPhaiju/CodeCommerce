import nextConnect from "next-connect";
import baseUrl from "../../helpers/baseUrl";
import Category from "../../models/CategoryModel";

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.post(async (req, res) => {
  const { cName, cDesc } = req.body.data;
  const oldCategory = await Category.find({ name: cName });
  // console.log(oldCategory.length > 0);
  if (oldCategory.length > 0) {
    res.status(400).json({ success: false, error: "Category already exists!" });
  } else {
    const category = new Category({
      name: cName,
      description: cDesc,
    });

    await category.save();
    res.status(200).json({ success: true, category });
  }
});

export default apiRoute;
