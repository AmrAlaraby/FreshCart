import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import s from "./Products.module.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export interface Product {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export default function Products() {
  let [products, setProducts] = useState([]);
      let [isLoading,setIsLoading]=useState<boolean>(false)
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("useContext must be used within a CartContextProvider");
  }
  const { addToCart,setCart } = cartContext;

  async function addProductToCart(productId:string){
    setIsLoading(true)
    let res = await addToCart(productId)
    if (res.status == 'success') {
      setCart(res)

     
      toast.success(res.message,{
        duration:2000,
        position:"top-right"
      })
    }else{
      console.log('error');
      toast.success('error adiing to the cart',{
        duration:2000,
        position:"top-right"
      })
      
    }
    
    setIsLoading(false)
  }

  function getProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
       
        setProducts(data.data);
      })
      .catch(() => {});
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
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
              <div className="w-full flex justify-center">
                <div className="btn">
                  <button onClick={()=>addProductToCart(product._id)} className="text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    {isLoading? <i className="fas fa-spinner mx-4 fa-spin"></i>:'Add to cart'}
                    
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
}
