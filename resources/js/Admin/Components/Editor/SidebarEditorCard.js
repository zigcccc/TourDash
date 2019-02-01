import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { setBlockProperty } from "../../Store/Actions/EditingPageActions";
import { Group, GroupItem } from "./SidebarEditor";
import InputField from "../InputField";
import ImageInput from "./ImageInput";
import Switch from "../Switch";
import Dropdown from "../Dropdown";

class SidebarEditorCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedImage: null,
			selectedImagePreview: "",
			imageLoading: false
		};
		this.handleCardLink = this.handleCardLink.bind(this);
		this.uploadImage = this.uploadImage.bind(this);
		this.clearImage = this.clearImage.bind(this);
	}

	handleCardLink({ target }) {
		const { setBlockProperty, editingBlock } = this.props;
		if (target.name === "cardLinkText") {
			setBlockProperty("cardLink", {
				text: target.value,
				href: editingBlock.data.cardLink.href
			});
		} else {
			setBlockProperty("cardLink", {
				text: editingBlock.data.cardLink.text,
				href: target.value
			});
		}
	}

	clearImage() {
		this.setState({
			imageLoading: false,
			selectedImage: null,
			selectedImagePreview: ""
		});
	}

	uploadImage(e) {
		const { setBlockProperty } = this.props;
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
				setBlockProperty("cardImage", data);
			})
			.catch(err => console.log(err));
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.editingBlock.uid !== this.props.editingBlock.uid) {
			this.setState({
				selectedImagePreview: "",
				selectedImage: ""
			});
		}
	}

	render() {
		const { editingBlock } = this.props;
		const { selectedImage, selectedImagePreview, imageLoading } = this.state;
		return (
			<Fragment>
				<Group>
					<h3>Slika kartice</h3>
					<ImageInput
						selectedImage={selectedImage}
						selectedImagePreview={
							editingBlock.data.cardImage
								? editingBlock.data.cardImage.medium
								: selectedImagePreview
						}
						loading={imageLoading}
						clearImage={this.clearImage}
						onChange={this.uploadImage}
					/>
				</Group>
				<Group>
					<h3>Povezava kartice</h3>
					<GroupItem>
						<h5>Besedilo povezave</h5>
						<InputField
							value={editingBlock.data.cardLink.text}
							type="text"
							name="cardLinkText"
							onChange={this.handleCardLink}
						/>
					</GroupItem>
					<GroupItem>
						<h5>URL povezave</h5>
						<InputField
							value={editingBlock.data.cardLink.href}
							type="text"
							name="cardLinkUrl"
							onChange={this.handleCardLink}
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
	setBlockProperty
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SidebarEditorCard);
