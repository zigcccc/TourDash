import React from "react";
import styled, { withTheme } from "styled-components";

const MainHeadingStyle = styled.h1`
	font-size: 75px;
	color: ${props => props.theme.darkPrimary};
	font-weight: 900;
	text-align: left;
`;

const MainHeading = props => (
	<MainHeadingStyle>{props.children}</MainHeadingStyle>
);

export default withTheme(MainHeading);
