import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import _isEmpty from "lodash/isEmpty";
import { getSettings } from "../Store/Actions/SettingsActions";
import { getMenu } from "../Store/Actions/PagesActions";
import { getUser } from "../Store/Actions/UserActions";
import { getAccommodations } from "../Store/Actions/AccommodationsActions";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class LoadingContainer extends Component {
	componentDidMount() {
		const {
			settings,
			getSettings,
			menu,
			getMenu,
			user,
			getUser,
			accommodations,
			getAccommodations
		} = this.props;
		_isEmpty(settings.data.visual) && getSettings("visual");
		_isEmpty(settings.data.contact) && getSettings("contact");
		_isEmpty(settings.data.marketing) && getSettings("marketing");
		!menu && getMenu();
		accommodations.length <= 0 && getAccommodations();
		if (window.access_token) {
			!user.user && getUser(window.access_token);
		}
	}
	render() {
		const {
			settings,
			children,
			menuLoading,
			user,
			accommodationsLoading
		} = this.props;
		const loading =
			settings.loading || menuLoading || user.loading || accommodationsLoading;

		if (loading) {
			return (
				<Loading>
					<FontAwesomeIcon icon="circle-notch" spin size="2x" />
				</Loading>
			);
		} else {
			return children;
		}
	}
}

const mapStateToProps = state => ({
	settings: state.settings,
	menu: state.pages.menu,
	menuLoading: state.pages.menuLoading,
	user: state.user,
	accommodations: state.accommodations.data,
	accommodationsLoading: state.accommodations.loading
});

const mapDispatchToProps = { getSettings, getMenu, getUser, getAccommodations };

const Loading = styled.div`
	width: 100vw;
	height: 100vh;
	max-height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #2d2d2d;
`;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoadingContainer);
