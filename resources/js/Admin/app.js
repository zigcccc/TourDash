import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import rootReducer from "./Store";
import theme from "../Shared/Theme";
import Router from "./router";
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

axios.defaults.headers.common["_token"] = csrf_token;
axios.defaults.headers.common["X-XSRF-TOKEN"] = window.xsrf_token;
axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(axiosMiddleware(client))
);

export { store };

export default class App extends Component {
	componentDidMount() {
		ReactDOM.suppressContentEditableWarning;
	}

	render() {
		return (
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<Router history={history} />
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
