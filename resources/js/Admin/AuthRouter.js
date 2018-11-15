import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AppRouter from "./AppRouter";
import Auth from "./Pages/Auth";
import NotFound from "./Pages/NotFound";
//import AppHeader from "./Components/Header";

const isAuth = localStorage.getItem("td_token");

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props =>
				isAuth ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	);
};

const AuthRouter = () => (
	<BrowserRouter>
		<Switch>
			<PrivateRoute path="/admin" component={AppRouter} />
			<Route path="/login" component={Auth} />
			<Route path="/register" component={Auth} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
);

export default AuthRouter;
