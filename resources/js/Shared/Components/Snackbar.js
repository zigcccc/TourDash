import React from "react";
import styled, { withTheme } from "styled-components";
import { capitalize } from "../../Admin/Utils";

const Snackbar = props => (
	<SnackBarContainer
		open={props.isOpen}
		className={props.position}
		purpose={props.purpose}
	>
		<span>{props.message}</span>
	</SnackBarContainer>
);

//const SnackBarContainer = styled.div``;

const SnackBarContainer = styled.div`
	position: fixed;
	z-index: 10000;
	left: 50%;
	padding: 0.75em 1.25em;
	color: ${props =>
		props.purpose === "warning"
			? props.theme.darkPrimary
			: props.theme.whiteShade1};
	font-weight: 700;
	border-radius: 5px;
	box-shadow: ${props => props.theme.lightShadow};
	transform: translate(-50%, ${props => (props.open ? "0" : "100%")});
	background-color: ${props =>
		props.theme[`color${capitalize(props.purpose)}`]};
	visibility: ${props => (props.open ? "visible" : "hidden")};
	opacity: ${props => (props.open ? "1" : "0")};
	transition: ${props => props.theme.easeTransition};
	&.top {
		top: 10px;
	}
	&.bottom {
		bottom: 10px;
	}
`;

export default withTheme(Snackbar);
