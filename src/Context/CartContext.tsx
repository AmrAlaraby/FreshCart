import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { ShippingAddress } from "../components/Checkout/Checkout";
import { Details } from "../components/Cart/Cart";

export interface CartContextType {
    addToCart: (productId: string) => Promise<Details>;
    removeCartItem: (productId: string) => Promise<Details>;
    updateCartItem: (productId: string, count: number) => Promise<Details>;
    checkout: (cartId: string, url: string, formValues: ShippingAddress) =>  Promise<{ status: string; session: { url: string } }>;
    getCartItems: () => Promise<Details>;
    cart: Details | null;
    setCart: (value: Details | null) => void;
  }

export const CartContext = createContext<CartContextType | null>(null);

interface CartContextProviderProps {
  children: ReactNode;
}

export default function CartContextProvider({ children }: CartContextProviderProps) {
    const [cart, setCart] = useState<Details |null>(null)
  const headers = {
    token:localStorage.getItem("userToken"),
  };

  function removeCartItem(productId: string): Promise<Details> {
    return axios
      .delete<Details>(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
      .then((res) => {
        setCart(res.data);
        return res.data;
      })
      .catch((err) => {
        console.error("Error removing item:", err);
        throw err;
      });
  }
  
  function updateCartItem(productId: string, count: number): Promise<Details> {
    return axios
      .put<Details>(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers })
      .then((res) => res.data)
      .catch((err) => {
        console.error("Error updating cart item:", err);
        throw err;
      });
  }
  

  function getCartItems(): Promise<Details> {
    return axios
      .get<Details>(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => {
        setCart(res.data); // تحديث الحالة
        return res.data;
      })
      .catch((err) => {
        console.error("Error fetching cart items:", err);
        throw err;
      });
  }
  

  function addToCart(productId: string): Promise<Details> {
    return axios
      .post<Details>(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, { headers })
      .then((res) => res.data)
      .catch((err) => {
        console.error("Error adding to cart:", err);
        throw err;
      });
  }
  
  function checkout(cartId: string, url: string, formValues: ShippingAddress): Promise<{ status: string; session: { url: string } }> {
    return axios
      .post<{ status: string; session: { url: string } }>(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, 
        { ShippingAddress: formValues }, 
        { headers }
      )
      .then((res) => res.data)
      .catch((err) => {
        console.error("Error during checkout:", err);
        throw err;
      });
  }
  

  async function getCart() {
    const res = await getCartItems()

    
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
