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
	@media screen and (max-width: 1500px) {
		padding-right: 250px;
	}
	@media screen and (max-width: 1300px) {
		padding-right: 200px;
	}
	@media screen and (max-width: 768px) {
		padding-right: 0;
	}
`;

export default MainArea;
