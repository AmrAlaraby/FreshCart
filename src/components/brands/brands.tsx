import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import s from './Brands.module.css'
import { Brand } from '../products/products'
import axios from 'axios'
import Loader from '../Loader/Loader'

export default function Brands() {



    let [brands, setbrands] = useState([]);

    function getbrands() {
      axios
        .get(`https://ecommerce.routemisr.com/api/v1/brands`)
        .then(({ data }) => {
         
          setbrands(data.data);
        })
        .catch(() => {});
    }

    useEffect(() => {
      getbrands()
    }, [])
    
  return (
    <>
     <div className="row justify-center">
      {brands.length > 0 ? (
        brands.map((brand: Brand) => (
          <div
            key={brand._id}
            className="lg:w-1/3 md:w-1/2 w-full p-2"
          >
            <div className="product p-2 ">
              
              <div className="flex justify-center">
                <img
                  className="img-fluid ratio-4x3 w-full aspect-[75%] object-cover h-[300px]"
                  src={brand.image}
                  alt={brand.name}
                />
              </div>
              
              <h3 className="text-2xl text-center text-green-600">
                {brand.name}
              </h3>

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

