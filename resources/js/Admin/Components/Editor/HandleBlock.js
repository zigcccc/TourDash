import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import classNames from "classnames";
import HandleTypography from "./HandleTypography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class BlockContainer extends Component {
	render() {
		return (
			<Block
				onClick={this.props.setActiveBlock}
				className={classNames({
					"editor-block": true,
					editing: this.props.active
				})}
			>
				{this.props.children}
			</Block>
		);
	}
}

class HandleBlock extends Component {
	render() {
		const {
			type,
			setActiveBlock,
			moveUp,
			moveDown,
			onDelete,
			isFirstItem,
			isLastItem,
			isActive
		} = this.props;
		switch (type) {
			case "typography": {
				return (
					<BlockContainer setActiveBlock={setActiveBlock} active={isActive}>
						<HandleTypography {...this.props} />
						<BlockActions
							className={classNames({
								active: isActive
							})}
						>
							{!isFirstItem && (
								<Action onClick={moveUp}>
									<FontAwesomeIcon icon="arrow-up" />
								</Action>
							)}
							{!isLastItem && (
								<Action onClick={moveDown}>
									<FontAwesomeIcon icon="arrow-down" />
								</Action>
							)}
							<Action className="danger" onClick={onDelete}>
								<FontAwesomeIcon icon="trash-alt" />
							</Action>
						</BlockActions>
					</BlockContainer>
				);
			}
			default: {
				return null;
			}
		}
	}
}

HandleBlock.propTypes = {
	type: PropTypes.string.isRequired,
	setActiveBlock: PropTypes.func.isRequired,
	moveUp: PropTypes.func.isRequired,
	moveDown: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	isFirstItem: PropTypes.bool.isRequired,
	isLastItem: PropTypes.bool.isRequired,
	isActive: PropTypes.bool.isRequired
};

HandleBlock.defaultProps = {
	isFirstItem: false,
	isLastItem: false,
	isActive: false
};

const Block = styled.div`
	padding: 1em;
	margin: 1em 0.5em;
	border: 2px dashed ${props => props.theme.lightGray};
	position: relative;
	&:hover {
		cursor: pointer;
	}
	&.editing {
		border-color: ${props => props.theme.mainColor};
	}
`;

const BlockActions = styled.div`
	position: absolute;
	bottom: -12.5px;
	left: 50%;
	display: flex;
	transform: translate(-50%, 50%);
	z-index: 10;
	opacity: 0;
	visibility: hidden;
	transition: ${props => props.theme.easeTransition};
	${Block}:hover & {
		transform: translate(-50%, 0);
		opacity: 1;
		visibility: visible;
	}
	&.active {
		transform: translate(-50%, 0);
		opacity: 1;
		visibility: visible;
	}
`;

const Action = styled.span`
	width: 25px;
	height: 25px;
	background: ${props => props.theme.darkPrimary};
	color: ${props => props.theme.white};
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	font-size: 12px;
	margin: 0 0.5em;
	transition: ${props => props.theme.easeTransition};
	&.danger {
		background: ${props => props.theme.colorError};
	}
	&:hover {
		box-shadow: ${props => props.theme.lightShadow};
	}
`;

export default HandleBlock;
