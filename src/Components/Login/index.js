import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/Login/thunk";
import styles from "./login.module.css"
import FormField from "../Shared/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [userValue, setUserValue] = useState({});
  const [error, setError] = useState("")
  const history = useHistory();
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.auth.loading)

  const handlerInputChange = (name, e) => {
    setUserValue({ ...userValue, [name]: e });
    setError("");
  }

  const handlerSubmit = async () => {
    try{
      const response = await dispatch(loginUser(userValue))
      if(response){
        sessionStorage.setItem("token", response)
        sessionStorage.setItem("email", userValue.email)
        history.push("/client")
      } else {
        setError("User or Password invalid")
      }
    } catch(error){
        setError(error)
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
            placeholder="Enter email"
            useBlur={true}
            onBlur={(e) => handlerInputChange("email", e)}
          />
          <FormField
            label="Password:"
            type="password"
            placeholder="Enter password"
            useBlur={true}
            onBlur={(e) => handlerInputChange("password", e)}
          />
          {error && <p className="font-bold text-error">{error}</p>}
          <div className="py-3 flex justify-center">
            {loading ? <button onClick={handlerSubmit} className={`bg-button-login p-3 rounded-md w-28 text-white font-bold disabled ${styles.btnHover}`}><FontAwesomeIcon icon={faSpinner} spinPulse/></button> : <button onClick={handlerSubmit} className={`bg-button-login p-3 rounded-md w-28 text-white font-bold ${styles.btnHover}`}>Submit</button>}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
