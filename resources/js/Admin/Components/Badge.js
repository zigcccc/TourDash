import React from "react";
import styled from "styled-components";

const BadgeContainer = styled.div`
	position: relative;
	margin-right: ${props =>
		props["data-horizontal-offset"]
			? 15 + parseInt(props["data-horizontal-offset"])
			: 15}px;
`;

const BadgeContent = styled.div`
	background-color: ${props => props.theme.colorError};
	width: ${props => props["data-size"] || 18}px;
	height: ${props => props["data-size"] || 18}px;
	color: ${props => props.theme.whiteShade1};
	border-radius: 50%;
	position: absolute;
	top: 0;
	right: 0;
	font-weight: 700;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: ${props => (props["data-size"] / 1.8).toFixed(0)}px;
	transform: translate(
		${props => props["data-horizontal-offset"] || 0}px,
		-50%
	);
`;

const Badge = ({ children, content, size, horizontalOffset }) => (
	<BadgeContainer>
		{content ? (
			<BadgeContent data-horizontal-offset={horizontalOffset} data-size={size}>
				{content}
			</BadgeContent>
		) : null}
		{children}
	</BadgeContainer>
);

export default Badge;
