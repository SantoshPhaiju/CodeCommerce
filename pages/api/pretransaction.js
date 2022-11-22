import axios from "axios";
import connectToDb from "../../middleware/db";
import Order from "../../models/Order";
import Product from "../../models/Product";

const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body.data);
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

    // Doing some of the validatoins here
    if (name.length < 3) {
      res.status(200).json({
        success: "check",
        error: "Name must be at least 3 character long",
      });
      return;
    }
    if (phone.length < 10) {
      res.status(200).json({
        success: "check",
        error: "Number must be at least of 10 digits.",
      });
      return;
    }
    if (pincode.length < 5) {
      res.status(200).json({
        success: "check",
        error: "Please enter a valid pincode",
      });
      return;
    }

    //  check if the cart is tampered with
    let product,
      sumTotal = 0;
    if (subTotal <= 0) {
      res.status(200).json({
        success: "check",
        error: "Your cart is empty! Please build your cart and try again!",
      });
      return;
    }
    for (let item in cart) {
      // console.log(cart[item]);
      product = await Product.findOne({ slug: item });
      // console.log(product);
      sumTotal += cart[item].price * cart[item].qty;
      // console.log(product.price, cart[item].price);
      // console.log(product.availableQty);
      // TODO: check if the cart items are out of stock --done
      if (product.availableQty < cart[item].qty) {
        res.status(200).json({
          success: "check",
          error:
            "Some items in your cart is out of stock! Try reducing the quantity!",
        });
        return;
      }
      if (product.price !== cart[item].price) {
        let order = await Order.findById(id);
        let deleteorder;
        if (order) {
          deleteorder = await Order.findByIdAndDelete(id);
        }
        res.status(200).json({
          success: false,
          error:
            "1:The price of the some items has been changed in your cart. Please try again!",
          deleteorder,
        });
        return;
      }
    }
    if (sumTotal !== subTotal) {
      res.status(200).json({
        success: false,
        error:
          "2:The price of the some items has been changed in your cart. Please try again!",
      });
      return;
    }

    // TODO: check if the details are vaild or not

    // Initiate an order corresponding to the order id
    // Checking if the order already exists in our database and updating it.
    console.log(cart);
    const oldOrder = await Order.findById(id);
    if (oldOrder) {
      // console.log(oldOrder);
      // console.log(cart);
      let updatedOrder = await Order.findOneAndUpdate(
        { orderId: oldOrder.orderId },
        {
          address: address,
          amount: subTotal,
          products: cart,
          pincode,
          phone,
          name,
        }
      );
      res.status(200).send({ success: true, data: updatedOrder });
    } else {
      // Creating the new order
      const order = new Order({
        email,
        pincode,
        phone,
        name,
        orderId,
        address,
        amount: subTotal,
        products: cart,
      });
      await order.save();
      res.status(200).send({ success: true });
    }
  }
};

export default connectToDb(handler);
