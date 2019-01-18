import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
	setTypographyBlockTag,
	toggleFluidBlock,
	setBlockStyle,
	setBlockContent
} from "../../Store/Actions/EditingPageActions";
import _throttle from "lodash/throttle";
import _debounce from "lodash/debounce";
import possibleTypographyElements from "./possibleTypographyElements";
import { defaultPickerColors } from "../../../Shared/Theme";
import MarginSetter from "./MarginSetter";
import TextAlignment from "./TextAlignment";
import TwitterPicker from "react-color/lib/Twitter";
import { Field, TextArea } from "bloomer";
import Dropdown from "../Dropdown";
import { Group, GroupItem } from "./SidebarEditor";
import Switch from "../Switch";

class SidebarEditorTypography extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ""
		};
		this.setTypographyBlockType = this.setTypographyBlockType.bind(this);
		this.toggleFluidBlock = this.toggleFluidBlock.bind(this);
		this.setBlockStyle = this.setBlockStyle.bind(this);
		this.handleFontColor = this.handleFontColor.bind(this);
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

	componentDidMount() {
		this.setState({
			text: this.props.editingBlock.data
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.editingBlock.uid !== this.props.editingBlock.uid) {
			this.setState({
				text: this.props.editingBlock.data
			});
		}
	}

	render() {
		const { options } = this.props.editingBlock;
		const { editingBlock } = this.props;
		return (
			<Fragment>
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
							current={options.style ? options.style.textAlign : "left"}
						/>
					</GroupItem>
					<GroupItem>
						<h5>Barva pisave:</h5>
						<TwitterPicker
							width="250"
							triangle="hide"
							color={options.style ? options.style.color : "#2d2d2d"}
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
