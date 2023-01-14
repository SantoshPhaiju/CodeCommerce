import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const AddressBookSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, default: "", required: true },
    address: { type: String, default: "", required: true },
    mobile: { type: Number, required: true },
    landmark: { type: String, default: "" },
    province: { type: String, default: "", required: true },
    label: { type: String, default: "" },
    shippingAddress: { type: Boolean },
    billingAddress: { type: Boolean },
    city: { type: String, default: "", required: true },
    area: { type: String, default: "", required: true },
  },
  { timestamps: true }
);

AddressBookSchema.plugin(mongooseUniqueValidator);

export default mongoose.models.AddressBook ||
  mongoose.model("AddressBook", AddressBookSchema);

// mongoose.models = {};
// export default mongoose.model("User", UserSchema);
