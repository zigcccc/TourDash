import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./Pages/Auth";
import NotFound from "./Pages/NotFound";

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/login" component={Auth} />
			<Route path="/register" component={Auth} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
);

export default Router;
