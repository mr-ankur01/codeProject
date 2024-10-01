import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    if (req.method == "POST") {
        for (let data of req.body) {
            let p = new Product({
                title: data.title,
                slug: data.slug,
                img: data.img,
                desc: data.desc,
                category: data.category,
                size: data.size,
                color: data.color,
                price: data.price,
                availableQty: data.availableQty
            })
            await p.save();
        }
        res.status(200).json({ success: "success" })
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }

}
export default connectDb(handler);