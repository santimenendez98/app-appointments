import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../Login/index";
import App from "../Layout/Layout";
import Aside from "../Aside";
import Users from "../Users/index"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Routes = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.auth?.logged)
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (isLoggedIn || token) {
      history.push("/client")
    } else {
      history.push("/")
    }
  }, [dispatch, history, isLoggedIn, token]);
  return (
    <Switch>
      <Route exact path="/">
        {isLoggedIn || token ? <Redirect to="/client" /> : <Login />}
      </Route>
      <Aside>
        <Route path="/client">{isLoggedIn || token ? <App /> : <Redirect to="/" />}</Route>
        <Route path="/users">{isLoggedIn || token ? <Users /> : <Redirect to="/" />}</Route>
      </Aside>
    </Switch>
  );
};

export default Routes;
