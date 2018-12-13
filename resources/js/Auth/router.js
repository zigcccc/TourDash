import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./Pages/Auth";
import PasswordReset from "./Pages/Auth/PasswordReset";
import NotFound from "./Pages/NotFound";

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/login" component={Auth} />
			<Route path="/register" component={Auth} />
			<Route path="/email/verify" component={Auth} />
			<Route path="/password/reset" exact component={Auth} />
			<Route path="/password/reset/:token" component={PasswordReset} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
);

export default Router;
