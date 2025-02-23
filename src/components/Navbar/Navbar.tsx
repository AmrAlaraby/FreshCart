import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import s from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'

export default function Navbar() {
  const cartContext = useContext(CartContext);
        if (!cartContext) {
          throw new Error("useContext must be used within a CartContextProvider");
        }
        const { cart } = cartContext;

        
  let navigate =useNavigate()
  let {userLogin,setUserLogin}:any = useContext(UserContext)
    let [navOn,setnavOn]=useState(false)

    function toggleNav():void{
      setnavOn(!navOn)
    }
    function logout() {
      localStorage.removeItem('userToken')
      setUserLogin(null)
      navigate('/login')
      
    }

    useEffect(() => {
      
    }, [])
    
  return (
    <>
    <nav className='sticky top-0 left-0 right-0 z-20 bg-main-light'>
      <div className="container mx-auto py-3 flex flex-col lg:flex-row justify-between">

        

      <div className="flex justify-between">
        <img src={logo} width={120} alt="logo" />
        <div className="p-2 hover:border-slate-900  border-2 rounded-md flex lg:hidden items-center" onClick={toggleNav}>
      <i className={navOn?"text-main fa-solid fa-xmark fa-md":" fa-solid fa-bars fa-md"}></i>
      </div></div>
      <div className={navOn?"flex ":"hidden"+" hidden lg:flex"}>
        {userLogin&&<ul className=' lg:flex  lg:items-center  flex-col lg:flex-row items-start justify-around m-0 '>
          <li className='text-md lg:py-0 py-2 mx-4 text-slate-900 font-normal'><NavLink to={'/'}> Home</NavLink></li>
          <li className='text-md lg:py-0 py-2 mx-4 text-slate-900 font-normal'><NavLink to={'/cart'}> Cart</NavLink></li>
          <li className='text-md lg:py-0 py-2 mx-4 text-slate-900 font-normal'><NavLink to={'/products'}> products</NavLink></li>
          <li className='text-md lg:py-0 py-2 mx-4 text-slate-900 font-normal'><NavLink to={'/Categories'}> Categories</NavLink></li>
          <li className='text-md lg:py-0 py-2 mx-4 text-slate-900 font-normal'><NavLink to={'/brands'}> Brands</NavLink></li>
        
        </ul>}
      </div>
      
      <div className={navOn?"flex ":"hidden"+" hidden lg:flex"}>
        <ul className='flex lg:items-center flex-col lg:flex-row justify-around m-0 lg:pl-10'>
      {userLogin== null ?<><li className='text-md lg:py-0 py-2 mx-4 text-slate-900 font-normal'><NavLink to={'/login'}> Login</NavLink></li>
          <li className='text-md lg:py-0 py-2 mx-4 text-slate-900 font-normal'><NavLink to={'/register'}> Register</NavLink></li></>:<>
          
          <li  className='text-md lg:py-0 py-2 mx-4 text-slate-900 font-normal cursor-pointer relative'><NavLink to={'/cart'}>
           <i className='fa-solid fa-cart-shopping fa-xl'></i></NavLink>
           <span className='absolute top-[-10px] right-[-10px] bg-green-600 rounded-full text-sm text-white w-[20px] h-[20px] text-center'>{cart&&cart.numOfCartItems}</span>
           
           </li>
          <li onClick={logout} className='text-md lg:py-0 py-2 mx-4 text-slate-900 font-normal cursor-pointer'> LogOut</li>
          </>}
          <li className='text-md lg:py-0 py-2 mx-4 text-slate-900 font-normal flex items-center lg:justify-between justify-start'>
            <i className='fab fa-facebook mx-2 fa-sm'></i>
            <i className='fab fa-twitter mx-2 fa-sm'></i>
            <i className='fab fa-instagram mx-2 fa-sm'></i>
            <i className='fab fa-tiktok mx-2 fa-sm'></i>
            <i className='fab fa-youtube mx-2 fa-sm'></i>
           


          </li>
          </ul>
      </div>

      </div>
    </nav>
    
    </>
  )
}
