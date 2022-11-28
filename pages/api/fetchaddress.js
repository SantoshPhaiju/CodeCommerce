import connectToDb from '../../middleware/db'
import jwt from 'jsonwebtoken'
import User from '../../models/User';
import AddressBook from '../../models/AddressBook';

const handler = async (req, res) =>{
    if (req.method === "GET") {
      try {
        // console.log(req.body, `Headers: ${req.headers}`);
        const token = req.headers.token;
        const data = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(data);
        const userdata = await User.findById(data.id).select("-password");
        // console.log(userdata);
        const useraddress = await AddressBook.find({userid: userdata._id});
        // console.log(useraddress);
        // res.status(200).json({name: "santosh phaiju"})
        if (useraddress) {
          res.status(201).json({ success: true, useraddress });
        } else {
          res
            .status(400)
            .json({ success: false, error: "No address found." });
        }
      } catch (error) {
        console.log(error);
        res.status(400).send({ success: false, error });
      }
    }
}


export default connectToDb(handler);