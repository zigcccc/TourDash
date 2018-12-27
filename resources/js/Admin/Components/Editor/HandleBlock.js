import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import classNames from "classnames";
import HandleTypography from "./HandleTypography";
import { OutsideHandler } from "../Helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class BlockContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false
		};
		this.setEdit = this.setEdit.bind(this);
		this.unsetEdit = this.unsetEdit.bind(this);
	}

	setEdit() {
		this.props.setActiveBlock();
		this.setState({
			editing: true
		});
	}

	unsetEdit() {
		this.props.unsetActiveBlock();
		this.setState({
			editing: false
		});
	}

	render() {
		return (
			<OutsideHandler handleClickOutside={this.unsetEdit}>
				<Block
					onClick={this.setEdit}
					className={classNames({
						editing: this.state.editing
					})}
				>
					{this.props.children}
				</Block>
			</OutsideHandler>
		);
	}
}

class HandleBlock extends Component {
	render() {
		const {
			type,
			setActiveBlock,
			unsetActiveBlock,
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
					<BlockContainer
						setActiveBlock={setActiveBlock}
						unsetActiveBlock={unsetActiveBlock}
					>
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
	unsetActiveBlock: PropTypes.func.isRequired,
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
	padding: 2em;
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
