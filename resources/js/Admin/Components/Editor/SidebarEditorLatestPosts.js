import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
	setBlockProperty,
	toggleFluidBlock
} from "../../Store/Actions/EditingPageActions";
import { Group, GroupItem } from "./SidebarEditor";
import InputField from "../InputField";
import Switch from "../Switch";
import Dropdown from "../Dropdown";

class SidebarEditorLatestPosts extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.toggleAllPosts = this.toggleAllPosts.bind(this);
		this.setSortingType = this.setSortingType.bind(this);
		this.toggleFluidBlock = this.toggleFluidBlock.bind(this);
	}

	handleChange({ target }) {
		const { setBlockProperty } = this.props;
		if (target.value.length > 0) {
			setBlockProperty(target.name, target.value);
		}
	}

	toggleAllPosts({ target }) {
		const { setBlockProperty } = this.props;
		setBlockProperty("totalAmount", target.checked ? -1 : 1);
	}

	setSortingType(param) {
		const { setBlockProperty } = this.props;
		setBlockProperty("sortBy", param);
	}

	toggleFluidBlock({ target }) {
		const { toggleFluidBlock } = this.props;
		toggleFluidBlock(!target.checked);
	}

	render() {
		const { editingBlock } = this.props;
		return (
			<Fragment>
				<Group>
					<h3>Število objav</h3>
					{editingBlock.data.totalAmount > 0 && (
						<GroupItem>
							<InputField
								value={editingBlock.data.totalAmount}
								type="number"
								name="totalAmount"
								onChange={this.handleChange}
							/>
						</GroupItem>
					)}
					<GroupItem>
						<h5>Prikaži vse možne objave?</h5>
						<Switch
							checked={editingBlock.data.totalAmount < 0}
							handleChange={this.toggleAllPosts}
						/>
					</GroupItem>
				</Group>
				<Group>
					<h3>Število stolpcev</h3>
					<InputField
						value={editingBlock.data.amountPerSlide}
						type="number"
						min="1"
						max="5"
						name="amountPerSlide"
						onChange={this.handleChange}
					/>
				</Group>
				<Group>
					<h3>Razvrsti objave glede na:</h3>
					<Dropdown
						color="dark"
						handleClick={this.setSortingType}
						possibilities={{ date: "Datum", postTitle: "Naslov objave" }}
						current={editingBlock.data.sortBy}
						fullWidth={true}
						condensed={true}
					/>
				</Group>
				{!editingBlock.hasParent && (
					<Group>
						<h3>Dodatne nastavitve</h3>
						<GroupItem>
							<h5>Omejena širina:</h5>
							<Switch
								name="block-fluid"
								checked={!editingBlock.isFluid}
								handleChange={this.toggleFluidBlock}
							/>
						</GroupItem>
					</Group>
				)}
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	editingBlock: state.editingPage.editingBlock
});

const mapDispatchToProps = {
	setBlockProperty,
	toggleFluidBlock
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SidebarEditorLatestPosts);
