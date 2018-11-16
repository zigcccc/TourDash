import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const PageWrapperContainer = styled.div`
	padding: 20px;
	h1 {
		margin-top: 20px;
		color: ${props => props.theme.darkPrimary};
		font-weight: 900;
		font-size: 54px;
		line-height: 1;
	}
`;

const PageWrapper = props => {
	return (
		<PageWrapperContainer>
			<h1>{props.pageTitle}</h1>
			{props.children}
		</PageWrapperContainer>
	);
};

PageWrapper.propTypes = {
	pageTitle: PropTypes.string
};

export default PageWrapper;
