import mongoose from "mongoose";

mongoose.set("strictQuery", false);
const connectToDb = (handler) => async (req, res) => {
  // if (mongoose.connections[0].readyState) {
  //   return handler(req, res);
  // }
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGO_URI);
  return handler(req, res);
};
export default connectToDb;
