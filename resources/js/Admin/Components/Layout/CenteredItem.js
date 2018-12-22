import React from "react";
import styled from "styled-components";

const CenteredItem = props => {
	return <Container>{props.children}</Container>;
};

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
`;

export default CenteredItem;
