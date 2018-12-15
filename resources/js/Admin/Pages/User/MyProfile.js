import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ReactPlaceholder from "react-placeholder";
import { connect } from "react-redux";
import { updateProfileImage } from "../../Store/Actions/UserActions";
import { PageWrapper } from "../../Components/Layout";
import { Columns, Column } from "bloomer";
import { SectionTitle } from "../../Components/Typography";
import Card from "../../Components/Card";
import EditableAvatar from "../../Components/EditableAvatar";
import Snackbar from "../../../Shared/Components/Snackbar";
import { validResponse } from "../../../Shared/Utils";

const ContentContainer = styled(Columns)`
	margin-top: 30px;
`;

const AvatarContainer = styled(Column)`
	margin-top: 10px;
	justify-content: center;
	display: flex;
`;

class MyProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editName: false,
			editEmail: false,
			selectedImage: null,
			selectedImagePreview: "",
			imageLoading: false,
			successMessage: "",
			errorMessage: "",
			hasErrors: false,
			hasSuccess: false
		};
		this.imageUploadTrigger = React.createRef();
		this.uploadImage = this.uploadImage.bind(this);
		this.triggerUploadImage = this.triggerUploadImage.bind(this);
		this.dissmissNotifications = this.dissmissNotifications.bind(this);
	}

	triggerUploadImage() {
		this.imageUploadTrigger.current.click();
	}

	async uploadImage(e) {
		const { updateProfileImage, user } = this.props;
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
		try {
			const response = await updateProfileImage(user.id, formData);
			if (validResponse(response.payload)) {
				this.setState({
					...this.state,
					imageLoading: false,
					successMessage: response.payload.data.message.success,
					hasSuccess: true
				});
			} else {
				this.setState({
					...this.state,
					imageLoading: false,
					selectedImage: null,
					selectedImagePreview: "",
					hasErrors: true,
					errorMessage: response.error.response.data
						? response.error.response.data.error.image[0]
						: "Velikost datoteke je prevelika. Največja dovoljena velikost je 2.5MB"
				});
			}
		} catch (err) {
			this.setState({
				...this.state,
				imageLoading: false,
				selectedImage: null,
				selectedImagePreview: "",
				hasErrors: true,
				errorMessage:
					"Napaka pri nalaganju fotografije. Bodite pozorni, da velikost datoteke ne presega 2.5MB"
			});
		}
	}

	dissmissNotifications() {
		this.setState({
			...this.state,
			hasSuccess: false,
			hasErrors: false
		});
	}

	render() {
		const { user, userLoaded } = this.props;
		const {
			selectedImagePreview,
			successMessage,
			errorMessage,
			imageLoading,
			hasErrors,
			hasSuccess
		} = this.state;
		return (
			<PageWrapper pageTitle="Moj profil">
				<Snackbar
					isOpen={hasSuccess}
					hasDissmissAction={true}
					dissmissAction={this.dissmissNotifications}
					purpose="success"
					message={successMessage}
				/>
				<Snackbar
					isOpen={hasErrors}
					hasDissmissAction={true}
					dissmissAction={this.dissmissNotifications}
					purpose="error"
					position="bottom"
					message={errorMessage}
				/>
				<ContentContainer>
					<Column>
						<Card title="Moji podatki">
							<Columns>
								<AvatarContainer isSize="1/3">
									<ReactPlaceholder
										ready={userLoaded}
										type="round"
										color="#DBDDE0"
										style={{ width: 175, height: 175 }}
									>
										<EditableAvatar
											user={user}
											imagePreview={selectedImagePreview}
											imageLoading={imageLoading}
											triggerRef={this.imageUploadTrigger}
											uploadImage={this.uploadImage}
											triggerUpload={this.triggerUploadImage}
										/>
									</ReactPlaceholder>
								</AvatarContainer>
								<Column isSize="2/3">a2</Column>
							</Columns>
						</Card>
					</Column>
					<Column>
						<SectionTitle text="Moje aktivnosti" />
					</Column>
				</ContentContainer>
			</PageWrapper>
		);
	}
}

MyProfile.propTypes = {
	user: PropTypes.object
};

const mapStateToProps = state => {
	return {
		user: state.user.user,
		userLoaded: state.user.ready
	};
};

const mapDispatchToProps = {
	updateProfileImage
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MyProfile);
