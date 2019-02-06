import React, { Fragment } from "react";
import classNames from "classnames";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SidebarEditorCta = props => (
	<SavePage
		onClick={!props.disabled ? props.onClick : null}
		className={classNames({
			disabled: props.disabled
		})}
	>
		{props.loading ? (
			<FontAwesomeIcon icon="circle-notch" spin size="1x" />
		) : (
			<Fragment>
				{window.innerWidth > 768 ? (
					props.text
				) : (
					<FontAwesomeIcon icon="save" size="2x" />
				)}
			</Fragment>
		)}
	</SavePage>
);

SidebarEditorCta.propTypes = {
	pageUpdated: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired
};

SidebarEditorCta.defaultProps = {
	pageUpdated: false,
	loading: false,
	text: "SHRANI"
};

const SavePage = styled.button`
	border: none;
	outline: none;
	position: fixed;
	bottom: 0;
	z-index: 10;
	right: 0;
	width: 300px;
	background-color: ${props => props.theme.mainColor};
	color: ${props => props.theme.white};
	text-transform: uppercase;
	font-weight: 900;
	font-size: 14px;
	padding: 1.5em 1em;
	transition: ${props => props.theme.easeTransition};
	&.disabled {
		background-color: ${props => props.theme.whiteShade3};
		color: ${props => props.theme.darkGray};
		&:hover {
			cursor: not-allowed;
			background-color: ${props => props.theme.whiteShade3};
		}
	}
	&:hover {
		cursor: pointer;
		background-color: ${props => props.theme.mainColorHover};
	}
	@media screen and (max-width: 1500px) {
		width: 250px;
	}
	@media screen and (max-width: 1300px) {
		width: 200px;
	}
	@media screen and (max-width: 768px) {
		width: 75px;
		height: 80px;
	}
`;

export default SidebarEditorCta;
