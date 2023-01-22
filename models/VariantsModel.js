import mongoose from "mongoose";
import { nanoid } from "nanoid";

const VariantsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, default: nanoid(), unique: true },
  productsID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  desc: { type: String, required: true },
  img: [{ type: String, required: true }],
  category: { type: String, required: true },
  size: { type: String },
  color: { type: String },
  price: { type: Number, required: true },
  availableQty: { type: Number, required: true },
  mainImage: { type: String, required: true },
}, {
    timestamps: true
});

export default mongoose.models.Variants ||
  mongoose.model("Variants", VariantsSchema);

// mongoose.models = {};
// export default mongoose.model("Product", ProductSchema);
