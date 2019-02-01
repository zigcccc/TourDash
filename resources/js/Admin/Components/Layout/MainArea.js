import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const MainArea = props => {
	return <MainAreaContainer {...props}>{props.children}</MainAreaContainer>;
};

MainArea.propTypes = {
	children: PropTypes.node.isRequired
};

const MainAreaContainer = styled.div`
	padding-right: 300px;
	width: 100%;
	min-height: calc(100vh - 75px);
`;

export default MainArea;
