// import connectToDb from "../../middleware/db";
import Product from "../../models/Product";

// // import multer from "multer";

// // // Returns a Multer instance that provides several methods for generating
// // // middleware that process files uploaded in multipart/form-data format.
// // const upload = multer({
// //   storage: multer.diskStorage({
// //     destination: "./public/uploads",
// //     filename: (req, file, cb) => cb(null, file.originalname),
// //   }),
// // });

// // const uploadMiddleware = upload.single("img");

// // export const config = {
// //   api: {
// //     bodyParser: false
// //   }
// // }
// const handler = async(req, res)=> {
//   if (req.method === "POST") {
//     console.log(req.body);
//     console.log(req.body.data)
//     // console.log(req.file);
//     // for (let i = 0; i < req.body.length; i++) {
//     //   let p = new Product({
//     //     title: req.body[i].title,
//     //     slug: req.body[i].slug,
//     //     desc: req.body[i].desc,
//     //     img: req.body[i].img,
//     //     category: req.body[i].category,
//     //     size: req.body[i].size,
//     //     color: req.body[i].color,
//     //     price: req.body[i].price,
//     //     availableQty: req.body[i].availableQty,
//     //   });
//     //   await p.save();
//     // }
//     res.status(200).json({ success: true });
//   } else {
//     res.status(400).json({ error: "Internal Server Error" });
//   }
// }

// export default connectToDb(handler);

import nextConnect from "next-connect";
import multer from "multer";
import path from "path";
import baseUrl from "../../helpers/baseUrl";
import { nanoid } from "nanoid";
import CategoryModel from "../../models/CategoryModel";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      console.log("req.files", file);
      // console.log("req bojec", req);
      console.log("files names", file.fieldname);
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
});

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

// apiRoute.use(upload.array("img", 5));
// apiRoute.use(upload.single("mainImage"));
apiRoute.use(
  upload.fields([
    { name: "img", maxCount: 5 },
    { name: "mainImage", maxCount: 1 },
  ])
);
// apiRoute.use(connectToDb);

apiRoute.post(async (req, res) => {
  const products = await Product.find();
  // console.log("reqfiles",req.files);
  // console.log(req);
  let filenames = req.files.img.map((file) => {
    return `${baseUrl}/uploads/${file.filename}`;
  });

  let filename = req.files.mainImage.map((file) => {
    return `${baseUrl}/uploads/${file.filename}`;
  });

  // console.log("filenames: ", filenames);
  // console.log("filename: ", filename);
  // console.log(req.body.category);
  const category = await CategoryModel.findOne({ name: req.body.category });
  console.log(req.body.sizes);
  let p = new Product({
    title: req.body.title,
    slug: req.body.title + "_" + nanoid(),
    desc: req.body.desc,
    img: filenames,
    mainImage: filename[0],
    sizes: req.body.sizes,
    status: req.body.status,
    category: req.body.category,
    size: req.body.size,
    color: req.body.color,
    price: req.body.price,
    availableQty: req.body.availableQty,
  });
  category.products.push(p);

  await category.save();
  await p.save();
  res.status(200).json({ data: "success", p });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
