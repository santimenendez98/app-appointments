import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Login = () => {
  const [userValue, setUserValue] = useState({});
  const history = useHistory();

  const handlerInputChange = (e) => {
    setUserValue({...userValue, [e.target.name]: e.target.value})
  }
  const handlerSubmit = () => {
    if(userValue.email === "prueba@prueba.com" && userValue.password === "prueba"){
      sessionStorage.setItem("email", userValue.email);
      sessionStorage.setItem("password", userValue.password)
      history.push("/client")
    }
  }
  return (
    <div>
      <div>
        <label>Email:</label>
        <input type="text" placeholder="Enter Email" name="email" onChange={handlerInputChange}></input>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" placeholder="Enter Password" name="password" onChange={handlerInputChange}></input>
      </div>
      <div>
        <button onClick={handlerSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Login;
