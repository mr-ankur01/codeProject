import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckOut = ({ user, userDetail, Cart, clearCart, addToCart, removeFromCart, SubTotal }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [pincode, setPincode] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")

    const router = useRouter();

    const handleChange = async (e) => {
        if (e.target.name == "name") {
            setName(e.target.value)
        }
        else if (e.target.name == "email") {
            setEmail(e.target.value)
        }
        else if (e.target.name == "phone") {
            setPhone(e.target.value)
        }
        else if (e.target.name == "address") {
            setAddress(e.target.value)
        }
        else if (e.target.name == "pincode") {
            setPincode(e.target.value)
        }
        else if (e.target.name == "city") {
            setCity(e.target.value)
        }
        else if (e.target.name == "state") {
            setState(e.target.value)
        }

    }

    const initiatePayment = () => {
        toast.success('Order is placed.', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        saveOrder()
        setTimeout(() => {
            router.push('/');
        }, 3000);
    }

    const saveOrder = async () => {
        const products = localStorage.getItem('Cart')
        console.log(products)
        const amount = products[0].price
        const orderId = 1
        let data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addorder`, {
            method: "POST",
            body: JSON.stringify({ name, email, address, phone, pincode, city, state ,products,amount,orderId}),
            Headers: {
                "Content-type": "application/json",
            },
        })
        console.log(data)

    }
    return (
        <div className='min-h-screen md:mt-20 mt-44'>
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
            <div className='container m-auto '>
                <Head>
                    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
                    <title>CheckOut - Urban Threads.com</title>
                </Head>
                <h1 className='font-bold text-3xl my-8 text-center'>CheckOut</h1>
                <h2 className='font-bold my-8'>1.Delivery Details</h2>
                <div className='container mx-auto px-4'>
                    <h2 className='font-bold my-8 text-xl sm:text-2xl'>1. Update Delivery Details</h2>
                    <div className='flex flex-wrap'>
                        <div className='w-full md:w-1/2 px-2'>
                            <div className="relative mb-4">
                                <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                {user.value ? (
                                    <input onClick={() => setName(userDetail.name)} onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                ) : (
                                    <input value={name} onChange={handleChange} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                )}
                            </div>
                        </div>
                        <div className='w-full md:w-1/2 px-2'>
                            <div className="relative mb-4">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                {user.value ? (
                                    <input onClick={() => setEmail(userDetail.email)} value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true} />
                                ) : (
                                    <input value={email} onChange={handleChange} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-wrap'>
                        <div className='w-full md:w-1/2 px-2'>
                            <div className="relative mb-4">
                                <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                                {user.value && userDetail.phone ? (
                                    <input onClick={() => setPhone(userDetail.phone)} onChange={handleChange} value={phone} type="text" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                ) : (
                                    <input value={phone} onChange={handleChange} type="text" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                )}
                            </div>
                        </div>
                        <div className='w-full md:w-1/2 px-2'>
                            <div className="relative mb-4">
                                <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
                                {user.value && userDetail.pincode ? (
                                    <input value={pincode} onClick={() => setPincode(userDetail.pincode)} onMouseLeave={handleChange} onChange={handleChange} type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                ) : (
                                    <input value={pincode} onChange={handleChange} type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-wrap'>
                        <div className='w-full md:w-1/2 px-2'>
                            <div className="relative mb-4">
                                <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                                <input onChange={handleChange} value={city} type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className='w-full md:w-1/2 px-2'>
                            <div className="relative mb-4">
                                <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                                <input onChange={handleChange} value={state} type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                        {user.value && userDetail.address ? (
                            <textarea onClick={() => setAddress(userDetail.address)} onChange={handleChange} value={address} id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 h-15 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                        ) : (
                            <textarea value={address} onChange={handleChange} id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 h-15 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                        )}
                    </div>
                </div>

                <h2 className='font-bold my-8'>2.Review Cart items & Pay</h2>
                <div className='sideCart p-10 bg-pink-200'>
                    <ol className='list-decimal font-semibold'>
                        {Object.keys(Cart).length == 0 && <div className='my-2 '>Your Cart is Empty!</div>}
                        {Object.keys(Cart).map((k) => {
                            return <li key={k}>
                                <div className='item flex my-5'>
                                    <div className='font-semibold w-2/3'>{Cart[k].name}({Cart[k].size}/{Cart[k].variant})</div>
                                    <div className=' flex items-center justify-center font-semibold w-1/3'><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, Cart[k].price, Cart[k].name, Cart[k].size, Cart[k].variant) }} className='text-pink-400 text-xl cursor-pointer' /><span className='mx-2 text-sm'>{Cart[k].qty}</span><AiFillPlusCircle onClick={() => { addToCart(k, 1, Cart[k].price, Cart[k].name, Cart[k].size, Cart[k].variant) }} className='text-pink-400 text-xl cursor-pointer' /></div>
                                </div>
                            </li>
                        })}
                    </ol>
                    <div className='font-bold text-xl'>SubTotal: ₹{SubTotal}</div>
                </div>
                <div className='flex  mt-5'>
                    <button onClick={initiatePayment} className=" flex m-1 text-white bg-pink-500 border-0 py-3 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillBagCheckFill className='m-1' />PAY  ₹{SubTotal}</button>
                </div>
            </div>
        </div>
    );
}
export default CheckOut;
