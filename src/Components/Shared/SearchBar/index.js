// import styles from "./searchBar.module.css";
import React from "react";

function searchBar({ name, action }) {
  return (
    <div className="mr-4 flex">
      <div className="mt-3 mr-4">
        <label
          htmlFor="price"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {name}
        </label>
      </div>
      <div className="relative mt-2 rounded-md">
        <input
          onChange={action}
          className="block w-96 rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}

export default searchBar;
