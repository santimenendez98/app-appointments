import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../Shared/ConfirmModal";
import { logOutUser } from "../../Redux/Login/thunk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { getUser } from "../../Redux/User/thunk";

const Aside = (props) => {
  const pending = useSelector((state) => state.appointment.pending);
  const user = useSelector((state) => state.user.data);
  const filteredUser = user.filter((user) => user.email === localStorage.getItem("email"));
  const [modal, setModal] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser)
  },[dispatch])

  const signOut = () => {
    dispatch(logOutUser())
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="h-screen bg-aside-bg flex">
      {props.close ? (
        <>
          <aside
            className={
              "w-72 h-full bg-aside-bg res-table:hidden block absolute top-0 left-0"
            }
          >
            <div className="bg-aside-title flex justify-center items-center p-2">
              <img className="w-60" alt="logo" src="/aside-logo.png" />
            </div>
            <div className="mt-10 flex flex-col items-center">
            <h1 className="text-logoColor font-bold px-2 mb-5">{filteredUser[0]?.name} {filteredUser[0]?.lastName}</h1>
              <Link to="/users" className="text-white font-bold p-2 hover:text-red-500">
                Usuarios
              </Link>
              <Link
                to="/client"
                className="text-white font-bold p-2 hover:text-red-500"
              >
                Lista de clientes
              </Link>
              <button
                className="text-white font-bold p-2 hover:text-red-500"
                onClick={() => setModal(true)}
              >
                Cerrar Sesion
              </button>
              <button
                className="text-white font-bold p-2"
                onClick={props.close}
              >
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  style={{ color: "#fa000c" }}
                  size="xl"
                />
              </button>
            </div>
          </aside>
        </>
      ) : (
        <>
          <aside
            className={
              pending
                ? "hidden"
                : "w-64 h-full bg-aside-bg hidden res-table:flex res-table:flex-col"
            }
          >
            <div className="bg-aside-title flex justify-center items-center p-2">
              <img className="w-40" alt="logo" src="/aside-logo.png" />
            </div>
            <div className="p-5 flex flex-col items-center">
              <p className="text-logoColor font-bold px-2 mb-5">{filteredUser[0]?.name} {filteredUser[0]?.lastName}</p>
              <Link to="/users" className="text-white font-bold p-2 hover:text-red-500">
                Usuarios
              </Link>
              <Link
                to="/client"
                className="font-bold p-2 text-white hover:text-red-500"
              >
                Lista de clientes
              </Link>
              <button
                className="text-white font-bold p-2 hover:text-red-500"
                onClick={() => setModal(true)}
              >
                Cerrar Sesion
              </button>
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
