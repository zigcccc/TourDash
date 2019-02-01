import React from "react";
import styled from "styled-components";

const SidebarSubheading = props => <Font {...props}>{props.children}</Font>;

const Font = styled.h5`
	font-size: 12px;
	margin-bottom: 3px;
`;

export default SidebarSubheading;
