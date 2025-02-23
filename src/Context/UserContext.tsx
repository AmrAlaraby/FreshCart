import { createContext, useState, ReactNode, useEffect } from "react";

// Define the type for the context value
type UserContextType = {
  userLogin: string | null; // Adjust the type according to your needs
  setUserLogin: (userLogin: string | null) => void;
};

// Create the context with an initial value and type
export const UserContext = createContext<UserContextType | null>(null);

// Define the props for the provider component
type UserContextProviderProps = {
  children: ReactNode; // Corrected typo and added type
};

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [userLogin, setUserLogin] = useState<string | null>(null);

  useEffect(()=>{
    if (localStorage.getItem('userToken') !== null ) {
      setUserLogin(localStorage.getItem('userToken'))
    }
  })

  return (
    <UserContext.Provider value={{ userLogin, setUserLogin }}>
      {children}
    </UserContext.Provider>
  );
}