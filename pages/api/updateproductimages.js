import Product from "../../models/Product";
import nextConnect from "next-connect";
import multer from "multer";
import path from "path";
import baseUrl from "../../helpers/baseUrl";
import fs from "fs";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      // console.log("files names", file.fieldname);
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

apiRoute.use(
  upload.fields([{ name: "img" }, { name: "mainImage", maxCount: 1 }])
);

apiRoute.post(async (req, res) => {
  // console.log(req.files, "req.files in post");
  const id = req.query.id;
  const product = await Product.findById(id);
  let filenames;
  if (req.files && req.files.img) {
    if (req.files.img.length > 4) {
      const imagepaths = req.files.img.map((img) => {
        return img.path;
      });
      // console.log(req.files.img);

      // console.log("imagepaths", imagepaths);
      imagepaths.forEach((img) => {
        // console.log(img);
        const basename = path.basename(img);
        //   console.log(basename);
        let imagepath = path.join(process.cwd(), "public", "uploads", basename);
        fs.unlink(imagepath, (err) => {
          if (err) throw err;
          // console.log(`${basename} was deleted`);
        });
      });
      return res
        .status(400)
        .json({ error: "Too many files, maximum of 4 allowed" });
    }
  }

  if (req.files && req.files.img) {
    filenames = req.files.img.map((file) => {
      return `${baseUrl}/uploads/${file.filename}`;
    });

    if (product.img.length > 0) {
      const imagepaths = product.img.map((img) => {
        return img;
      });
      // console.log("imagepaths", imagepaths);
      imagepaths.forEach((img) => {
        // console.log(img);
        const basename = path.basename(img);
        //   console.log(basename);
        let imagepath = path.join(process.cwd(), "public", "uploads", basename);
        fs.unlink(imagepath, (err) => {
          if (err) throw err;
          // console.log(`${basename} was deleted`);
        });
      });
    }
  }
  let filename;
  if (req.files && req.files.mainImage) {
    let newFilenames = req.files.mainImage.map((file) => {
      return `${baseUrl}/uploads/${file.filename}`;
    });
    filename = newFilenames[0];
    let basename = path.basename(product.mainImage);
    let imagepath = path.join(process.cwd(), "public", "uploads", basename);
    fs.unlink(imagepath, (err) => {
      if (err) throw err;
      console.log("image.jpg was deleted");
    });
  }else{
    filename = product.mainImage;
  }
  let updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      mainImage: filename || product.mainImage,
      img: filenames || product.img,
    },
    { new: true }
  );

  res.status(200).json({ data: "success", updatedProduct });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
