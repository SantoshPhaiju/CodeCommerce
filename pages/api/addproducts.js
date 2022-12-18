// import connectToDb from "../../middleware/db";
// import Product from "../../models/Product";

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


import nextConnect from 'next-connect';
import multer from 'multer';
import connectToDb from '../../middleware/db';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      // console.log(req, file);
      cb(null, file.originalname)
    }
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array('img'));
apiRoute.use(connectToDb);

apiRoute.post((req, res) => {
  console.log(req.body);
  res.status(200).json({ data: 'success' });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
