import mongoose from "mongoose";

const connectToDb = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  mongoose.connect(process.env.MONGO_URI);
  return handler(req, res);
};
export default connectToDb;
