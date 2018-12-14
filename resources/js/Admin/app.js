import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import rootReducer from "./Store";
import theme from "../Shared/Theme";
import AppRouter from "./AppRouter";
import createBrowserHistory from "history/createBrowserHistory";
import initializeFontAwesome from "./Utils/initializeFontAwesome";
import { ThemeProvider } from "styled-components";

initializeFontAwesome();

const history = createBrowserHistory();

export const access_token = window.access_token;
export const csrf_token = document.querySelector('meta[name="csrf-token"]')
	.content;

if (!access_token || !csrf_token) {
	window.location.reload();
}

const client = axios.create({
	baseURL:
		process.env.NODE_ENV === "development"
			? "http://localhost:8000/api"
			: "https://tourdash.app/api",
	responseType: "json",
	headers: {
		_token: csrf_token,
		"X-XSRF-TOKEN": window.xsrf_token,
		Authorization: `Bearer ${access_token}`,
		"X-Requested-With": "XMLHttpRequest"
	}
});

const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(axiosMiddleware(client))
);

export { store };

export default class App extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<AppRouter history={history} />
				</Provider>
			</ThemeProvider>
		);
	}
}

if (document.getElementById("admin")) {
	ReactDOM.render(<App />, document.getElementById("admin"));
} else {
	window.location.href = "/";
}

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};
