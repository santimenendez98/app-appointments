// import styles from "./searchBar.module.css";
import React from "react";

function searchBar({ name, action, placeholder }) {
  return (
    <div className="mr-4">
      <div className="relative mt-2 rounded-md">
        <input
          placeholder={placeholder}
          onChange={action}
          className="block md:w-72 w-36 bg-gray-800 border-none border-b-2 border-white py-1.5 text-white placeholder:text-gray-400 sm:text-sm focus:ring-1 focus:ring-gray-600 "
        />
      </div>
    </div>
  );
}

export default searchBar;
