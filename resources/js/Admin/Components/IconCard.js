import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styled from "styled-components";
import CardBase from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconCard = props => (
	<StyledCard
		hasBorder={false}
		onClick={props.onClick}
		className={classNames({
			active: props.active
		})}
	>
		<FontAwesomeIcon icon={props.icon} size="2x" />
		<span>{props.name}</span>
	</StyledCard>
);

IconCard.propTypes = {
	icon: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	active: PropTypes.bool.isRequired
};

IconCard.defaultProps = {
	active: false
};

const StyledCard = styled(CardBase)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: ${props => props.theme.heavyGray};
	border: 3px solid transparent;
	span {
		font-size: 14px;
		margin-top: 1em;
	}
	&:hover {
		cursor: pointer;
		color: ${props => props.theme.mainColor};
	}
	&.active {
		border-color: ${props => props.theme.mainColor};
		color: ${props => props.theme.mainColor};
	}
`;

export default IconCard;
