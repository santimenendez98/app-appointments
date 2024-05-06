import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../Shared/ConfirmModal";
import { logout } from "../../Redux/Login/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Aside = (props) => {
  const pending = useSelector((state) => state.appointment.pending);
  const [modal, setModal] = useState(false);
  const [showAside, setShowAside] = useState(false)
  const history = useHistory();
  const dispatch = useDispatch();

  const signOut = () => {
    sessionStorage.clear();
    dispatch(logout());
    history.push("/");
  };

  return (
    <div className="h-screen bg-aside-bg flex">
      {props.show ? (
        <>
          <aside
            className={
              showAside
                ? "hidden"
                : "w-72 bg-aside-bg res-table:hidden"
            }
          >
            <div className="bg-aside-title flex justify-center items-center p-2">
              <img className="w-60" alt="logo" src="/aside-logo.png" />
            </div>
            <div className="mt-10 flex flex-col items-center">
              <Link to="/client" className="text-white font-bold p-2 hover:text-red-500">
                Lista de clientes
              </Link>
              <Link
                className="text-white font-bold p-2 hover:text-red-500"
                onClick={() => setModal(true)}
              >
                Cerrar Sesion
              </Link>
              <button className="text-white font-bold p-2" onClick={() => setShowAside(!showAside)}><FontAwesomeIcon icon={faCircleXmark} style={{color: "#fa000c",}} size="xl" /></button>
            </div>
          </aside>
        </>
      ) : (
        <>
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
            <div className="p-5 flex flex-col">
              <Link to="/client" className="font-bold p-2 text-white hover:text-red-500">
                Lista de clientes
              </Link>
              <Link
                className="text-white font-bold p-2 hover:text-red-500"
                onClick={() => setModal(true)}
              >
                Cerrar Sesion
              </Link>
            </div>
          </aside>
          <div className="w-full">{props.children}</div>
        </>
      )}
      {modal && (
        <ConfirmModal
          title="Sign Out"
          actionCancel={() => setModal(false)}
          actionDelete={() => signOut()}
        />
      )}
    </div>
  );
};

export default Aside;
