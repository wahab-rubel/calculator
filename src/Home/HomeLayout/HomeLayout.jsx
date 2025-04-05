import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer"; 
import { Outlet } from "react-router-dom"; 
import Slider from "@/Shear/Slider/Slider";
import Home from "../Home";


const HomeLayout = () => {
  return (
    <div className="flex mt-14">
  
      <div className="flex-1 flex flex-col w-full">
        {/* Header */}
        <Header />
       <Slider />
       <Home />
        {/* Main Content Area */}
        <main className="flex-1">
          <Outlet /> {/* Renders the child route components */}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
