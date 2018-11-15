import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { withTheme } from "styled-components";

const MainCtaLink = styled(Link)`
	background-color: ${props => props.theme.mainColor};
	color: ${props => props.theme.whiteShade1};
	text-transform: lowercase;
	font-weight: 900;
	text-align: center;
	padding: 10px 15px;
	min-width: 250px;
	border-radius: 5px;
	font-size: 24px;
	margin: 10px auto;
	box-shadow: ${props => props.theme.lightShadow};
	transition: ${props => props.theme.easeTransition};
	:hover {
		background-color: ${props => props.theme.mainColorHover};
		transform: translate(0, -3px);
		cursor: pointer;
		box-shadow: ${props => props.theme.hoverShadow};
	}
	:active {
		transform: translate(0, -3px) scale(0.95);
	}
`;

const MainCtaButton = styled.button`
	border: none;
	outline: none;
	background-color: ${props => props.theme.mainColor};
	color: ${props => props.theme.whiteShade1};
	text-transform: lowercase;
	font-weight: 900;
	text-align: center;
	padding: 10px 15px;
	min-width: 250px;
	border-radius: 5px;
	font-size: 24px;
	display: block;
	margin: 30px auto;
	box-shadow: ${props => props.theme.lightShadow};
	transition: ${props => props.theme.easeTransition};
	:hover {
		background-color: ${props => props.theme.mainColorHover};
		transform: translate(0, -3px);
		cursor: pointer;
		box-shadow: ${props => props.theme.hoverShadow};
	}
	:active {
		transform: translate(0, -3px) scale(0.95);
	}
`;

const MainCta = props => {
	switch (typeof props.handleClick) {
		case "function":
			return (
				<MainCtaButton onClick={props.handleClick}>
					{props.isLoading ? (
						<FontAwesomeIcon icon="circle-notch" spin size="large" />
					) : (
						props.text
					)}
				</MainCtaButton>
			);
		case "undefined":
			return (
				<MainCtaLink to={props.to}>
					{props.isLoading ? (
						<FontAwesomeIcon icon="circle-notch" spin size="large" />
					) : (
						props.text
					)}
				</MainCtaLink>
			);
		default:
			return <div>error</div>;
	}
};

export default withTheme(MainCta);
