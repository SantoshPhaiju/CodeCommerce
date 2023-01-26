// import connectToDb from "../../middleware/db";
// import Product from "../../models/Product";

// const handler = async (req, res) => {
//   if (req.method === "POST") {
//     // console.log(req.body);
//     for (let i = 0; i < req.body.length; i++) {
//       let p = await Product.findByIdAndUpdate(req.body[i]._id, req.body[i]);
//     }
//     res.status(200).json({ success: true });
//   } else {
//     res.status(400).json({ error: "Internal Server Error" });
//   }
// };

// export default connectToDb(handler);
import Product from "../../models/Product";
import nextConnect from "next-connect";
import multer from "multer";
import path from "path";
import baseUrl from "../../helpers/baseUrl";
import { nanoid } from "nanoid";

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
  const id = req.query.id;
  // console.log("reqfiles",req.files);
  // console.log(req);
  let filenames = req.files.img.map((file) => {
    return `${baseUrl}/uploads/${file.filename}`;
  });

  let filename = req.files.mainImage.map((file) => {
    return `${baseUrl}/uploads/${file.filename}`;
  });

  let updatedProduct = await Product.findByIdAndUpdate(id, {})

  // console.log("filenames: ", filenames);
  // console.log("filename: ", filename);
  
  res.status(200).json({ data: "success", products });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

