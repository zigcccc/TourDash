import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
	setBlockProperty,
	toggleFluidBlock
} from "../../Store/Actions/EditingPageActions";
import { Group, GroupItem } from "./SidebarEditor";
import _debounce from "lodash/debounce";
import ImageInput from "./ImageInput";
import InputField from "../InputField";
import Switch from "../Switch";

class SidebarEditorImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedImage: null,
			selectedImagePreview: "",
			imageLoading: false,
			imageAlt: ""
		};
		this.uploadImage = this.uploadImage.bind(this);
		this.clearImage = this.clearImage.bind(this);
		this.setRoundedImage = this.setRoundedImage.bind(this);
		this.setImageShadow = this.setImageShadow.bind(this);
		this.setImageCover = this.setImageCover.bind(this);
		this.setImageAlt = this.setImageAlt.bind(this);
		this.submitImageAlt = _debounce(this.submitImageAlt.bind(this), 500);
		this.toggleFluidBlock = this.toggleFluidBlock.bind(this);
		this.setImageHeight = this.setImageHeight.bind(this);
	}

	setRoundedImage({ target }) {
		this.props.setBlockProperty("isRounded", target.checked);
	}

	setImageShadow({ target }) {
		this.props.setBlockProperty("hasShadow", target.checked);
	}

	setImageCover({ target }) {
		this.props.setBlockProperty("doesCover", target.checked);
	}

	setImageHeight({ target }) {
		this.props.setBlockProperty("imageHeight", Number(target.value));
	}

	setImageAlt({ target }) {
		this.setState(
			{
				...this.state,
				imageAlt: target.value
			},
			() => this.submitImageAlt()
		);
	}

	submitImageAlt() {
		this.props.setBlockProperty("imageAlt", this.state.imageAlt);
	}

	clearImage() {
		this.setState({
			imageLoading: false,
			selectedImage: null,
			selectedImagePreview: ""
		});
	}

	toggleFluidBlock({ target }) {
		this.props.toggleFluidBlock(!target.checked);
	}

	uploadImage(e) {
		this.setState({
			...this.state,
			selectedImage: e.target.files[0],
			imageLoading: true,
			selectedImagePreview: e.target.files[0]
				? URL.createObjectURL(e.target.files[0])
				: ""
		});
		const formData = new FormData();
		formData.append("image", e.target.files[0]);

		axios
			.post("/api/image/add-new", formData)
			.then(res => {
				const { data } = res.data;
				this.setState({
					...this.state,
					imageLoading: false,
					selectedImagePreview: data.medium
				});
				this.props.setBlockProperty("imageUrl", data);
			})
			.catch(err => console.log(err));
	}

	componentDidMount() {
		this.setState({
			imageAlt: this.props.editingBlock.data.imageAlt
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.editingBlock.uid !== this.props.editingBlock.uid) {
			this.setState({
				imageAlt: this.props.editingBlock.data.imageAlt
			});
		}
	}

	render() {
		const { editingBlock } = this.props;
		const {
			selectedImage,
			selectedImagePreview,
			imageLoading,
			imageAlt
		} = this.state;
		return (
			<Fragment>
				<Group>
					<h3>Izberite fotografijo</h3>
					<ImageInput
						selectedImage={selectedImage}
						selectedImagePreview={
							editingBlock.data.imageUrl.medium || selectedImagePreview
						}
						loading={imageLoading}
						clearImage={this.clearImage}
						onChange={this.uploadImage}
					/>
				</Group>
				<Group>
					<h3>Nadomestno besedilo slike</h3>
					<InputField
						name="imageAlt"
						value={imageAlt}
						onChange={this.setImageAlt}
						onBlur={this.submitImageAlt}
					/>
				</Group>
				<Group>
					<h3>Dodatne nastavitve</h3>
					{!editingBlock.data.isRounded && (
						<GroupItem>
							<h5>Slika zavzame ves možen prostor?</h5>
							<Switch
								checked={editingBlock.data.doesCover}
								handleChange={this.setImageCover}
							/>
						</GroupItem>
					)}
					{editingBlock.data.doesCover && (
						<GroupItem>
							<h5>Vnesite višino slike</h5>
							<InputField
								name="imageHeight"
								type="number"
								value={editingBlock.data.imageHeight || 0}
								onChange={this.setImageHeight}
							/>
						</GroupItem>
					)}
					<GroupItem>
						<h5>Slika ima senco?</h5>
						<Switch
							checked={editingBlock.data.hasShadow}
							handleChange={this.setImageShadow}
						/>
					</GroupItem>
					{!editingBlock.data.doesCover && (
						<GroupItem>
							<h5>Slika je okrogla?</h5>
							<Switch
								checked={editingBlock.data.isRounded}
								handleChange={this.setRoundedImage}
							/>
						</GroupItem>
					)}
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
)(SidebarEditorImage);
