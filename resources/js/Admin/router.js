import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { getUser } from "./Store/Actions/UserActions";
import { closeMenu } from "./Store/Actions/GlobalActions";
import classNames from "classnames";
import _isEmpty from "lodash";
import styled from "styled-components";
import ReactPlaceholder from "react-placeholder";
import NotFound from "./Pages/NotFound";
import Dashboard from "./Pages/Dashboard";
import CreateNewPage from "./Pages/Pages/CreateNewPage";
import PagesOverview from "./Pages/Pages/PagesOverview";
import CreateNewAccommodation from "./Pages/Accommodations/CreateNewAccommodation";
import AccommodationsOverview from "./Pages/Accommodations/AccommodationsOverview";
import EditMenu from "./Pages/Pages/EditMenu";
import UsersOverview from "./Pages/User/UsersOverview";
import MyProfile from "./Pages/User/MyProfile";
import SettingsContactInfo from "./Pages/Settings/SettingsContactInfo";
import Sidebar, { SidebarPlaceholder } from "./Components/Sidebar";
import Actionbar from "./Components/Actionbar";
import SettingsVisuals from "./Pages/Settings/SettingsVisuals";
import SettingsMarketing from "./Pages/Settings/SettingsMarketing";
import SettingsOverview from "./Pages/Settings/SettingsOverview";

class ScrollToTop extends Component {
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			window.scrollTo(0, 0);
			if (this.props.menuOpen) {
				this.props.closeMenu();
			}
		}
	}
	render() {
		return this.props.children;
	}
}

const HandleScroll = withRouter(
	connect(
		state => ({ menuOpen: state.global.menuOpen }),
		{ closeMenu }
	)(ScrollToTop)
);

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
		const { userReady, user, menuOpen } = this.props;
		const { pathname } = this.props.history.location;
		return (
			<BrowserRouter basename="admin">
				<HandleScroll>
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
						<MenuOpenOverlay
							className={classNames({
								active: menuOpen
							})}
						/>
						<Switch>
							<Route path="/" component={Dashboard} exact />
							<Route path="/pages/" component={PagesOverview} exact />
							<Route path="/pages/add/" component={CreateNewPage} exact />
							<Route path="/pages/edit/:id" component={CreateNewPage} />
							<Route path="/pages/menus/" component={EditMenu} exact />
							<Route
								path="/accommodations/"
								component={AccommodationsOverview}
								exact
							/>
							<Route
								path="/accommodations/add/"
								component={CreateNewAccommodation}
								exact
							/>
							<Route
								path="/accommodations/edit/:id"
								component={CreateNewAccommodation}
							/>
							<Route path="/users/" component={UsersOverview} exact />
							<Route path="/users/my-profile/" component={MyProfile} exact />
							<Route path="/settings/" component={SettingsOverview} exact />
							<Route
								path="/settings/contact-info/"
								component={SettingsContactInfo}
								exact
							/>
							<Route
								path="/settings/appearance/"
								component={SettingsVisuals}
								exact
							/>
							<Route
								path="/settings/tracking-and-marketing"
								component={SettingsMarketing}
								exact
							/>

							{/* If all else fails, display "NotFound" route */}
							<Route component={NotFound} />
						</Switch>
					</MainArea>
				</HandleScroll>
			</BrowserRouter>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user.user,
		userReady: state.user.ready,
		errors: [state.user.error],
		menuOpen: state.global.menuOpen
	};
};

const mapDispatchToProps = {
	getUser
};

const MainArea = styled.div`
	margin-left: ${props => props.theme.sidebarWidth}px;
	margin-top: 75px;
	background-color: ${props => props.theme.whiteShade1};
	min-height: calc(100vh - 75px);
	@media screen and (max-width: 1300px) {
		margin-left: 200px;
	}
	@media screen and (max-width: 1150px) {
		margin-left: 0;
		margin-top: 50px;
	}
`;

const MenuOpenOverlay = styled.div`
	position: fixed;
	top: 50px;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 3;
	background-color: rgba(0, 0, 0, 0.2);
	transition: ${props => props.theme.easeTransition};
	opacity: 0;
	visibility: hidden;
	&.active {
		opacity: 1;
		visibility: visible;
	}
`;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AppRouter);
