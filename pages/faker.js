import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

const Tshirts = ({ products }) => {
    return (
        <section className="text-gray-600 body-font flex flex-wrap m-4 container px-5 py-24 mx-auto min-h-screen md:mt-10 mt-40">
            <Head>
                <title>Tshirts - Urban Threads.com</title>
            </Head>
            {products.length === 0 && <p> Sorry all the tshirts are curently out of stock.New stock coing soon.Stay Tuned!</p>}
            {products.map((item) => {
                return (
                    <div key={item.id} className="mx-[5%] lg:w-[15%] md:w-1/2 p-4 w-full shadow-2xl ">
                        <Link passHref={true} href={`/product/${item.id}`} className="block relative  rounded overflow-hidden">
                            <img alt="ecommerce" className="w-full h-[30] md:h-[36vh] block" src={item.image} />
                            <div className="mt-4">
                                <h4 className="text-gray-500 ">{item.category}</h4>
                                <h2 className="text-gray-900  font-bold mb-1">{item.title}</h2>
                                <h3 className="text-gray-500 ">{item.desc}</h3>
                                <p className="mt-1 font-semibold">₹ {item.price}</p>

                            </div>
                        </Link>
                    </div>
                )
            })}
        </section>
    );
}
export async function getServerSideProps(context) {
    let products = await fetch("https://fakestoreapi.com/products/category/men's clothing")
    let data = await products.json()
    return {
        props: { products: JSON.parse(JSON.stringify(data)) },
    }
}
export default Tshirts;
