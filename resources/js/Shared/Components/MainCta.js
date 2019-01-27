import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import PropTypes from "prop-types";

const MainCta = props => {
	switch (typeof props.handleClick) {
		case "function":
			return (
				<MainCtaButton
					className={classNames({
						[props.className]: true,
						disabled: props.disabled
					})}
					data-size={props.fontSize}
					onClick={!props.disabled ? props.handleClick : null}
				>
					{props.isLoading ? (
						<FontAwesomeIcon icon="circle-notch" spin size="1x" />
					) : (
						props.text
					)}
				</MainCtaButton>
			);
		case "undefined":
			return (
				<MainCtaLink
					className={classNames({
						[props.className]: true,
						disabled: props.disabled
					})}
					data-size={props.fontSize}
					to={!props.disabled ? props.to : props.match.pathname}
				>
					{props.isLoading ? (
						<FontAwesomeIcon icon="circle-notch" spin size="1x" />
					) : (
						props.text
					)}
				</MainCtaLink>
			);
		default:
			new Error('Neither "handleClick" or "to" prop is provided...');
			return <div>error</div>;
	}
};

MainCta.propTypes = {
	fontSize: PropTypes.number.isRequired,
	handleClick: PropTypes.func,
	to: PropTypes.string,
	isLoading: PropTypes.bool,
	text: PropTypes.string,
	disabled: PropTypes.bool.isRequired
};

MainCta.defaultProps = {
	fontSize: 24,
	isLoading: false,
	disabled: false
};

const MainCtaLink = styled(Link)`
	background-color: ${props => props.theme.mainColor};
	color: ${props => props.theme.whiteShade1};
	text-transform: lowercase;
	font-weight: 900;
	text-align: center;
	padding: 10px 15px;
	min-width: 250px;
	border-radius: 5px;
	font-size: ${props => props["data-size"].toString() + "px"};
	margin: 10px auto;
	box-shadow: ${props => props.theme.lightShadow};
	transition: ${props => props.theme.easeTransition};
	:hover {
		background-color: ${props => props.theme.mainColorHover};
		transform: translate(0, -3px);
		color: ${props => props.theme.whiteShade1};
		cursor: pointer;
		box-shadow: ${props => props.theme.hoverShadow};
	}
	:active {
		transform: translate(0, -3px) scale(0.95);
	}
	&.disabled {
		box-shadow: none;
		background: ${props => props.theme.lightGray};
		color: ${props => props.theme.whiteShade2};
		cursor: not-allowed;
		&:hover {
			transform: translate(0, 0);
		}
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
	font-size: ${props => props["data-size"].toString() + "px"};
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
	&.disabled {
		box-shadow: none;
		background: ${props => props.theme.lightGray};
		color: ${props => props.theme.whiteShade2};
		cursor: not-allowed;
		&:hover {
			transform: translate(0, 0);
		}
	}
`;

export default MainCta;
