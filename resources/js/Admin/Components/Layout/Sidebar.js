import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = props => {
	return (
		<SidebarContainer
			className={classNames({ open: props.editorExpanded })}
			{...props}
		>
			<ExpandSidebarEditor
				onClick={props.toggleEditor}
				className={classNames({ open: props.editorExpanded })}
			>
				<FontAwesomeIcon
					icon={props.editorExpanded ? "chevron-down" : "chevron-up"}
					size="1x"
				/>
			</ExpandSidebarEditor>
			{props.children}
		</SidebarContainer>
	);
};

Sidebar.propTypes = {
	chldren: PropTypes.node,
	editorExpanded: PropTypes.bool.isRequired,
	toggleEditor: PropTypes.func.isRequired
};

Sidebar.defaultProps = {
	editorExpanded: false
};

const ExpandSidebarEditor = styled.div`
	display: none;
	justify-content: center;
	align-items: center;
	background: ${props => props.theme.darkPrimary};
	border-radius: 50%;
	width: 30px;
	height: 30px;
	position: fixed;
	bottom: 80px;
	left: 50%;
	color: ${props => props.theme.white};
	transform: translate(-100%, 50%);
	z-index: 5;
	@media screen and (max-width: 768px) {
		display: flex;
	}
	&.open {
		bottom: 460px;
	}
`;

const SidebarContainer = styled.div`
	width: 300px;
	position: fixed;
	top: 75px;
	bottom: 0;
	right: 0;
	border-left: 1px solid ${props => props.theme.whiteShade3};
	background: ${props => props.theme.whiteShade2};
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	padding-bottom: 75px !important;
	&::-webkit-scrollbar {
		width: 0px;
	}
	@media screen and (max-width: 1500px) {
		width: 250px;
	}
	@media screen and (max-width: 1300px) {
		width: 200px;
	}
	@media screen and (max-width: 1150px) {
		top: 50px;
	}
	@media screen and (max-width: 768px) {
		top: unset;
		bottom: 0;
		left: 0;
		right: 0;
		height: 80px;
		width: calc(100% - 75px);
		box-shadow: ${props => props.theme.lightShadow};
		&.open {
			height: 460px;
			max-height: calc(100vh - 50px);
			z-index: 10;
		}
	}
`;

export default Sidebar;
