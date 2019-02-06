import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Fab = props => {
	return (
		<FabContainer
			className={classNames({
				invreted: props.inverted,
				"bottom-left": props.alignLeft,
				clickable: !!props.onClick
			})}
			onClick={props.onClick ? props.onClick : null}
		>
			<FontAwesomeIcon icon={props.icon} size="1x" />
		</FabContainer>
	);
};

Fab.propTypes = {
	inverted: PropTypes.bool.isRequired,
	icon: PropTypes.string.isRequired,
	alignLeft: PropTypes.bool.isRequired,
	onClick: PropTypes.func
};

Fab.defaultProps = {
	inverted: false,
	alignLeft: false,
	icon: "cog"
};

const FabContainer = styled.div`
	box-shadow: ${props => props.theme.minimalShadow};
	background: ${props => props.theme.mainColor};
	color: ${props => props.theme.light};
	width: 50px;
	height: 50px;
	position: fixed;
	font-size: 18px;
	z-index: 200;
	bottom: 20px;
	right: 20px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: ${props => props.theme.easeTransition};
	&.clickable {
		&:hover {
			cursor: pointer;
			background: ${props => props.theme.mainColorHover};
			&.inverted {
				color: ${props => props.theme.mainColorHover};
			}
		}
	}
	&.inverted {
		background: ${props => props.theme.light};
		color: ${props => props.theme.mainColor};
	}
	&.bottom-left {
		right: unset;
		left: 20px;
	}
`;

export default Fab;
