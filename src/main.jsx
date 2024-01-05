import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Display from "./Components/Display/Display";
import Home from "./Components/Display/Home/Home";
import AddProduct from "./Components/Add-product/AddProduct";
import UpdateProduct from "./Components/Update Product/UpdateProduct";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import UserControl from "./Components/User Control/UserControl";
import AllPost from "./Components/All post/AllPost";
import AuthProvider from "./Components/AuthProvider/AuthProvider";
import AllMyPost from "./Components/All-My-Post/AllMyPost";
import Products from "./Components/Product/Products";
import PrivateRoute from "./Components/Private Route/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SingleProduct from "./Components/Single Product/SingleProduct";
import Cart from "./Components/Cart/Cart";
import DashBoard from "./Components/DashBoard/DashBoard";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Display />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },

      {
        path: "update-product/:id",
        element: <UpdateProduct />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "user-list",
        element: <UserControl />,
      },
      {
        path: "all-post",
        element: <AllPost />,
      },
      {
        path: "all-my-post",
        element: <AllMyPost />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "dashboard",
        element: <DashBoard />,
      },
      {
        path: "products",
        element: (
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        ),
      },
      {
        path: "product/:id",
        element: (
          <PrivateRoute>
            <SingleProduct />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
);
