import React from "react";
import styled from "styled-components";
import MainCta from "./MainCta";

const InvertedCtaContainer = styled(MainCta)`
	background: transparent;
	border: 3px solid ${props => props.theme.mainColor};
	color: ${props => props.theme.mainColor};
	box-shadow: none;
	:hover {
		background: ${props => props.theme.mainColor};
		color: ${props => props.theme.whiteShade1};
	}
`;

const InvertedCta = props => <InvertedCtaContainer {...props} />;

export default InvertedCta;
