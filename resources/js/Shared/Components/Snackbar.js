import React, { Component } from "react";
import styled, { withTheme } from "styled-components";
import PropTypes from "prop-types";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { capitalize } from "../../Admin/Utils";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
library.add(faTimes);

class Snackbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dissmissed: false
		};
		this.dissmissSnackbar = this.dissmissSnackbar.bind(this);
	}

	dissmissSnackbar() {
		this.setState({
			dissmissed: true
		});
	}

	render() {
		const {
			isOpen,
			position,
			purpose,
			message,
			hasDissmissAction,
			dissmissAction,
			style
		} = this.props;
		const { dissmissed } = this.state;
		return (
			<SnackBarContainer
				open={isOpen && !dissmissed}
				className={classNames({
					[position]: true,
					"has-dissmiss": hasDissmissAction
				})}
				purpose={purpose}
				style={style}
			>
				{typeof message === "string" && <span>{message}</span>}
				{typeof message === "object" && (
					<span>{Object.values(message)[0][0]}</span>
				)}

				{hasDissmissAction && (
					<DissmissIconContainer
						onClick={dissmissAction ? dissmissAction : this.dissmissSnackbar}
					>
						<FontAwesomeIcon icon="times" size="sm" />
					</DissmissIconContainer>
				)}
			</SnackBarContainer>
		);
	}
}

Snackbar.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	position: PropTypes.oneOf(["top", "bottom"]).isRequired,
	purpose: PropTypes.oneOf(["success", "error", "warning"]).isRequired,
	message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	hasDissmissAction: PropTypes.bool.isRequired,
	dissmissAction: PropTypes.func
};

Snackbar.defaultProps = {
	position: "bottom",
	purpose: "success",
	isOpen: false,
	hasDissmissAction: true
};

const SnackBarContainer = styled.div`
	position: fixed;
	z-index: 10000;
	left: 50%;
	padding: 0.75em 1.25em;
	min-width: 200px;
	min-height: 50px;
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
		transform: translate(-50%, ${props => (props.open ? "0" : "-100%")});
	}
	&.bottom {
		bottom: 10px;
	}
	&.has-dissmiss {
		padding-right: 50px;
	}
	@media screen and (max-width: 768px) {
		min-width: calc(100vw - 20px);
	}
`;

const DissmissIconContainer = styled.div`
	position: absolute;
	right: 10px;
	top: 50%;
	transform: translateY(-50%);
	width: 25px;
	height: 25px;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: ${props => props.theme.easeTransition};
	border-radius: 50%;
	&:hover {
		background-color: rgba(0, 0, 0, 0.2);
		cursor: pointer;
	}
`;

export default withTheme(Snackbar);
