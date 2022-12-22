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

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      console.log(req.files);
      // console.log("files " + file);
      cb(
        null,
        req.files[0].fieldname + "_" + Date.now() + path.extname(file.originalname)
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

apiRoute.use(upload.array("img", 5));
// apiRoute.use(connectToDb);

apiRoute.post(async (req, res) => {
  const products = await Product.find();
  console.log(req.files);
  let filenames = req.files.map((file) =>{
    return `${process.env.NEXT_PUBLIC_HOST}/uploads/${file.filename}`;
  })
  console.log("filenames: ", filenames);
  let p = new Product({
    title: req.body.title,
    slug: req.body.slug,
    desc: req.body.desc,
    img: filenames,
    category: req.body.category,
    size: req.body.size,
    color: req.body.color,
    price: req.body.price,
    availableQty: req.body.availableQty,
  });
  await p.save();
  res.status(200).json({ data: "success", products });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
