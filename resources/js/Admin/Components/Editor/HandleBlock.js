import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
	setActiveBlock,
	setBlockProperty,
	moveBlockUp,
	moveBlockDown,
	deleteBlock,
	setBlockContent
} from "../../Store/Actions/EditingPageActions";
import PropTypes from "prop-types";
import classNames from "classnames";
import _findIndex from "lodash/findIndex";
import HandleTypography from "./HandleTypography";
import HandleColumns from "./HandleColumns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from "sweetalert";
import HandleButton from "./HandleButton";
import HandleSpacer from "./HandleSpacer";
import HandleGoogleMaps from "./HandlegoogleMaps";
import HandleImage from "./HandleImage";
import HandleLatestPosts from "./HandleLatestPosts";
import HandleAccommodations from "./HandleAccommodations";
import HandleReviews from "./HandleReviews";
import HandleCard from "./HandleCard";

class BlockContainer extends Component {
	render() {
		return (
			<Block
				onClick={this.props.setActiveBlock}
				className={classNames({
					"editor-block": true,
					content: true,
					editing: this.props.active,
					"has-parent": this.props.hasParent,
					container: !this.props.hasParent,
					"is-last": this.props.isLast,
					"is-fluid": this.props.isFluid
				})}
			>
				{this.props.children}
			</Block>
		);
	}
}

class HandleBlock extends Component {
	constructor(props) {
		super(props);
		this.moveUp = this.moveUp.bind(this);
		this.moveDown = this.moveDown.bind(this);
		this.deleteBlock = this.deleteBlock.bind(this);
		this.setActiveBlock = this.setActiveBlock.bind(this);
	}

	moveUp(e) {
		e.stopPropagation();
		const { block, blockIndex, moveBlockUp } = this.props;
		moveBlockUp(blockIndex, block.uid, block.hasParent, block.parentBlockUid);
	}

	moveDown(e) {
		e.stopPropagation();
		const { block, blockIndex, moveBlockDown } = this.props;
		moveBlockDown(blockIndex, block.uid, block.hasParent, block.parentBlockUid);
	}

	setActiveBlock(e) {
		e.stopPropagation();
		const { block, blockIndex, setActiveBlock } = this.props;
		const relation = block.hasParent ? "child" : "parent";
		setActiveBlock(block, blockIndex, relation);
	}

	async deleteBlock(e) {
		e.stopPropagation();
		const { deleteBlock, block, parentBlock } = this.props;
		const response = await swal(
			"Ste prepričani, da želite izbrisati blok?",
			"",
			"info",
			{
				button: {
					text: "Izbriši",
					className: "tourdash-btn"
				}
			}
		);
		if (response) {
			block.hasParent
				? deleteBlock(block.uid, block.hasParent, parentBlock.uid)
				: deleteBlock(block.uid);
		}
	}

	render() {
		const { block, blockIndex, parentBlock } = this.props;
		const { editingBlock, content } = this.props.editingPage;

		const isActive = editingBlock && editingBlock.uid === block.uid;
		const isFirstItem = blockIndex === 0;
		const isLastItem = block.hasParent
			? blockIndex === parentBlock.data.length - 1
			: blockIndex === content.length - 1;

		return (
			<BlockContainer
				setActiveBlock={this.setActiveBlock}
				active={isActive}
				hasParent={this.props.block.hasParent}
				isLast={isLastItem}
				isFluid={block.isFluid}
			>
				{(() => {
					switch (block.type) {
						case "typography": {
							return <HandleTypography {...this.props} />;
						}
						case "columns": {
							return <HandleColumns {...this.props} />;
						}
						case "button": {
							return <HandleButton {...this.props} />;
						}
						case "spacer": {
							return <HandleSpacer {...this.props} />;
						}
						case "googleMaps": {
							return <HandleGoogleMaps {...this.props} />;
						}
						case "image": {
							return <HandleImage {...this.props} />;
						}
						case "latestPosts": {
							return <HandleLatestPosts {...this.props} />;
						}
						case "accommodations": {
							return <HandleAccommodations {...this.props} />;
						}
						case "reviews": {
							return <HandleReviews {...this.props} />;
						}
						case "card": {
							return <HandleCard {...this.props} />;
						}
						default: {
							return null;
						}
					}
				})()}
				<BlockActions
					className={classNames({
						active: isActive
					})}
				>
					{!isFirstItem && (
						<Action onClick={this.moveUp}>
							<FontAwesomeIcon
								icon={block.hasParent ? "arrow-left" : "arrow-up"}
							/>
						</Action>
					)}
					{!isLastItem && (
						<Action onClick={this.moveDown}>
							<FontAwesomeIcon
								icon={block.hasParent ? "arrow-right" : "arrow-down"}
							/>
						</Action>
					)}
					<Action className="danger" onClick={this.deleteBlock}>
						<FontAwesomeIcon icon="trash-alt" />
					</Action>
				</BlockActions>
			</BlockContainer>
		);
	}
}

HandleBlock.propTypes = {
	block: PropTypes.object.isRequired,
	blockIndex: PropTypes.number.isRequired
};

HandleBlock.defaultProps = {
	isFirstItem: false,
	isLastItem: false,
	isActive: false
};

const Block = styled.div`
	padding: 1em;
	margin: 1em auto;
	border: 2px dashed ${props => props.theme.lightGray};
	position: relative;
	&.has-parent {
		margin-bottom: 0;
		margin-top: 10px;
	}
	&.container:not(.is-fluid) {
		@media screen and (min-width: 1472px) {
			width: 1152px;
			max-width: 95%;
		}
		@media screen and (min-width: 1280px) {
			width: 1152px;
			max-width: 95%;
		}
	}
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
	${Block}.has-parent > & {
		bottom: unset;
		top: 50%;
		right: 0;
		left: unset;
		flex-direction: column;
		transition: none;
		transform: translate(50%, -50%);
	}
	${Block}.has-parent.is-last > & {
		right: unset;
		left: 0;
		transform: translate(-50%, -50%);
	}
	${Block}.has-parent:hover > & {
		transform: translate(50%, -50%);
	}
	${Block}.has-parent.is-last:hover > & {
		transform: translate(-50%, -50%);
	}
	${Block}:hover > & {
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
	${Block}.has-parent & {
		margin: 0.25em 0;
	}
	transition: ${props => props.theme.easeTransition};
	&.danger {
		background: ${props => props.theme.colorError};
	}
	&:hover {
		box-shadow: ${props => props.theme.lightShadow};
	}
`;

const mapStateToProps = state => ({
	editingPage: state.editingPage
});

const mapDispatchToProps = {
	setActiveBlock,
	moveBlockDown,
	moveBlockUp,
	deleteBlock,
	setBlockContent,
	setBlockProperty
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HandleBlock);
