// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import connectToDb from "../../middleware/db";
import Order from "../../models/Order";

const handler = async (req, res) => {
  if (req.method === "POST") {
    // console.log(req.body.data);

    const payload = req.body.data;
    let data = {
      token: payload.token,
      amount: payload.amount,
    };
    // console.log(data);
    console.log(payload.orderData);

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
        // console.log(response.data);
        let result = response.data;
        res.status(200).json({ success: true, data: result });
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
