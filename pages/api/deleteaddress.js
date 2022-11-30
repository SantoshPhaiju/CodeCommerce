import connectToDb from "../../middleware/db";
import AddressBook from "../../models/AddressBook";

const handler = async (req, res) =>{
    if(req.method === 'DELETE'){
        const id = req.body;
        try {
            const deletedAddress = await AddressBook.findByIdAndDelete(id);
            res.status(200).json({success: true, deletedAddress});
        } catch (error) {
            console.log(error);
            res.status(400).json({success: false, error: "Something went wrong"});
        }
    }
}


export default connectToDb(handler);