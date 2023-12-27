import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "../Layout/Layout";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Layout} />
    </Switch>
  );
};

export default Routes;
