
import { useEffect } from 'react'
import { useState } from 'react'

import axios from 'axios';
import Loader from '../Loader/Loader';
import { Category } from '../products/products';

export default function Categories() {
     const [categories, setCategories] = useState([]);

    function getCategories() {
      axios
        .get(`https://ecommerce.routemisr.com/api/v1/categories`)
        .then(({ data }) => {
         
          setCategories(data.data);
        })
        .catch(() => {});
    }

    useEffect(() => {
      getCategories()
    }, [])
    
  return (
    <>
     <div className="row justify-center">
      {categories.length > 0 ? (
        categories.map((category: Category) => (
          <div
            key={category._id}
            className="lg:w-1/3 md:w-1/2 w-full p-2"
          >
            <div className="product p-2 ">
              
              <div className="flex justify-center">
                <img
                  className="img-fluid ratio-4x3 w-full aspect-[75%] object-cover h-[300px]"
                  src={category.image}
                  alt={category.name}
                />
              </div>
              
              <h3 className="text-2xl text-center text-green-600">
                {category.name}
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
