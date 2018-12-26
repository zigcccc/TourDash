import React from "react";
import styled from "styled-components";
import { Spacer } from "../Helpers/";

const CenteredItem = props => {
	return (
		<Container>
			<Spacer />
			{props.children}
			<Spacer />
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
`;

export default CenteredItem;
