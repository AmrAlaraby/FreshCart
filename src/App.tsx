import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/layout";
import Home from "./components/home/home";
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import Products from "./components/products/products";
import Categories from "./components/categories/categories";
import Brands from "./components/brands/brands";
import Notfound from "./components/Notfound/Notfound";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoure/ProtectedRoute";
import Cart from "./components/Cart/Cart";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Checkout from "./components/Checkout/Checkout";
import Orders from "./components/Orders/Orders";
import Forgetpassword from "./components/Forgetpassword/Forgetpassword";
import Verifycode from "./components/Verifycode/Verifycode";
import Resetpassword from "./components/Resetpassword/resetpassword";

const query = new QueryClient();

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "register",
          element: <Signup />,
        },
        {
          path: "login",
          element: <Signin />,
        },
        {
          path: "forgetpassword",
          element: <Forgetpassword />,
        },
        {
          path: "verify-code",
          element: <Verifycode />,
        },
        {
          path: "reset-password",
          element: <Resetpassword />,
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout/:id",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },

        {
          path: "*",
          element: <Notfound />,
        },
      ],
    },
  ]);

  return (
    <>
    <CartContextProvider>
      <QueryClientProvider client={query}>
        <UserContextProvider>
          <RouterProvider router={routes} />
          <Toaster />
        </UserContextProvider>
      </QueryClientProvider>
      </CartContextProvider>
    </>
  );
}

export default App;
