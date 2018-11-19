import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import NotFound from "./Pages/NotFound";
import Dashboard from "./Pages/Dashboard";
import Sidebar from "./Components/Sidebar";
import Actionbar from "./Components/Actionbar";

const MainArea = styled.div`
	margin-left: ${props => props.theme.sidebarWidth}px;
	margin-top: 75px;
	background-color: ${props => props.theme.whiteShade1};
	min-height: calc(100vh - 75px);
`;

const AppRouter = () => (
	<BrowserRouter basename="admin">
		<Fragment>
			<Sidebar />
			<Actionbar />
			<MainArea>
				<Switch>
					<Route path="/" component={Dashboard} exact />

					{/* If all else fails, display "NotFound" route */}
					<Route component={NotFound} />
				</Switch>
			</MainArea>
		</Fragment>
	</BrowserRouter>
);

export default AppRouter;
