import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  const token = req.body.token;
  const data = jwt.verify(token, process.env.JWT_SECRET)
  console.log("DATA",data)
  const orders = await Order.find({ email: data.email })
  console.log(orders)
  res.status(200).json({ orders })
}
export default connectDb(handler);