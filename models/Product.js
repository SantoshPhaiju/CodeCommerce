import mongoose from "mongoose";
import { nanoid } from "nanoid";

const ProductSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, default: nanoid(), unique: true },
    desc: { type: String, required: true },
    mainImage: { type: String, required: true },
    img: [{ type: String, required: true }],
    category: { type: String, required: true },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    availableQty: { type: Number, required: true },
    variants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Variant",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);

// mongoose.models = {};
// export default mongoose.model("Product", ProductSchema);
