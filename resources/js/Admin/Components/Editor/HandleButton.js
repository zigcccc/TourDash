import React from "react";
import styled from "styled-components";
import classNames from "classnames";
import PropTypes from "prop-types";
import darken from "@bit/styled-components.polished.color.darken";

const HandleButton = ({ block }) => (
	<ButtonContainer
		className={classNames({
			center: block.data.buttonAlignment === "center",
			left: block.data.buttonAlignment === "left",
			right: block.data.buttonAlignment === "right"
		})}
	>
		<Button
			style={block.options ? block.options.style : null}
			data-color={block.data.buttonColor}
			target={block.data.buttonTarget ? block.data.buttonTarget : "_self"}
			onClick={event => event.preventDefault()}
			href={block.data.href}
			className={classNames({
				outlined: block.data.buttonType === "outlined",
				minimal: block.data.buttonType === "minimal"
			})}
		>
			{block.data.text}
		</Button>
	</ButtonContainer>
);

HandleButton.propTypes = {
	block: PropTypes.object.isRequired
};

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	&.left {
		justify-content: flex-start;
	}
	&.right {
		justify-content: flex-end;
	}
`;

const Button = styled.a`
	display: inline-block;
	padding: 0.75em 1em;
	font-size: 1.15rem;
	background-color: ${props => props["data-color"] || props.theme.mainColor};
	color: ${props => props.theme.white};
	border-radius: 5px;
	box-shadow: ${props => props.theme.fancyShadow};
	transition: ${props => props.theme.easeTransition};
	&:hover {
		color: ${props => props.theme.white};
		background-color: ${props =>
			darken(0.1, props["data-color"]) || darken(0.1, props.theme.mainColor)};
	}
	&.outlined {
		border: 2px solid ${props => props["data-color"] || props.theme.mainColor};
		background-color: transparent;
		color: ${props => props["data-color"] || props.theme.mainColor};
		box-shadow: none;
		&:hover {
			color: ${props => props.theme.white};
			border-color: ${props => props["data-color"] || props.theme.mainColor};
			background-color: ${props =>
				props["data-color"] || props.theme.mainColor};
		}
	}
	&.minimal {
		border: none;
		background-color: transparent;
		padding: 0.25em;
		box-shadow: none;
		color: ${props => props["data-color"] || props.theme.mainColor};
		&:hover {
			color: ${props =>
				darken(0.1, props["data-color"]) || darken(0.1, props.theme.mainColor)};
		}
	}
`;

export default HandleButton;
