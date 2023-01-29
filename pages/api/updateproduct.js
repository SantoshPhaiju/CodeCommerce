
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
  console.log("req.body",req.body);

  const {title, price, color, availableQty, size, status } = req.body.productDetails;
  const desc = req.body.productDesc;

  let updatedProduct = await Product.findByIdAndUpdate(id, {
    title: title || product.title,
    price: price || product.price,
    desc: desc || product.desc,
    size: size || product.size,
    color: color || product.color,
    availableQty: availableQty || product.availableQty,
    status: status || product.status,
  }, {new: true});
  
  res.status(200).json({ success: true, updatedProduct });
});

export default apiRoute;

// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, consume as stream
//   },
// };

