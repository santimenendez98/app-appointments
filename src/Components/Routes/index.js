import React from "react";
import { Switch, Route } from "react-router-dom";
import login from "../Login/index";
import App from "../Layout/Layout";
import Aside from "../Aside";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={login} />
      <Aside>
        <Route exact path="/client" component={App} />
      </Aside>
    </Switch>
  );
};

export default Routes;
