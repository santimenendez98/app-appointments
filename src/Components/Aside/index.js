import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Aside = (props) => {
  const pending = useSelector((state) => state.appointment.pending);
  return (
    <div className="w-full bg-aside-bg flex">
      <aside
        className={
          pending
            ? "hidden"
            : "w-64 bg-aside-bg hidden res-table:flex res-table:flex-col"
        }
      >
        <div className="bg-aside-title flex justify-center items-center p-2">
          <img className="w-40" alt="logo" src="/aside-logo.png" />
        </div>
        <Link to="/client">Prueba</Link>
      </aside>
      <div className="w-full">{props.children}</div>
    </div>
  );
};

export default Aside;
