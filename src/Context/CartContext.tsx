import axios from "axios";
import { createContext, DetailsHTMLAttributes, ReactNode, useEffect, useState } from "react";
import { ShippingAddress } from "../components/Checkout/Checkout";
import { Details } from "../components/Cart/Cart";

export interface CartContextType {
  addToCart: (productId: string) => Promise<any>;
  removeCartItem: (productId: string) => Promise<any>;
  updateCartItem: (productId: string,count:number) => Promise<any>;
  checkout :(cartId: string,url:string,formValues:ShippingAddress)=> Promise<any>;
  getCartItems: () => Promise<any>;
  cart: Details | null;
  setCart: (value: Details | null) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

interface CartContextProviderProps {
  children: ReactNode;
}

export default function CartContextProvider({ children }: CartContextProviderProps) {
    const [cart, setCart] = useState<Details |null>(null)
  let headers = {
    token:localStorage.getItem("userToken"),
  };

  function removeCartItem(productId: string){
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${ productId  }`,
        
        { headers }
      )
      .then((res) => {setCart(res.data)
        return res.data})
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }
  function updateCartItem(productId: string,count:number){
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${ productId  }`,
        {count},
        { headers }
      )
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  function getCartItems(){
    return axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { headers:headers }
      )
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  function addToCart(productId: string): Promise<any> {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId  },
        { headers }
      )
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }
  function checkout(cartId: string,url:string,formValues:ShippingAddress): Promise<any> {
    debugger
    return axios
      .post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { ShippingAddress: formValues },
        { headers }
      )
      .then((res) =>res.data)
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  async function getCart() {
    let res = await getCartItems()

    
    setCart(res)
  }

  useEffect(()=>{
    getCart() 
  },[])

  return (
    <CartContext.Provider value={{ addToCart,getCartItems,removeCartItem,updateCartItem,checkout,cart,setCart }}>
      {children}
    </CartContext.Provider>
  )
}
