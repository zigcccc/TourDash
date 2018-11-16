import React from "react";
import styled from "styled-components";
import MainCta from "./MainCta";

const FlatCtaContainer = styled(MainCta)`
	background: transparent;
	border: none;
	box-shadow: none;
	color: ${props => props.theme.mainColor};
	:hover {
		background: transparent;
		box-shadow: none;
		text-shadow: 0 0 2px 4px rgba(0, 0, 0, 0.2);
		transform: translate(0, 0);
		text-decoration: underline;
	}
`;

const FlatCta = props => <FlatCtaContainer {...props} />;

export default FlatCta;
