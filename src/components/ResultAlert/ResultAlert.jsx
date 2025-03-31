import React from "react";
import { BsXLg } from "react-icons/bs";

const ResultAlert = ({ RemoveAlert }) => {
  
  return (
    <div className="h-20 px-8 bg-green-400 text-white flex justify-between items-center rounded mt-5">
      <div className="flex items-center">
        <svg className="h-5 w-5 mr-6 fill-white">
          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
        </svg>
        <p className="bg-transparent font-bold">{("successSent")}</p>
      </div>
      <button className="text-white hover:text-blue-800" onClick={RemoveAlert}>
        <BsXLg />
      </button>
    </div>
  );
};

export default ResultAlert;
