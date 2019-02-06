import React from "react";
import styled from "styled-components";

const PageWrapper = props => {
	return <PageContainer>{props.children}</PageContainer>;
};

const PageContainer = styled.div`
	padding-top: 75px;
`;

export default PageWrapper;
