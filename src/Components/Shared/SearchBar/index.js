// import styles from "./searchBar.module.css";
import React from "react";

function searchBar({ name, action, placeholder }) {
  return (
    <div className="mr-4">
      <div className="relative mt-2 rounded-md">
        <input
          placeholder={placeholder}
          onChange={action}
          className="block md:w-72 w-36 bg-white border border-search py-1.5 text-black placeholder:text-gray-400 sm:text-sm "
        />
      </div>
    </div>
  );
}

export default searchBar;
