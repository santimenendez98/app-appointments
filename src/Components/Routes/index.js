import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../Login/index";
import App from "../Layout/Layout";
import Aside from "../Aside";
import Users from "../Users/index"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { logOutUser } from "../../Redux/Login/thunk";

const Routes = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.auth?.logged)
  const token = useSelector((state) => state.auth?.user)
  const expirationTime = useSelector((state) => state.auth.expirationTime)
  useEffect(() => {
    if (isLoggedIn || token) {
      history.push("/client")
    } else {
      history.push("/")
    }
  }, [dispatch, history, isLoggedIn, token]);

  useEffect(() => {
    if(expirationTime){
      const reminingTime = expirationTime - new Date().getTime();
      if(reminingTime <= 0){
        dispatch(logOutUser())
      } else {
        const timer = setTimeout(() => {
          dispatch(logOutUser());
      }, reminingTime);

      return () => clearTimeout(timer);
      }
    }
  }, [expirationTime, dispatch])

  return (
    <Switch>
      <Route exact path="/">
        {isLoggedIn || token ? <Redirect to="/client" /> : <Login />}
      </Route>
      <Route path="/client">
        <Aside>
          {isLoggedIn || token ? <App /> : <Redirect to="/" />}
        </Aside>
      </Route>
      <Route path="/users">
        <Aside>
          {isLoggedIn || token ? <Users /> : <Redirect to="/" />}
        </Aside>
      </Route>
    </Switch>
  );
};

export default Routes;
