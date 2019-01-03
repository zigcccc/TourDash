import React from "react";
import styled from "styled-components";

const HandleSpacer = ({ block }) => {
	return (
		<Spacer data-height={block.data.height}>
			{block.data.hasDivider && <SpacerDivider />}
		</Spacer>
	);
};

const Spacer = styled.div`
	display: flex;
	height: ${props => `${props["data-height"]}px`};
	justify-content: center;
	align-items: center;
`;

const SpacerDivider = styled.div`
	width: 75%;
	height: 2px;
	background-color: ${props => props.theme.lightGray};
	border-radius: 10px;
`;

export default HandleSpacer;
