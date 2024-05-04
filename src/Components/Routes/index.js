import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../Login/index";
import App from "../Layout/Layout";
import Aside from "../Aside";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../Redux/Login/actions";

const Routes = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const dispatch = useDispatch();
  useEffect(() => {
    const userEmail = sessionStorage.getItem("email");
    const userPassword = sessionStorage.getItem("password");
    if (userEmail && userPassword) {
      dispatch(login())
    } else {
      dispatch(logout());
    }
  }, [dispatch]);
  return (
    <Switch>
      <Route exact path="/">
        {isLoggedIn ? <Redirect to="/client" /> : <Login />}
      </Route>
      <Aside>
      <Route path="/*">
        {isLoggedIn ? <App /> : <Redirect to="/" />}
      </Route>
      </Aside>
    </Switch>
  );
};

export default Routes;
