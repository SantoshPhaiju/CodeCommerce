
import Product from "../../models/Product";
import nextConnect from "next-connect";
import baseUrl from "../../helpers/baseUrl";

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
  const id = req.query.id;
  const product = await Product.findById(id);

  console.log(product, id);
  console.log(req.body);

  let updatedProduct = await Product.findByIdAndUpdate(id, {
    title: req.body.title || product.title,
    desc: req.body.desc || product.desc,
    size: req.body.size || product.size,
    color: req.body.color || product.color,
    availableQty: req.body.availableQty || product.availableQty,
    status: req.body.status || product.status,
  }, {new: true});
  
  res.status(200).json({ data: "success", updatedProduct });
});

export default apiRoute;

// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, consume as stream
//   },
// };

