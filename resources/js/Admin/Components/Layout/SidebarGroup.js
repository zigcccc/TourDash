import React from "react";
import styled from "styled-components";
import { SidebarHeading } from "../Typography";

const SidebarGroup = props => (
	<Group {...props}>
		{props.heading && <SidebarHeading>{props.heading}</SidebarHeading>}
		{props.children}
	</Group>
);

const Group = styled.div`
	margin: 10px 0;
	&:first-child {
		margin-top: 0;
	}
	&:last-child {
		margin-bottom: 0;
		&::after {
			display: none;
		}
	}
	h3 {
		font-weight: 900;
		font-size: 12px;
		text-transform: uppercase;
		margin-bottom: 5px;
	}
	&::after {
		content: "";
		display: ${props => (props.noBorder ? "none" : "block")};
		margin: 30px auto 15px;
		width: 50%;
		height: 1px;
		background: ${props => props.theme.lightGray};
	}
`;

export default SidebarGroup;
