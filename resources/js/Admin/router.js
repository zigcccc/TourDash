import React, { Fragment, Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "./Store/Actions/UserActions";
import _isEmpty from "lodash";
import styled from "styled-components";
import ReactPlaceholder from "react-placeholder";
import NotFound from "./Pages/NotFound";
import Dashboard from "./Pages/Dashboard";
import CreateNewPage from "./Pages/Pages/CreateNewPage";
import PagesOverview from "./Pages/Pages/PagesOverview";
import EditMenu from "./Pages/Pages/EditMenu";
import UsersOverview from "./Pages/User/UsersOverview";
import MyProfile from "./Pages/User/MyProfile";
import Sidebar, { SidebarPlaceholder } from "./Components/Sidebar";
import Actionbar from "./Components/Actionbar";

const MainArea = styled.div`
	margin-left: ${props => props.theme.sidebarWidth}px;
	margin-top: 75px;
	background-color: ${props => props.theme.whiteShade1};
	min-height: calc(100vh - 75px);
`;

class AppRouter extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { user, getUser } = this.props;
		if (_isEmpty(user)) {
			getUser();
		}
	}

	render() {
		const { userReady, user } = this.props;
		const { pathname } = this.props.history.location;
		return (
			<BrowserRouter basename="admin">
				<Fragment>
					<ReactPlaceholder
						customPlaceholder={<SidebarPlaceholder />}
						ready={userReady}
						showLoadingAnimation={true}
						firstLaunchOnly={true}
					>
						<Sidebar user={user} activePath={pathname} />
					</ReactPlaceholder>
					<Actionbar />
					<MainArea>
						<Switch>
							<Route path="/" component={Dashboard} exact />
							<Route path="/pages/" component={PagesOverview} exact />
							<Route path="/pages/add/" component={CreateNewPage} exact />
							<Route path="/pages/edit/:id" component={CreateNewPage} />
							<Route path="/pages/menus/" component={EditMenu} exact />
							<Route path="/users/" component={UsersOverview} exact />
							<Route path="/users/my-profile/" component={MyProfile} exact />

							{/* If all else fails, display "NotFound" route */}
							<Route component={NotFound} />
						</Switch>
					</MainArea>
				</Fragment>
			</BrowserRouter>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user.user,
		userReady: state.user.ready,
		errors: [state.user.error]
	};
};

const mapDispatchToProps = {
	getUser
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AppRouter);
