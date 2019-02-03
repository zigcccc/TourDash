import React, { Component } from "react";
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import { toggleMenu } from "../Store/Actions/GlobalActions";
import AvatarDropdown from "./AvatarDropdown";
import SiteStatus from "./SiteStatus";
import { Spacer } from "./Helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Actionbar extends Component {
	constructor(props) {
		super(props);
		this.openSideMenu = this.openSideMenu.bind(this);
	}

	openSideMenu() {
		const { toggleMenu } = this.props;
		toggleMenu();
	}

	render() {
		return (
			<ActionbarContainer>
				<MenuToggle onClick={this.openSideMenu}>
					<FontAwesomeIcon icon="bars" size="1x" />
				</MenuToggle>
				<SiteStatus />
				<Spacer />
				<AvatarDropdown />
			</ActionbarContainer>
		);
	}
}

const mapStateToProps = state => ({
	global: state.global
});

const mapDispatchToProps = { toggleMenu };

const MenuToggle = styled.div`
	display: none;
	color: ${props => props.theme.white};
	margin-right: 20px;
	font-size: 18px;
	&:hover {
		cursor: pointer;
	}
	@media screen and (max-width: 1150px) {
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

const ActionbarContainer = styled.div`
	position: fixed;
	z-index: 39;
	top: 0;
	left: ${props => props.theme.sidebarWidth}px;
	right: 0;
	padding: 20px;
	background-color: ${props => props.theme.whiteShade2};
	color: ${props => props.theme.darkHeavy};
	height: 75px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: row;
	border-bottom: 1px solid ${props => props.theme.lightGray};
	@media screen and (max-width: 1300px) {
		left: 200px;
	}
	@media screen and (max-width: 1150px) {
		background-color: ${props => props.theme.mainColor};
		color: ${props => props.theme.white};
		left: 0;
		box-shadow: ${props => props.theme.minimalShadow};
		height: 50px;
		border-color: transparent;
	}
`;

const connectedActionBar = connect(
	mapStateToProps,
	mapDispatchToProps
)(Actionbar);

export default withTheme(connectedActionBar);
