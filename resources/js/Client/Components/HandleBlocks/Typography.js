import React from "react";
import styled from "styled-components";
import { Title as TitleBase, Content } from "bloomer";

const Typography = props => {
	switch (props.options.tag) {
		case "h1": {
			return (
				<Title
					tag="h1"
					isSize={1}
					style={props.options.style ? props.options.style : null}
				>
					{props.data}
				</Title>
			);
		}
		case "h2": {
			return (
				<Title
					tag="h2"
					isSize={2}
					style={props.options.style ? props.options.style : null}
				>
					{props.data}
				</Title>
			);
		}
		case "h3": {
			return (
				<Title
					tag="h3"
					isSize={3}
					style={props.options.style ? props.options.style : null}
				>
					{props.data}
				</Title>
			);
		}
		case "h4": {
			return (
				<Title
					tag="h4"
					isSize={4}
					style={props.options.style ? props.options.style : null}
				>
					{props.data}
				</Title>
			);
		}
		case "h5": {
			return (
				<Title
					tag="h5"
					isSize={5}
					style={props.options.style ? props.options.style : null}
				>
					{props.data}
				</Title>
			);
		}
		case "h6": {
			return (
				<Title
					tag="h6"
					isSize={6}
					style={props.options.style ? props.options.style : null}
				>
					{props.data}
				</Title>
			);
		}
		case "p": {
			return (
				<Paragraph style={props.options.style ? props.options.style : null}>
					{props.data}
				</Paragraph>
			);
		}
		case "small": {
			return (
				<small style={props.options.style ? props.options.style : null}>
					{props.data}
				</small>
			);
		}
		case "blockquote": {
			return (
				<Content>
					<blockquote style={props.options.style ? props.options.style : null}>
						{props.data}
					</blockquote>
				</Content>
			);
		}
	}
};

const Title = styled(TitleBase)`
	&.title {
		font-family: ${props => props.theme.headingFont};
		margin-bottom: 35px;
		color: ${props =>
			props.tag === "h1" ? props.theme.mainColor : props.theme.dark};
	}
`;

const Paragraph = styled.p`
  margin: 10px 0;
  line-height: 1.8;
  font-size: 16px;
  font-family: ${props => props.theme.textFont}
  padding: 0 1em;
	&:first-of-type {
		margin-top: 35px;
	}
`;

export default Typography;
