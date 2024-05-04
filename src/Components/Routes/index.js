import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../Login/index";
import App from "../Layout/Layout";
import Aside from "../Aside";

const Routes = () => {
  const [isLogged, setIsLogged] = useState(false)
  useEffect(() => {
    const userEmail = sessionStorage.getItem("email");
    const userPassword = sessionStorage.getItem("password");
    if (userEmail && userPassword) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/">
        {isLogged ? <Redirect to="/client" /> : <Login />}
      </Route>
      <Aside>
      <Route path="/*">
        {isLogged ? <App /> : <Redirect to="/" />}
      </Route>
      </Aside>
    </Switch>
  );
};

export default Routes;
