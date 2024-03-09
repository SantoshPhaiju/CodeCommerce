import mongoose, { Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: false, required: true },
    password: { type: String, required: true },
    phone: { type: Number, default: "" },
    dob: { type: String, default: "" },
    gender: { type: String, default: "" },
    admin: { type: Boolean, default: false },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

// UserSchema.plugin(mongooseUniqueValidator);

export default mongoose.models.User || mongoose.model("User", UserSchema);

// mongoose.models = {};
// export default mongoose.model("User", UserSchema);
