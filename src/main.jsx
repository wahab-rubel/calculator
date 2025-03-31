import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import HomeLayout from "./Home/HomeLayout/HomeLayout";
import AppView from "./Views/AppView";
import store from "./Shear/store";
import Contact from "./components/Contact/Contact";

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
