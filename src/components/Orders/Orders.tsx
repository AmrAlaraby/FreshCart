import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import s from './Orders.module.css'
import Loader from '../Loader/Loader'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Product } from '../products/products'
import toast from 'react-hot-toast'

export default function Orders() {

    let [products, setProducts] = useState([]);
    let navigate=useNavigate()

    function getOrders() {
      axios
        .get(`https://ecommerce.routemisr.com/api/v1/orders/user/67ba16871f4f9e6c0942f962`)
        .then(({ data }) => {
          
          toast.error(`getUserOrders api res is : ${data} `)
        })
        .catch(() => {});
    }

    useEffect(() => {
      getOrders()
      setTimeout(() => {
        navigate('/')
      }, 4000);
    }, [])
    
  return (
    <>
    <div className="row justify-center">
      {products.length > 0 ? (
        products.map((product: Product) => (
          <div
            key={product.id}
            className="lg:w-1/6 md:w-1/4 sm:w-1/2 w-full p-2"
          >
            <div className="product p-2 ">
              <Link to={`/productdetails/${product.id}`}>
              <div className="flex justify-center">
                <img
                  className="w-auto h-[315px]"
                  src={product.imageCover}
                  alt={product.title}
                />
              </div>
              <span className="block font-light text-main">
                {product.category.name}
              </span>
              <h3 className="text-lg text-slate-800">
                {product.title.split(" ").slice(0, 2).join(" ")}
              </h3>
              <div className="flex justify-between items-center">
                <p>Price: ${product.price}</p>
                <p>
                  <i className="fas fa-star text-yellow-400"></i>
                  {product.ratingsAverage}
                </p>
              </div></Link>
             
            </div>
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
    </>
  )
}
