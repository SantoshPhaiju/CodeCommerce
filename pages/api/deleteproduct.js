import connectToDb from "../../middleware/db";
import Product from "../../models/Product";
import Variants from "../../models/Variants";
import path from "path";
import fs from "fs";
import { deleteProduct } from "../slices/productSlice";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const id = req.body;
    // console.log("backend id" , id)
    try {
      const product = await Product.findById(id);
      if (product) {
        const variants = await Variants.find({
          productsID: id,
        });
        const deletedVariants = await Variants.deleteMany({ productsID: id });
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (deletedProduct) {
          const mainbasename = path.basename(product.mainImage);
          console.log("mainbasename", mainbasename)
          let mainimagepath = path.join(
            process.cwd(),
            "public",
            "uploads",
            mainbasename
          );
          fs.unlink(mainimagepath, (err) => {
            if (err) throw err;
            console.log(`${mainbasename} was deleted`);
          });
          const imagepaths = deletedProduct.img.map((img) => {
            return img;
          });
          // console.log("imagepaths", imagepaths);
          imagepaths.forEach((img) => {
            const basename = path.basename(img);
            let imagepath = path.join(
              process.cwd(),
              "public",
              "uploads",
              basename
            );
            fs.unlink(imagepath, (err) => {
              if (err) throw err;
              console.log(`${basename} was deleted`);
            });
          });
        }

        if (deletedVariants.deletedCount > 0) {
          variants.map((variant, index) => {
            const mainbasename = path.basename(variant.mainImage);
            console.log("mainbasename", variant);
            let mainimagepath = path.join(
              process.cwd(),
              "public",
              "uploads",
              mainbasename
            );
            fs.unlink(mainimagepath, (err) => {
              if (err) throw err;
              console.log(`${mainbasename} was deleted`);
            });
            const imagepaths2 = variant.img.map((img) => {
              return img;
            });
            imagepaths2.forEach((img) => {
              // console.log("variantimg",img);
              const basename = path.basename(img);
              let imagepath = path.join(
                process.cwd(),
                "public",
                "uploads",
                basename
              );
              fs.unlink(imagepath, (err) => {
                if (err) throw err;
                console.log(`${basename} was deleted`);
              });
            });
          });
        }
        res
          .status(200)
          .json({ success: true, deletedProduct, deletedVariants });
      } else {
        res
          .status(400)
          .json({ success: false, error: "this product cannot be deleted" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, error: "Something went wrong" });
    }
  }
};

export default connectToDb(handler);
