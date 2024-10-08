import React from 'react';
import Link from 'next/link';
import mongoose from "mongoose";
import Product from "@/models/Product";
import Head from 'next/head';

const Tshirts = ({ products }) => {
    return (
        <section className="text-gray-600 body-font flex flex-wrap m-4 container px-5 py-24 mx-auto min-h-screen md:mt-10 mt-40">
            <Head>
                <title>Tshirts - Urban Threads.com</title>
            </Head>
            {Object.keys(products).length === 0 && <p> Sorry we are currently out of stock.New stock coming soon.Stay Tuned!</p>}
            {Object.keys(products).map((item) => {
                return (
                    <div key={products[item]._id} className="mx-[5%] lg:w-[15%] md:w-1/2 p-4 w-full shadow-2xl ">
                        <Link passHref={true} href={`/product/item/${products[item].slug}`} className="block relative  rounded overflow-hidden">
                            <img alt="ecommerce" className="w-full h-[30] md:h-[36vh] block" src={`/${products[item].img}`} />
                            <div className="mt-4">
                                <h4 className="text-gray-500 ">{products[item].category}</h4>
                                <h2 className="text-gray-900  font-bold mb-1">{products[item].title}</h2>
                                <h3 className="text-gray-500 ">{products[item].desc}</h3>
                                <p className="mt-1 font-semibold">₹ {products[item].price}</p>
                                
                            </div>
                        </Link>
                    </div>
                )
            })}
        </section>
    );
}
export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    let products = await Product.find({ category: context.query.product })
    let tshirts = {}
    for (let item of products) {
        if (item.slug in tshirts) {
            if (!tshirts[item.slug].color.includes(item.color) && item.availableQty > 0) {
                tshirts[item.slug].color.push(item.color)
            }
            if (!tshirts[item.slug].size.includes(item.size) && item.availableQty > 0) {
                tshirts[item.slug].size.push(item.size)
            }

        }
        else {
            tshirts[item.slug] = JSON.parse(JSON.stringify(item))
            if (item.availableQty > 0) {
                tshirts[item.slug].color = [item.color]
                tshirts[item.slug].size = [item.size]
            }
            else {
                tshirts[item.slug].color = []
                tshirts[item.slug].size = []
            }
        }
    }
    return {
        props: { products: JSON.parse(JSON.stringify(tshirts)) },
    }
}
export default Tshirts;
