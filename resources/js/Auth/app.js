import React, { Component } from "react";
import ReactDOM from "react-dom";
import theme from "../Shared/Theme";
import Router from "./router";
import { CookiesProvider } from "react-cookie";
import createBrowserHistory from "history/createBrowserHistory";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faChevronLeft,
	faPlus,
	faMinus,
	faTh,
	faChevronRight,
	faChevronDown,
	faChevronUp,
	faUser,
	faUnlock,
	faCircleNotch,
	faLongArrowAltRight,
	faLongArrowAltLeft,
	faRedoAlt,
	faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import { ThemeProvider } from "styled-components";

library.add(
	faChevronLeft,
	faPlus,
	faMinus,
	faTh,
	faChevronRight,
	faUser,
	faUnlock,
	faCircleNotch,
	faLongArrowAltRight,
	faLongArrowAltLeft,
	faRedoAlt,
	faChevronDown,
	faChevronUp,
	faEnvelope
);

const history = createBrowserHistory();

export default class App extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<CookiesProvider>
					<Router history={history} {...this.props} />
				</CookiesProvider>
			</ThemeProvider>
		);
	}
}

if (document.getElementById("auth")) {
	ReactDOM.render(<App />, document.getElementById("auth"));
}
