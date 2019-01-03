import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
	setBlockStyle,
	toggleFluidBlock,
	setBlockProperty
} from "../../Store/Actions/EditingPageActions";
import { Group, GroupItem } from "./SidebarEditor";
import MarginSetter from "./MarginSetter";
import TwitterPicker from "react-color/lib/Twitter";
import { defaultPickerColors } from "../../../Shared/Theme";
import Dropdown from "../Dropdown";
import InputField from "./InputField";
import Switch from "../Switch";
import TextAlignment from "./TextAlignment";

class SidebarEditorButton extends Component {
	constructor(props) {
		super(props);
		this.setBlockStyle = this.setBlockStyle.bind(this);
		this.toggleFluidBlock = this.toggleFluidBlock.bind(this);
		this.setButtonType = this.setButtonType.bind(this);
		this.setButtonText = this.setButtonText.bind(this);
		this.setButtonHref = this.setButtonHref.bind(this);
		this.setButtonTarget = this.setButtonTarget.bind(this);
		this.setButtonColor = this.setButtonColor.bind(this);
		this.setButtonAlignment = this.setButtonAlignment.bind(this);
	}

	setBlockStyle(property, value) {
		this.props.setBlockStyle(property, value);
	}

	toggleFluidBlock({ target }) {
		this.props.toggleFluidBlock(!target.checked);
	}

	setButtonType(type) {
		this.props.setBlockProperty("buttonType", type);
	}

	setButtonText({ target }) {
		this.props.setBlockProperty("text", target.value);
	}

	setButtonHref({ target }) {
		this.props.setBlockProperty("href", target.value);
	}

	setButtonTarget({ target }) {
		const btnTarget = target.checked ? "_blank" : false;
		this.props.setBlockProperty("buttonTarget", btnTarget);
	}

	setButtonColor(color) {
		this.props.setBlockProperty("buttonColor", color.hex);
	}

	setButtonAlignment(property, value) {
		this.props.setBlockProperty("buttonAlignment", value);
	}

	render() {
		const { editingBlock } = this.props;
		const hasStyles = editingBlock.options && editingBlock.options.style;
		return (
			<Fragment>
				<Group>
					<h3>Tekst gumba</h3>
					<InputField
						value={editingBlock.data.text}
						onChange={this.setButtonText}
					/>
				</Group>
				<Group>
					<h3>Povezava</h3>
					<InputField
						value={editingBlock.data.href}
						onChange={this.setButtonHref}
					/>
					<GroupItem>
						<h5>Povezava se odpre v novem oknu?</h5>
						<Switch
							checked={editingBlock.data.buttonTarget !== false}
							handleChange={this.setButtonTarget}
						/>
					</GroupItem>
				</Group>
				<Group>
					<h3>Tip gumba</h3>
					<Dropdown
						handleClick={this.setButtonType}
						color="dark"
						fullWidth
						current={editingBlock.data.buttonType}
						possibilities={["solid", "outlined", "minimal"]}
					/>
				</Group>
				<Group>
					<h3>Poravnava gumba</h3>
					<TextAlignment
						hasOptionJustify={false}
						onClick={this.setButtonAlignment}
						current={editingBlock.data.buttonAlignment}
					/>
				</Group>
				<Group>
					<h3>Barva gumba</h3>
					<TwitterPicker
						width="250"
						triangle="hide"
						color={hasStyles ? editingBlock.options.style.color : "#2d2d2d"}
						colors={defaultPickerColors}
						onChangeComplete={this.setButtonColor}
					/>
				</Group>
				<Group>
					<h3>Dodatne nastavitve</h3>
					<GroupItem>
						<h5>Odmiki elementa:</h5>
						<MarginSetter
							onChange={this.setBlockStyle}
							currentBlock={editingBlock}
							currentMargin={
								hasStyles ? editingBlock.options.style.margin : null
							}
						/>
					</GroupItem>
				</Group>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	editingBlock: state.editingPage.editingBlock
});

const mapDispatchToProps = {
	setBlockStyle,
	toggleFluidBlock,
	setBlockProperty
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SidebarEditorButton);
