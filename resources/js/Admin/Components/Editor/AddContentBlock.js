import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addNewBlock } from "../../Store/Actions/EditingPageActions";
import styled from "styled-components";
import { Columns, Column } from "bloomer";
import classNames from "classnames";
import _isEmpty from "lodash/isEmpty";
import contentBlocksMap from "./contentBlocksMap";
import blockTypeMap from "./blockTypeMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AddContentBlock extends Component {
	constructor(props) {
		super(props);
	}

	addNewBlock(type) {
		this.props.addNewBlock(type);
	}

	render() {
		const { editor } = this.props;
		const insideEditingBlock = !_isEmpty(editor.editingBlock);
		return (
			<Fragment>
				<AddContentBlockContainer
					isMultiline
					isGrid
					className={classNames({
						"restricted-height": insideEditingBlock,
						"is-3": true
					})}
				>
					{contentBlocksMap.map(block => (
						<BlockCard
							key={block.id}
							onClick={this.addNewBlock.bind(this, block.type)}
						>
							<FontAwesomeIcon icon={block.icon} />
							<BlockCardText>{blockTypeMap[block.type]}</BlockCardText>
						</BlockCard>
					))}
				</AddContentBlockContainer>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	editor: state.editingPage
});

const mapDispatchToProps = { addNewBlock };

const AddContentBlockContainer = styled(Columns)`
	margin-top: 0.5em;
	&.restricted-height {
		max-height: 50vh;
		overflow-y: scroll;
		&::-webkit-scrollbar {
			width: 0px;
		}
	}
`;

const BlockCard = styled(Column)`
	background: ${props => props.theme.white};
	margin: 5px;
	width: calc(50% - 10px);
	flex: 0 0 calc(50% - 10px);
	height: 100px;
	border-radius: 10px;
	box-shadow: ${props => props.theme.minimalShadow};
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 22px;
	transition: ${props => props.theme.easeTransition};
	&:hover {
		cursor: pointer;
		box-shadow: ${props => props.theme.lightShadow};
		color: ${props => props.theme.mainColor};
	}
`;

const BlockCardText = styled.span`
	font-size: 12px;
	margin-top: 0.75em;
	text-align: center;
`;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddContentBlock);
