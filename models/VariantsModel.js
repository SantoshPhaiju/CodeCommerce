import mongoose from "mongoose";

const VariantsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  productsID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
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

export default mongoose.models.Variant ||
  mongoose.model("Variant", VariantsSchema);

// mongoose.models = {};
// export default mongoose.model("Product", ProductSchema);
