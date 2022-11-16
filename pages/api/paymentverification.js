// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default function handler(req, res) {
    if(req.method === 'POST'){
        console.log(req.body.data);
        const payload = req.body.data;
        let data = {
          token: payload.token,
          amount: payload.amount,
        };
        console.log(data);

        let config = {
          headers: {
            Authorization: `KEY ${process.env.KHALTI_TEST_SECRET_KEY}`,
          },
        };
        console.log(process.env.KHALTI_TEST_SECRET_KEY);

        axios
          .post("https://khalti.com/api/v2/payment/verify/", data, config)
          .then((response) => {
            console.log(response.data);
            res.status(200).json({data: response.data})
          })
          .catch((error) => {
            console.log(error);
            res.status(400).send({success: false, error: res.data})
          });
        // res.status(200).json({success: "Great it's working"})
    }else{
        res.status(200).json({ name: "John Doe" });
    }
}
