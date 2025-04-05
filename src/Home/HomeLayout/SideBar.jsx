import React, { useState } from "react";

const SideBar = ({ filterP, setAllCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}  // Mouse hover করলে open হবে
      onMouseLeave={() => setIsOpen(false)} // Mouse সরালে বন্ধ হবে
    >
      <button className="p-3 bg-gray-800 text-white w-full rounded-md">
        Categories
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
          <button 
            onClick={setAllCategory} 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
          >
            All Categories
          </button>
          <button 
            onClick={() => filterP("Laptop")} 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
          >
            Laptops
          </button>
          <button 
            onClick={() => filterP("Phone")} 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
          >
            Phones
          </button>
          <button 
            onClick={() => filterP("Accessories")} 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
          >
            Accessories
          </button>
        </div>
      )}
    </div>
  );
};

export default SideBar;
