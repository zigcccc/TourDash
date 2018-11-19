import React, { Component } from "react";
import styled, { withTheme } from "styled-components";
import AvatarDropdown from "./AvatarDropdown";
import ActionbarSearchForm from "./ActionbarSearchForm";
import SiteStatus from "./SiteStatus";
import { Spacer } from "./Helpers";

const ActionbarContainer = styled.div`
	position: fixed;
	z-index: 100;
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
`;

class Actionbar extends Component {
	render() {
		return (
			<ActionbarContainer>
				<ActionbarSearchForm />
				<SiteStatus />
				<Spacer />
				<AvatarDropdown />
			</ActionbarContainer>
		);
	}
}

export default withTheme(Actionbar);
