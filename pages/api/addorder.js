import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    try {
        if (req.method == "POST") {
            console.log("MYDATA",req.body)
            for (let data of [req.body]) {
                console.log(data.email)
                let p = new Order({
                    email: data.email,
                    name: data.name,
                    phone: data.phone,
                    address: data.address,
                    pincode: data.pincode,
                    city: data.city,
                    state: data.state,
                    orderId: data.orderId,
                    products: data.products,
                    amount: data.amount,
                    status: data.status,
                    delivery: data.delivery,
                })
                await p.save();
                console.log('order is added')
            }
            res.status(200).json({ success: "success" })
        }
        else {
            res.status(400).json({ error: "This method is not allowed" })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err })
    }
}
export default connectDb(handler);