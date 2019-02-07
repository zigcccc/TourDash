import React from "react";
import styled from "styled-components";
import classNames from "classnames";
import { Link } from "react-router-dom";
import darken from "@bit/styled-components.polished.color.darken";

const Button = props => (
	<ButtonContainer
		className={classNames({
			center: props.data.buttonAlignment === "center",
			left: props.data.buttonAlignment === "left",
			right: props.data.buttonAlignment === "right"
		})}
	>
		<ButtonInner>
			{props.data.buttonTarget === "_blank" ? (
				<a
					href={props.data.href}
					target="_blank"
					style={props.options ? props.options.style : null}
					className={classNames({
						outlined: props.data.buttonType === "outlined",
						minimal: props.data.buttonType === "minimal"
					})}
				>
					{props.data.text}
				</a>
			) : (
				<Link
					to={props.data.href}
					className={classNames({
						outlined: props.data.buttonType === "outlined",
						minimal: props.data.buttonType === "minimal"
					})}
				>
					{props.data.text}
				</Link>
			)}
		</ButtonInner>
	</ButtonContainer>
);

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

const ButtonInner = styled.div`
	a {
		display: inline-block;
		padding: 0.75em 1em;
		font-size: 1.15rem;
		background-color: ${props => props.theme.mainColor};
		color: ${props => props.theme.light};
		border-radius: 5px;
		box-shadow: ${props => props.theme.fancyShadow};
		transition: ${props => props.theme.easeTransition};
		font-family: ${props => props.theme.textFont};
		font-weight: 900;
		&:hover {
			color: ${props => props.theme.light};
			background-color: ${props => darken(0.1, props.theme.mainColor)};
		}
		&.outlined {
			border: 2px solid ${props => props.theme.mainColor};
			background-color: transparent;
			color: ${props => props.theme.mainColor};
			box-shadow: none;
			&:hover {
				color: ${props => props.theme.light};
				border-color: ${props => props.theme.mainColor};
				background-color: ${props => props.theme.mainColor};
			}
		}
		&.minimal {
			border: none;
			background-color: transparent;
			padding: 0.25em;
			box-shadow: none;
			color: ${props => props.theme.mainColor};
			&:hover {
				color: ${props => darken(0.1, props.theme.mainColor)};
			}
		}
	}
`;

export default Button;
