import React from "react";
import styled from "styled-components";

const SidebarHeading = props => <Font {...props}>{props.children}</Font>;

const Font = styled.h3`
	font-weight: 900;
	font-size: 12px;
	text-transform: uppercase;
	margin-bottom: 5px;
`;

export default SidebarHeading;
