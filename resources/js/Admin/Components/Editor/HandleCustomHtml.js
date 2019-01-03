import React from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";

const HandleSpacer = ({ block }) => {
	return (
		<CustomHtmlContainer style={block.options ? block.options.style : null}>
			{ReactHtmlParser(block.data)}
		</CustomHtmlContainer>
	);
};

const CustomHtmlContainer = styled.div``;

export default HandleSpacer;
