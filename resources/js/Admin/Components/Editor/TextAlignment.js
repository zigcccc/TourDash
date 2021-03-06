import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TextAlignment = ({ current, onClick, hasOptionJustify }) => (
	<TextAlignmentContainer>
		<FontAwesomeIcon
			className={classNames({ active: current === "left" })}
			icon="align-left"
			onClick={() => onClick("textAlign", "left")}
		/>
		<FontAwesomeIcon
			className={classNames({ active: current === "center" })}
			icon="align-center"
			onClick={() => onClick("textAlign", "center")}
		/>
		<FontAwesomeIcon
			className={classNames({ active: current === "right" })}
			icon="align-right"
			onClick={() => onClick("textAlign", "right")}
		/>
		{hasOptionJustify && (
			<FontAwesomeIcon
				className={classNames({ active: current === "justify" })}
				icon="align-justify"
				onClick={() => onClick("textAlign", "justify")}
			/>
		)}
	</TextAlignmentContainer>
);

TextAlignment.propTypes = {
	current: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	hasOptionJustify: PropTypes.bool.isRequired
};

TextAlignment.defaultProps = {
	current: "left",
	hasOptionJustify: true
};

const TextAlignmentContainer = styled.div`
	background-color: ${props => props.theme.white};
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1em;
	border-radius: 7px;
	box-shadow: ${props => props.theme.fancyShadow};
	svg {
		transition: ${props => props.theme.easeTransition};
		color: ${props => props.theme.heavyGray};
		&:hover {
			cursor: pointer;
			&:not(.active) {
				color: ${props => props.theme.darkPrimary};
			}
		}
		&.active {
			color: ${props => props.theme.mainColor};
		}
	}
`;

export default TextAlignment;
