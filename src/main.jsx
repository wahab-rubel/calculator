import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import HomeLayout from "./Home/HomeLayout/HomeLayout";
import AppView from "./Views/AppView";
import store from "./Shear/store";
import Contact from "./components/Contact/Contact";
import Login from "./Shear/Login/Login";
import Register from "./Shear/Registation/Registation";
import Myproducts from "./components/Myproducts/Myproducts";
import OrderSuccess from "./Shear/OrderSuccess/OrderSuccess";
import Profile from "./components/Profile/Profile";
import Products2 from "./AllProductsPages/Products2/Products2";
import HomeGarden from "./AllProductsPages/HomeGarden/HomeGarden";
import SeeReview from "./AllProductsPages/SeeReview/SeeReview";

// Define the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <AppView />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",   // Login Page Route
        element: <Login />,
      },
      {
        path: "/register", // Register Page Route
        element: <Register />,
      },
      {
        path: "/my-products",
        element: <Myproducts />
      },
      {
        path: "order-success",
        element: <OrderSuccess />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/products2",
        element: <Products2 />
      }, 
      {
        path: "/home-garden",
        element: <HomeGarden />
      },
      {
        path: "/seereview",
        element: <SeeReview />
      }
    ],
  },
]);

// Render the app with Redux, Router, and i18next support
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
