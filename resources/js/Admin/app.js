import React, { Component } from "react";
import ReactDOM from "react-dom";
import theme from "../Shared/Theme";
import AppRouter from "./AppRouter";
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
	faSearch,
	faSignOutAlt,
	faEnvelope,
	faEllipsisV,
	faPencilAlt,
	faFile,
	faHome,
	faCalendarAlt,
	faThumbtack,
	faHeart,
	faStar,
	faTrashAlt,
	faStarHalfAlt,
	faEyeSlash
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
	faSearch,
	faSignOutAlt,
	faEnvelope,
	faEllipsisV,
	faPencilAlt,
	faFile,
	faHome,
	faCalendarAlt,
	faThumbtack,
	faHeart,
	faStar,
	faTrashAlt,
	faStarHalfAlt,
	faEyeSlash
);

const history = createBrowserHistory();

export default class App extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<AppRouter history={history} />
			</ThemeProvider>
		);
	}
}

if (document.getElementById("admin")) {
	ReactDOM.render(<App />, document.getElementById("admin"));
}

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};
