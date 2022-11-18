import connectToDb from "../../middleware/db"
import Order from "../../models/Order";


const handler = async (req, res) => {
    if(req.method === "DELETE")
        console.log(req.body);
        const order = await Order.findOneAndDelete(req.body.data);
        console.log(order);
        res.status(200).json({success: true, msg: "Order successfully deleted.", order});
}

export default connectToDb(handler);