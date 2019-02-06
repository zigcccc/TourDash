import React from "react";
import MainCtaBase from "../../Shared/Components/MainCta";
import styled from "styled-components";
import darken from "@bit/styled-components.polished.color.darken";

const MainCta = props => <StyledCta {...props} />;

const StyledCta = styled(MainCtaBase)`
	display: inline-block;
	padding: 0.75em 1em;
	font-weight: bold;
	margin-top: 1em;
	background-color: ${props => props.theme.mainColor};
	color: ${props => props.theme.light};
	border-radius: 5px;
	box-shadow: ${props => props.theme.fancyShadow};
	transition: ${props => props.theme.easeTransition};
	&:hover {
		color: ${props => props.theme.light};
		background-color: ${props =>
			props.theme.mainColor ? darken(0.1, props.theme.mainColor) : "inherit"};
	}
`;

export default MainCta;
