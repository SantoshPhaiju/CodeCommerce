// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import connectToDb from "../../middleware/db";
import Order from "../../models/Order";
import Product from "../../models/Product";

const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body.data);

    const payload = req.body.data;
    let data = {
      token: payload.token,
      amount: payload.amount,
    };
    // console.log(data);
    // console.log(payload.orderData);

    let config = {
      headers: {
        Authorization: `KEY ${process.env.KHALTI_TEST_SECRET_KEY}`,
      },
    };

    try {
      const response = await axios.post(
        "https://khalti.com/api/v2/payment/verify/",
        data,
        config
      );
      if (response) {
        console.log(response.data);
        let result = response.data;
        let order = await Order.findOneAndUpdate(
          { orderId: response.data.product_identity },
          { status: "Paid", paymentInfo: response.data }
        );
        // console.log("order = " + order);
        
        // Adding the stock less logic here in database
        let product;
        Object.keys(order.products).map(async (item) =>{
          product = await Product.findOne({ slug:  item});
          // console.log(item);
          let newQty = product.availableQty - order.products[item].qty;
          await Product.findOneAndUpdate(
            { slug: item },
            { availableQty: newQty }
          );
          // console.log("product = " + product);
        })
        res.status(200).json({ success: true, data: result, id: order._id });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({ success: false, data: error.data });
    }

    // res.status(200).json({success: "Great it's working"})
  } else {
    res.status(200).json({ name: "John Doe" });
  }
};

export default connectToDb(handler);
