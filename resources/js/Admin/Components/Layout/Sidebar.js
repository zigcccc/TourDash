import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Sidebar = props => {
	return <SidebarContainer {...props}>{props.children}</SidebarContainer>;
};

Sidebar.propTypes = {
	chldren: PropTypes.node
};

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
`;

export default Sidebar;
