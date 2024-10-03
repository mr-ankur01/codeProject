import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Product from '@/models/Product'
import mongoose from 'mongoose'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

export default function Page({ buyNow, addToCart, product, variants }) {
  const router = useRouter()
  const [pin, setPin] = useState()
  const [service, setService] = useState()
  const [color, setColor] = useState(product.color);
  const [size, setSize] = useState(product.size);
  const [stock, setStock] = useState(true);

  useEffect(() => {
    setColor(product.color)
    setSize(product.size)
    if (product.availableQty > 0) { setStock(true) }
    else {
      setStock(false)
    }
  }, [router.query])

  const checkServiceability = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
    let pinJson = await pins.json()
    if (Object.keys(pinJson).includes(pin)) {
      setService(true)
      toast.success('Pincode is serviceable', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else {
      setService(false)
      toast.error('Sorry! Pincode not serviceable', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const onChangePin = (e) => {
    setPin(e.target.value)
  }
  let stylecss = {font:"solid"}

  const refreshvariant = (newColor, newSize) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newColor][newSize]["slug"]}`
    // window.location=url
    router.push(url)
  }
  return (
    <section className="text-gray-600 body-font min-h-screen overflow-hidden md:mt-10 mt-40">
      <div className="bg-red-500 bg-yellow bg-blue bg-white bg-black"></div>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Head>
        <title>{product.title} - Urban Threads.com</title>
      </Head>
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-contain lg:object-cover object-center"
            src={`/${product.img}`}
          />

          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.category}</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>
            <p className="leading-relaxed">{product.desc}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color :</span>
                <p style={stylecss}>{product.color}</p>
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size :</span>
                <div className="relative">
                <p>{product.size}</p>

                </div>
              </div>
            </div>
            <div className="flex">
              {stock ? (
                <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>
              ) : (
                <span className="title-font font-medium text-2xl text-gray-900">Out of stock!</span>
              )}
              <div className='flex'>
                <button
                  disabled={!stock}
                  onClick={() => buyNow(product.slug, 1, product.price, product.title, size, color, product.img)}
                  className="disabled:bg-pink-300 flex mx-5 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded"
                >
                  Buy Now
                </button>
                <button
                  disabled={!stock}
                  onClick={() => addToCart(product.slug, 1, product.price, product.title, size, color, product.img)}
                  className="disabled:bg-pink-300 flex mx-5 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded"
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div className='pin mt-6 flex space-x-2 text-sm'>
              <input
                onChange={onChangePin}
                type='text'
                className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Enter your pincode'
              />
              <button
                onClick={checkServiceability}
                className="flex ml-10 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded"
              >
                Check
              </button>
            </div>
            {service === false && service != null &&
              <div className='text-red-500 mt-3 text-sm'>
                Sorry! We do not deliver to this pincode yet.
              </div>
            }
            {service === true && service != null &&
              <div className='text-green-500 mt-3 text-sm'>
                Yay! This pincode is serviceable.
              </div>
            }
          </div>
        </div>
      </div>
    </section>

  )
}
export async function getServerSideProps(context) {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    let product = await Product.findOne({ slug: context.query.slug })
    let variants = await Product.find({ title: product.title, category: product.category })
    let colorSizeSlug = {}
    for (let item of variants) {
      if (Object.keys(colorSizeSlug).includes(item.color)) {
        colorSizeSlug[item.color][item.size] = { slug: item.slug }
      }
      else {
        colorSizeSlug[item.color] = {}
        colorSizeSlug[item.color][item.size] = { slug: item.slug }
      }
    }
    return {
      props: { product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) },
    }
  } catch (err) {
    console.log(err)
    return {props : null  }
  }
}