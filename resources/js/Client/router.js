import React, { Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Homepage, Rooms } from "./Pages";
import AppHeader from "./Components/Header";

const Router = ({ match }) => (
  <BrowserRouter>
    <Fragment>
      <AppHeader />
      <Route path="/" component={Homepage} exact />
      <Route path="/rooms" component={Rooms} />
    </Fragment>
  </BrowserRouter>
);

export default Router;
