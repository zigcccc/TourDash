import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { setBlockProperty } from "../../Store/Actions/EditingPageActions";
import { Group } from "./SidebarEditor";
import InputField from "./InputField";
import Switch from "../Switch";

class SidebarEditorButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notNumber: false
		};
		this.setHeight = this.setHeight.bind(this);
		this.setDivider = this.setDivider.bind(this);
	}

	setHeight({ target }) {
		const height = parseInt(target.value);
		if (height) {
			this.props.setBlockProperty("height", height);
		} else {
			this.setState({
				notNumber: true
			});
		}
	}

	setDivider({ target }) {
		this.props.setBlockProperty("hasDivider", target.checked);
	}

	render() {
		const { editingBlock } = this.props;
		return (
			<Fragment>
				<Group>
					<h3>Višina praznega prostora</h3>
					<InputField
						value={editingBlock.data.height}
						type="number"
						onChange={this.setHeight}
						hasErrors={this.state.notNumber}
					/>
				</Group>
				<Group>
					<h3>Prikaži delilno črto?</h3>
					<Switch
						checked={editingBlock.data.hasDivider}
						handleChange={this.setDivider}
					/>
				</Group>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	editingBlock: state.editingPage.editingBlock
});

const mapDispatchToProps = {
	setBlockProperty
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SidebarEditorButton);
