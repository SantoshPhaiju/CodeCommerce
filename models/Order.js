import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema({
    userId: {type: String, required: true},
    products: [{
        productId: {type:String},
        quantity: {type: Number, default: 1}
    }],
    address: {type: String, required: true},
    amount: {type: Number, required: true}, 
    status: {type: String, default: "Pending", required: true}
}, {timestamps: true});

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);