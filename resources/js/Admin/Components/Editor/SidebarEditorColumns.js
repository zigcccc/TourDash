import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
	setBlockStyle,
	toggleFluidBlock
} from "../../Store/Actions/EditingPageActions";
import { Group, GroupItem } from "./SidebarEditor";
import MarginSetter from "./MarginSetter";
import Switch from "../Switch";
import AddContentBlock from "./AddContentBlock";

class SidebarEditorColumns extends Component {
	constructor(props) {
		super(props);
		this.setBlockStyle = this.setBlockStyle.bind(this);
		this.toggleFluidBlock = this.toggleFluidBlock.bind(this);
	}

	setBlockStyle(property, value) {
		this.props.setBlockStyle(property, value);
	}

	toggleFluidBlock({ target }) {
		this.props.toggleFluidBlock(!target.checked);
	}

	render() {
		const { editingBlock } = this.props;
		const hasStyles = editingBlock.options && editingBlock.options.style;
		return (
			<Fragment>
				<Group>
					<h3>Dodaj vsebinski blok</h3>
					<AddContentBlock />
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

const mapDispatchToProps = { setBlockStyle, toggleFluidBlock };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SidebarEditorColumns);
