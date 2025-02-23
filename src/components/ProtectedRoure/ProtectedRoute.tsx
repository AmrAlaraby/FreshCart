import React, { ReactNode } from 'react'

import { Navigate } from 'react-router-dom';


type UserContextProviderProps = {
  children: ReactNode; // Corrected typo and added type
};
export default function ProtectedRoute({
  children,
}: UserContextProviderProps) {


    if (localStorage.getItem('userToken') !== null) {
      return children
    }else{
      return <Navigate to={'/login'}/>
    }


    
}
