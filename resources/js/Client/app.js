import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import Router from "./router";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import rootReducer from "./Store";
import createBrowserHistory from "history/createBrowserHistory";
import LoadingContainer from "./Helpers/LoadingContainer";
import initializeFontAwesome from "./Helpers/initializeFontAwesome";
import ThemeProvider from "./Helpers/ThemeProvider";

initializeFontAwesome();

export const access_token = window.access_token;
export const csrf_token = document.querySelector('meta[name="csrf-token"]')
	.content;

const history = createBrowserHistory();

const client = axios.create({
	baseURL:
		process.env.NODE_ENV === "development"
			? "http://localhost:8000/api"
			: "/api",
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

class App extends Component {
	render() {
		return (
			<Fragment>
				<Provider store={store}>
					<LoadingContainer>
						<ThemeProvider>
							<Router history={history} />
						</ThemeProvider>
					</LoadingContainer>
				</Provider>
			</Fragment>
		);
	}
}

export default App;

if (document.getElementById("root")) {
	ReactDOM.render(<App />, document.getElementById("root"));
}
