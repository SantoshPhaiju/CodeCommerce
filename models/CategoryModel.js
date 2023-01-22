import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// export default mongoose.models.Category || mongoose.model("Category", CategorySchema);
mongoose.models = {};
export default mongoose.model("Category", CategorySchema);

