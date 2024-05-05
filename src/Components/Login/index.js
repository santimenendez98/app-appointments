import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Login/actions";
import styles from "./login.module.css"
import FormField from "../Shared/Input";

const Login = () => {
  const [userValue, setUserValue] = useState({});
  const [error, setError] = useState("")
  const history = useHistory();
  const dispatch = useDispatch()

  const handlerInputChange = (name, e) => {
    setUserValue({ ...userValue, [name]: e });
    setError("");
  }

  const handlerSubmit = () => {
    if (userValue.email === "prueba@prueba.com" && userValue.password === "prueba") {
      sessionStorage.setItem("email", userValue.email);
      sessionStorage.setItem("password", userValue.password);
      dispatch(login())
      history.push("/client")
    } else {
      setError("User or password incorrect")
    }
  }
  
  return (
    <div className="h-screen">
      <div className="flex">
        <div className="res-table:w-2/3 flex">
          <img src="/login_image.jpg" alt="login_image" className="opacity-90 h-screen object-cover login-img:opacity-70"></img>
        </div>
        <div className="login-img:absolute login-img:inset-0 flex flex-col justify-center items-center res-table:w-1/2">
          <div className="login-img:inline-block login-img:bg-white login-img:p-10 rounded">
          <div className="flex justify-center">
            <h1 className="font-login text-4xl">Log In</h1>
          </div>
          <FormField
            label="Email:"
            type="text"
            useBlur={true}
            onBlur={(e) => handlerInputChange("email", e)}
          />
          <FormField
            label="Password:"
            type="text"
            useBlur={true}
            onBlur={(e) => handlerInputChange("password", e)}
          />
          {error && <p className="font-bold text-error">{error}</p>}
          <div className="py-3 flex justify-center">
            <button onClick={handlerSubmit} className={`bg-button-login p-3 rounded-md w-28 text-white font-bold ${styles.btnHover}`}>Submit</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
