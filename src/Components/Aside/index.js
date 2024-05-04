import React, {useState} from "react";
import { Link , useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../Shared/ConfirmModal";
import { logout } from "../../Redux/Login/actions";

const Aside = (props) => {
  const pending = useSelector((state) => state.appointment.pending);
  const [modal, setModal] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const signOut = () => {
    sessionStorage.clear()
    dispatch(logout());
    history.push("/")
  } 
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
        <div className="p-5 flex flex-col">
          <Link to="/client" className="text-white font-bold p-2">Lista de clientes</Link>
          <Link className="text-white font-bold p-2" onClick={() => setModal(true)}>Cerrar Sesion</Link>
        </div>
      </aside>
      <div className="w-full">{props.children}</div>
      {modal && <ConfirmModal title="Sign Out" actionCancel={() => setModal(false)} actionDelete={() => signOut()}/>}
    </div>
  );
};

export default Aside;
