import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
	setTypographyBlockTag,
	toggleFluidBlock,
	setBlockStyle,
	setBlockContent
} from "../../Store/Actions/EditingPageActions";
import possibleTypographyElements from "./possibleTypographyElements";
import { defaultPickerColors } from "../../../Shared/Theme";
import MarginSetter from "./MarginSetter";
import TextAlignment from "./TextAlignment";
import TwitterPicker from "react-color/lib/Twitter";
import { Field, TextArea } from "bloomer";
import Dropdown from "../Dropdown";
import { Group } from "./SidebarEditor";
import Switch from "../Switch";

class SidebarEditorTypography extends Component {
	constructor(props) {
		super(props);
		this.setTypographyBlockType = this.setTypographyBlockType.bind(this);
		this.toggleFluidBlock = this.toggleFluidBlock.bind(this);
		this.setBlockStyle = this.setBlockStyle.bind(this);
		this.handleFontColor = this.handleFontColor.bind(this);
		this.handleTextDataChange = this.handleTextDataChange.bind(this);
	}

	setTypographyBlockType(tag) {
		const { setTypographyBlockTag } = this.props;
		setTypographyBlockTag(tag);
	}

	toggleFluidBlock({ target }) {
		this.props.toggleFluidBlock(!target.checked);
	}

	handleFontColor(color) {
		const { setBlockStyle } = this.props;
		setBlockStyle("color", color.hex);
	}

	setBlockStyle(property, value) {
		this.props.setBlockStyle(property, value);
	}

	handleTextDataChange(e) {
		const { setBlockContent } = this.props;
		setBlockContent(e.target.value);
	}

	render() {
		const { data, options } = this.props.editingBlock;
		const { editingBlock } = this.props;
		return (
			<Fragment>
				<Group>
					<h3>Vsebina</h3>
					<Field>
						<TextArea onChange={this.handleTextDataChange} value={data} />
					</Field>
				</Group>
				<Group>
					<h3>Dodatne nastavitve</h3>
					<GroupItem>
						<h5>Tip elementa:</h5>
						<Dropdown
							color="dark"
							handleClick={this.setTypographyBlockType}
							possibilities={possibleTypographyElements}
							current={options.tag}
							fullWidth={true}
							condensed={true}
						/>
					</GroupItem>
					<GroupItem>
						<h5>Poravnava besedila:</h5>
						<TextAlignment
							onClick={this.setBlockStyle}
							current={options.style.textAlign || "left"}
						/>
					</GroupItem>
					<GroupItem>
						<h5>Barva pisave:</h5>
						<TwitterPicker
							width="250"
							triangle="hide"
							color={options.style.color || "#2d2d2d"}
							colors={defaultPickerColors}
							onChangeComplete={this.handleFontColor}
						/>
					</GroupItem>
					<GroupItem>
						<h5>Odmiki elementa:</h5>
						<MarginSetter
							onChange={this.setBlockStyle}
							currentBlock={editingBlock}
							currentMargin={options.style ? options.style.margin : null}
						/>
					</GroupItem>
					{!editingBlock.hasParent && (
						<GroupItem>
							<h5>Omejena širina:</h5>
							<Switch
								name="block-fluid"
								checked={!editingBlock.isFluid}
								handleChange={this.toggleFluidBlock}
							/>
						</GroupItem>
					)}
				</Group>
			</Fragment>
		);
	}
}

const GroupItem = styled.div`
	margin: 10px 0;
	h5 {
		font-size: 12px;
		margin-bottom: 3px;
	}
`;

const mapStateToProps = state => ({
	editingBlock: state.editingPage.editingBlock
});

const mapDispatchToProps = {
	setTypographyBlockTag,
	toggleFluidBlock,
	setBlockStyle,
	setBlockContent
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SidebarEditorTypography);
