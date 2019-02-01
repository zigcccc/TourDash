import React from "react";
import styled from "styled-components";
import { SidebarSubheading } from "../Typography";

const SidebarGroupItem = props => (
	<GroupItem>
		{props.heading && <SidebarSubheading>{props.heading}</SidebarSubheading>}
		{props.children}
	</GroupItem>
);

export const GroupItem = styled.div`
	margin: 10px 0;
	h5 {
		font-size: 12px;
		margin-bottom: 3px;
	}
`;

export default SidebarGroupItem;
