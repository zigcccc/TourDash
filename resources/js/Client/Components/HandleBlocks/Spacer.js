import React from "react";
import styled from "styled-components";

const Spacer = props => {
	return (
		<StyledSpacer data-height={props.data.height}>
			{props.data.hasDivider && <SpacerDivider />}
		</StyledSpacer>
	);
};

const StyledSpacer = styled.div`
	display: flex;
	height: ${props => `${props["data-height"]}px`};
	justify-content: center;
	align-items: center;
`;

const SpacerDivider = styled.div`
	width: 50%;
	height: 1px;
	background-color: ${props => props.theme.mainColor};
	border-radius: 10px;
`;

export default Spacer;
