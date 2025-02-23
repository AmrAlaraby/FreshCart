import React, { ReactNode } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import s from './ProtectedRoure.module.css'
import { Navigate } from 'react-router-dom';


type UserContextProviderProps = {
  children: ReactNode; // Corrected typo and added type
};
export default function ProtectedRoute({
  children,
}: UserContextProviderProps) {
    let [count,setcount]=useState(0)

    if (localStorage.getItem('userToken') !== null) {
      return children
    }else{
      return <Navigate to={'/login'}/>
    }

    useEffect(() => {
      
    }, [])
    
  return (
    <div>ProtectedRoure</div>
  )
}
