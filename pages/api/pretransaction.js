import axios from "axios";
import connectToDb from "../../middleware/db";
import Order from "../../models/Order";

const handler = async (req, res) => {
    if (req.method === "POST") {
        // console.log(req.body.data);
        // Initiate an order corresponding to the order id

        // TODO: check if the cart is tampered with   
    
        // TODO: check if the cart items are out of stock

        // TODO: check if the details are vaild or not


    console.log(req.body);
    const {name, email, phone, address, pincode, orderId, subTotal, cart, id} = req.body.data;
    const oldOrder = await Order.findById(id);
    if(oldOrder){
      console.log(oldOrder);
      let updatedOrder = await Order.findOneAndUpdate({orderId: oldOrder.orderId}, {address: address, amount: subTotal, products: cart})
      res.status(200).send({data: updatedOrder});
    }else{
      const order = new Order({
        email, orderId, address, amount: subTotal, products: cart
      })
      await order.save();
      res.status(200).send("successfull")
    }
  }
}

export default connectToDb(handler);
