import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import s from './Footer.module.css'

export default function Footer() {
    let [count,setcount]=useState(0)

    useEffect(() => {
      
    }, [])
    
  return (
    <footer className="bg-gray-100 mt-10 py-6 px-4 text-center text-gray-700">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
      <p className="text-lg font-semibold">Get the FreshCart app</p>
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <input type="email" placeholder="Email .." className="px-4 py-2 border rounded-lg" />
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          Share App Link
        </button>
      </div>
    </div>
    {/* <div className="mt-4 flex flex-col md:flex-row items-center justify-between text-gray-600 text-sm">
      <p>Payment Partners</p>
      <div className="flex gap-2">
        <img src="amazon-pay-logo.png" alt="Amazon Pay" className="h-6" />
        <img src="visa-logo.png" alt="Visa" className="h-6" />
        <img src="mastercard-logo.png" alt="MasterCard" className="h-6" />
        <img src="paypal-logo.png" alt="PayPal" className="h-6" />
      </div>
      <p>Get deliveries with FreshCart</p>
      <div className="flex gap-2">
        <img src="app-store.png" alt="App Store" className="h-6" />
        <img src="google-play.png" alt="Google Play" className="h-6" />
      </div>
    </div> */}
  </footer>
  )
}
