// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../models/Product";
import connectToDb from "../../middleware/db";

const handler = async (req, res) => {
  let products = await Product.find();
  let tshirts = {}
  for(let item of products){
    if(item.title in tshirts){
      if(item.availableQty > 0){
        tshirts[item.title].availableQty += item.availableQty;
      }
     if(!tshirts[item.title].color.includes(item.color) && item.availableQty > 0){
      tshirts[item.title].color.push(item.color);
     }
     if(!tshirts[item.title].size.includes(item.size) && item.availableQty > 0){
      tshirts[item.title].size.push(item.size);
     }
    }else{
      // console.log(item);
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      if(item.availableQty > 0){
        tshirts[item.title].color = [item.color]
        tshirts[item.title].size = [item.size]
      }
    }
  }
  res.status(200).json({ tshirts });
};

export default connectToDb(handler);
