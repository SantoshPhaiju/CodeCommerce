import axios from "axios";
import connectToDb from "../../middleware/db";
import Order from "../../models/Order";
import Product from "../../models/Product"

const handler = async (req, res) => {
  if (req.method === "POST") {
    // console.log(req.body.data);
    const {
      name,
      email,
      phone,
      address,
      pincode,
      orderId,
      subTotal,
      cart,
      id,
    } = req.body.data;

    // TODO: check if the cart is tampered with
    let product, sumTotal = 0;
    console.log(cart);
   for(let item in cart){
    console.log(cart[item]);
    product = await Product.findOne({slug: item});
    console.log(product);
    sumTotal += cart[item].price * cart[item].qty;
    console.log(product.price, cart[item].price);
    if(product.price !== cart[item].price){
      res.status(200).json({success: false, error: "1:The price of the some items has been changed in your cart. Please try again!"})
      return 
    }
  }
  if(sumTotal !== subTotal){
     res
      .status(200)
      .json({
        success: false,
        error:
          "2:The price of the some items has been changed in your cart. Please try again!",
      });
      return 
  }

    // TODO: check if the cart items are out of stock

    // TODO: check if the details are vaild or not

    // Initiate an order corresponding to the order id
    // Checking if the order already exists in our database and updating it.
    const oldOrder = await Order.findById(id);
    if (oldOrder) {
      // console.log(oldOrder);
      let updatedOrder = await Order.findOneAndUpdate(
        { orderId: oldOrder.orderId },
        { address: address, amount: subTotal, products: cart }
      );
      res.status(200).send({ success: true, data: updatedOrder });
    } else {
      // Creating the new order
      const order = new Order({
        email,
        orderId,
        address,
        amount: subTotal,
        products: cart,
      });
      await order.save();
      res.status(200).send({success: true});
    }
  }
};

export default connectToDb(handler);
