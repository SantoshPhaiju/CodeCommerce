import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: {type: Number, default: ""},
    dob: {type: String, default: ""},
    gender: {type: String, default: ""}
  },
  { timestamps: true }
);

UserSchema.plugin(mongooseUniqueValidator);

export default mongoose.models.User || mongoose.model("User", UserSchema);

// mongoose.models = {};
// export default mongoose.model("User", UserSchema);
