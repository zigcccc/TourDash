import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
	setBlockProperty,
	toggleFluidBlock
} from "../../Store/Actions/EditingPageActions";
import { Group, GroupItem } from "./SidebarEditor";
import InputField from "../InputField";
import Switch from "../Switch";

class SidebarEditorButton extends Component {
	constructor(props) {
		super(props);
		this.toggleFluidBlock = this.toggleFluidBlock.bind(this);
		this.setHeight = this.setHeight.bind(this);
		this.setLng = this.setLng.bind(this);
		this.setLat = this.setLat.bind(this);
		this.setZoom = this.setZoom.bind(this);
	}

	toggleFluidBlock({ target }) {
		this.props.toggleFluidBlock(!target.checked);
	}

	setHeight({ target }) {
		const height = parseInt(target.value);
		if (height) {
			this.props.setBlockProperty("height", height);
		}
	}

	setLng({ target }) {
		this.props.setBlockProperty("center", {
			lat: this.props.editingBlock.data.center.lat,
			lng: parseFloat(target.value)
		});
	}

	setLat({ target }) {
		this.props.setBlockProperty("center", {
			lat: parseFloat(target.value),
			lng: this.props.editingBlock.data.center.lng
		});
	}

	setZoom({ target }) {
		this.props.setBlockProperty("zoom", parseInt(target.value));
	}

	render() {
		const { editingBlock } = this.props;
		return (
			<Fragment>
				<Group>
					<h3>Višina zemljevida prostora</h3>
					<InputField
						value={editingBlock.data.height}
						type="number"
						onChange={this.setHeight}
					/>
				</Group>
				<Group>
					<h3>Koordinate</h3>
					<GroupItem>
						<h5>Zemljepisna širina</h5>
						<InputField
							value={editingBlock.data.center.lng}
							type="number"
							onChange={this.setLng}
							size="small"
						/>
					</GroupItem>
					<GroupItem>
						<h5>Zemljepisna dolžina</h5>
						<InputField
							value={editingBlock.data.center.lat}
							type="number"
							onChange={this.setLat}
							size="small"
						/>
					</GroupItem>
				</Group>
				<Group>
					<h3>Zoom</h3>
					<InputField
						value={editingBlock.data.zoom}
						type="number"
						min="3"
						max="20"
						onChange={this.setZoom}
						size="small"
					/>
				</Group>
				<Group>
					<h3>Dodatne nastavitve</h3>
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
	setBlockProperty,
	toggleFluidBlock
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SidebarEditorButton);
